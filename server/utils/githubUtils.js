import { similarity } from "./stringUtils.js";

// Cache for module list (avoid hitting GitHub API rate limit)
let moduleListCache = null;
let cacheTimestamp = 0;

/**
 * getModuleDescriptionForKeyword
 * ------------------------------
 * Purpose:
 * - Given a keyword, tries to find the closest matching module
 *   inside the GitHub repository: KGConf/open-kg-curriculum.
 * - Downloads the module’s `.md` or `README.md` file.
 * - Extracts the content (especially after the "## Content" header).
 *
 * How it works:
 * 1. Fetch list of modules (folders) from the GitHub repo (cached for 1 hour to avoid rate limits).
 * 2. Normalize the keyword (lowercase, trim spaces).
 * 3. Look for the "best match":
 *    - If folder name contains the keyword (or vice versa), pick it immediately.
 *    - Else, compute similarity score using the `similarity` function.
 *    - Keep the folder with the highest similarity (≥ 0.8).
 * 4. If a matching module is found:
 *    - Try to fetch its `<moduleName>.md`.
 *    - If not found, fallback to `README.md`.
 * 5. Extract and return the relevant content.
 */
export async function getModuleDescriptionForKeyword(keyword) {
  try {
    const apiUrl =
      "https://api.github.com/repos/KGConf/open-kg-curriculum/contents/curriculum/modules";
    
    // Use cached module list if available and not expired (1 hour cache)
    let modules = moduleListCache;
    if (!modules || Date.now() - cacheTimestamp > 3600000) {
      const response = await fetch(apiUrl);

      // Handle GitHub API error (e.g., rate limit or network issue)
      if (!response.ok) {
        console.error(
          `Error fetching module list from GitHub: ${response.status}`,
        );
        return "";
      }

      modules = await response.json(); // List of module folders
      moduleListCache = modules;
      cacheTimestamp = Date.now();
      console.log(`Fetched ${modules.length} modules from GitHub (cached for 1 hour)`);
    }
    const normKeyword = keyword.toLowerCase().trim(); // Normalize keyword

    let bestMatch = { similarity: 0, item: null };

    // Loop through modules to find the closest match
    for (const item of modules) {
      if (item.type === "dir") {
        const modNameNormalized = item.name.toLowerCase().replace(/_/g, " ");

        // Direct substring match (strongest)
        if (
          modNameNormalized.includes(normKeyword) ||
          normKeyword.includes(modNameNormalized)
        ) {
          bestMatch = { similarity: 1, item: item };
          break; // stop searching, exact-enough match found
        } else {
          // Fuzzy similarity match
          const sim = similarity(normKeyword, modNameNormalized);
          if (sim >= 0.8 && sim > bestMatch.similarity) {
            bestMatch = { similarity: sim, item: item };
          }
        }
      }
    }

    // If a best match was found, try to fetch its content file
    if (bestMatch.item) {
      const candidateFile = `${bestMatch.item.name}.md`;

      // Construct the raw GitHub URL for the file
      let fileUrl = `https://raw.githubusercontent.com/KGConf/open-kg-curriculum/master/curriculum/modules/${bestMatch.item.name}/${candidateFile}`;
      let fileResponse = await fetch(fileUrl);

      // Fallback: if <moduleName>.md not found, try README.md
      if (!fileResponse.ok) {
        fileUrl = `https://raw.githubusercontent.com/KGConf/open-kg-curriculum/master/curriculum/modules/${bestMatch.item.name}/README.md`;
        fileResponse = await fetch(fileUrl);
      }

      // If file is found, extract its content
      if (fileResponse.ok) {
        let contents = await fileResponse.text();
        let content = contents;

        // Try to isolate content after "## Content" section
        const parts = content.split(/##\s*Content\s*#+/i);
        if (parts.length > 1) {
          // Take only the section immediately after "## Content"
          const subParts = parts[1].split(/\n##\s*/);
          content = subParts[0].trim();
        } else {
          content = content.trim(); // fallback: return whole content
        }
        return { content, result: contents };
      }
    }
  } catch (e) {
    console.error("Error while matching module for keyword", keyword, e);
  }

  // Default: return empty string if nothing matched
  return "";
}

/**
 * getReferenceLinks
 * -----------------
 * Purpose:
 * - Generate a list of useful reference links for a given keyword.
 * - Currently includes Wikipedia and YouTube search.
 * - Can be extended to include Google search or other sources.
 *
 * Params:
 * - keyword (string): the term to search references for.
 *
 * Returns:
 * - Array of URLs (Wikipedia + YouTube).
 */
export async function getReferenceLinks(keyword) {
  const links = [];
  links.push(`https://en.wikipedia.org/wiki/${encodeURIComponent(keyword)}`);
  links.push(
    `https://www.youtube.com/results?search_query=${encodeURIComponent(keyword)}`,
  );
  // Optional: Google search link (commented out)
  // links.push(`https://www.google.com/search?q=${encodeURIComponent(keyword)} tutorial`);
  return links;
}
