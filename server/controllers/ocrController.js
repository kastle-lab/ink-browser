import ffmpeg from "fluent-ffmpeg"; // For extracting video frames
import { createWorker } from "tesseract.js"; // OCR (Optical Character Recognition) library
import keywordExtractor from "keyword-extractor"; // Extracts keywords from text
import fs from "fs/promises"; // File system operations (Promise-based)
import os from "os"; // Provides system temp directory
import path from "path"; // For working with file paths
import { execPromise } from "../utils/execPromise.js"; // Utility to run shell commands
import { normalizeKeyword } from "../utils/stringUtils.js"; // Cleans and standardizes keywords
import {
  getModuleDescriptionForKeyword,
  getReferenceLinks,
} from "../utils/githubUtils.js"; // Fetches extra info and references from GitHub modules

/**
 * =============================================================
 * BIG PICTURE (Data Flow Summary)
 * =============================================================
 * 1. Client sends a request with:
 *    - videoId (YouTube video identifier)
 *    - pauseTime (timestamp in seconds where video was paused)
 *
 * 2. Server checks if the video is cached locally.
 *    - If not, it downloads the video from YouTube using yt-dlp.
 *
 * 3. Extract one video frame at the given pauseTime using ffmpeg.
 *
 * 4. Run OCR (Tesseract.js) on that frame to detect text.
 *
 * 5. Clean and normalize the extracted text.
 *
 * 6. Extract keywords from the text.
 *
 * 7. Normalize and deduplicate the keywords.
 *
 * 8. For each keyword:
 *    - Get module description (from GitHub utils).
 *    - Get reference links (from GitHub utils).
 *    - Only keep keywords that have valid module descriptions.
 *
 * 9. Return a JSON response containing enriched keywords.
 *
 * Goal:
 * -----
 * This pipeline converts a paused YouTube frame → into text → into keywords
 * → into meaningful enriched information with references.
 * =============================================================
 */

/**
 * waitForFile
 * -----------
 * Utility function that checks if a file exists.
 * - Retries several times (default: 10) with a delay in ms (default: 300).
 * - Returns true once the file is accessible.
 * - Throws an error if file is still not found after all retries.
 */
async function waitForFile(filePath, retries = 10, delay = 300) {
  for (let i = 0; i < retries; i++) {
    try {
      await fs.access(filePath); // Check if file is accessible
      return true; // File exists
    } catch (err) {
      // Wait before retrying
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw new Error(`File ${filePath} not accessible after ${retries} tries.`);
}

/**
 * processOcrRequest
 * -----------------
 * Main request handler function for OCR processing.
 *
 * Steps:
 * 1. Validate request input.
 * 2. Prepare directories and paths for video + frames.
 * 3. Check for cached video, otherwise download it.
 * 4. Extract one frame at given pauseTime using ffmpeg.
 * 5. Run OCR on frame to extract raw text.
 * 6. Clean and preprocess OCR text.
 * 7. Extract keywords from text.
 * 8. Normalize keywords (lowercase, trim, deduplicate).
 * 9. Enrich keywords with descriptions and references.
 * 10. Send JSON response back to client.
 */
export async function processOcrRequest(req, res) {
  const { videoId, pauseTime } = req.body;

  // Input validation: require both videoId and pauseTime
  if (!videoId || typeof pauseTime !== "number") {
    return res
      .status(400)
      .json({ error: "Please provide both videoId and pauseTime." });
  }

  try {
    // Step 1: Setup directories
    const tmpDir = os.tmpdir(); // system temporary directory
    const videoPath = path.join(tmpDir, `${videoId}.mp4`); // path to cached video
    const framesDir = path.join(tmpDir, `${videoId}_frames`); // directory for frames
    await fs.mkdir(framesDir, { recursive: true }); // ensure frames directory exists
    console.log(framesDir, "framesDir");
    // Step 2: Check if video already cached, else download
    try {
      await fs.access(videoPath);
      console.log(`Using cached video at ${videoPath}`);
    } catch {
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const downloadCmd = `yt-dlp -f "bv*+ba/b" --merge-output-format mp4 -o "${videoPath}" "${videoUrl}"`; //command to download best video+audio and merge into mp4 format
      console.log(`Downloading video: ${downloadCmd}`);
      await execPromise(downloadCmd); // run yt-dlp command
      console.log(`Downloaded video to ${videoPath}`);
      await waitForFile(videoPath); // wait until video file is ready
    }

    // Step 3: Ensure file is ready (extra safety)
    await waitForFile(videoPath);

    // Step 4: Normalize path (important for Windows systems)
    const normalizedVideoPath = videoPath.replace(/\\/g, "/");

    // Step 5: Extract one frame at pauseTime using ffmpeg
    const outputFrame = path.join(framesDir, "paused_frame.jpg");
    console.log(`Extracting frame at ${pauseTime} seconds...`);
    await new Promise((resolve, reject) => {
      ffmpeg(normalizedVideoPath)
        .setStartTime(pauseTime)
        .frames(1) // exactly 1 frame
        .output(outputFrame)
        .on("end", resolve)
        .on("error", reject)
        .run();
    });
    console.log(`Extracted frame to ${outputFrame}`);

    // Step 6: OCR (Optical Character Recognition) using Tesseract.js
    const worker = await createWorker("eng"); // initialize worker with English language
    const { data } = await worker.recognize(outputFrame);
    await worker.terminate(); // free resources
    const ocrText = data.text;
    console.log("OCR Text:", ocrText);

    // Step 7: Clean OCR text (remove punctuation, extra spaces, etc.)
    const cleanedText = ocrText
      .replace(/[\.,\/#!$%\^&\*;:{}=\-_`~()"]/g, "")
      .replace(/\s{2,}/g, " ");
    console.log("Cleaned OCR Text:", cleanedText);

    // Step 8: Extract keywords from cleaned text
    let extractedKeywords = keywordExtractor.extract(cleanedText, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true,
    });
    if (!Array.isArray(extractedKeywords)) {
      extractedKeywords = [];
    }
    console.log("Extracted Keywords (raw):", extractedKeywords);

    // Step 9: Normalize and deduplicate keywords
    let keywords = extractedKeywords.map(normalizeKeyword);
    keywords = Array.from(new Set(keywords)); // remove duplicates
    keywords = keywords.filter((k) => k !== ""); // remove empty strings
    console.log("Normalized Keywords:", keywords);

    // Step 10: Enrich keywords with descriptions and references
    const enrichedKeywords = (
      await Promise.all(
        keywords.map(async (keyword) => {
          const moduleDescription =
            await getModuleDescriptionForKeyword(keyword);
          const references = await getReferenceLinks(keyword);
          // Only include keywords that have meaningful module descriptions
          console.log(moduleDescription, "this is module description");
          if (moduleDescription?.content) {
            console.log("I am inside");
            return {
              name: keyword,
              summary: `Keyword: ${keyword}`,
              description:
                moduleDescription ||
                `No module details available for ${keyword}.`,
              references,
              hasReferences: references.length > 0,
            };
          }
          return null; // skip keywords without module info
        }),
      )
    ).filter(Boolean); // remove nulls
    console.log("Enriched Keywords:", enrichedKeywords, keywords);

    // Step 11: Send final enriched keywords back to client
    res.json({ keywords: enrichedKeywords });
  } catch (error) {
    console.error("Error processing OCR and enrichment:", error);
    res.status(500).json({ error: error.message });
  }
}
