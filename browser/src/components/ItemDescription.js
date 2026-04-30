import React from "react";
import Tooltip from "@mui/material/Tooltip";
import MarkdownComponent from "./MarkdownComponent";

// Predefined logos for different resource types (Wikipedia and YouTube).
// These will be displayed on resource "cards" depending on the link type.
const WIKI_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png";
const YT_LOGO =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1280px-Logo_of_YouTube_%282015-2017%29.svg.png";

/**
 * ItemDescription Component
 *
 * Purpose:
 * --------
 * - Displays a description for a selected keyword/topic.
 * - Shows related reference links (Wikipedia, YouTube, or generic links).
 * - Adds logos and labels for better readability of resources.
 *
 * Props:
 * ------
 * - itemName: The title/name of the topic.
 * - itemDescription: A textual description of the topic.
 * - itemDescriptionReferences: An array of URLs containing additional info sources.
 * - videoId: The YouTube video ID (if any) to generate a video reference link.
 */
function ItemDescription({
  itemName,
  itemDescription,
  itemDescriptionReferences = [],
  videoId,
}) {
  // Initialize references list.
  let refs = itemDescriptionReferences || [];
  let finalRefs = [];
  console.log(itemDescription, "this is the descrition");
  // If a videoId is provided, generate a YouTube link.
  if (videoId) {
    const ytUrl = `https://www.youtube.com/watch?v=${videoId}`;
    // Push the YouTube video link to references.
    // (Note: Avoids duplicates with refs filtering later.)
    finalRefs.push(ytUrl);
  }

  // Add only valid non-YouTube links from refs.
  // This ensures we don’t duplicate YouTube links already added above.
  refs.forEach((url) => {
    if (url && !url.includes("youtube.com") && !url.includes("youtu.be")) {
      finalRefs.push(url);
    }
  });

  // Capitalize the first character of the itemName for display purposes.
  const capitalizedTitleName =
    (itemName || "").charAt(0).toUpperCase() + (itemName || "").slice(1);

  /**
   * getType
   * -------
   * Utility function to classify the type of a URL.
   * Returns one of: "wikipedia", "youtube", "search", or "link".
   */
  const getType = (url = "") => {
    const u = url.toLowerCase();
    if (u.includes("wikipedia.org")) return "wikipedia";
    if (u.includes("youtube.com/watch") || u.includes("youtu.be"))
      return "youtube";
    if (u.includes("google.com/search")) return "search";
    return "link"; // default: generic link
  };

  // Debug log for developers to see what description is being passed.
  console.log("item", { itemDescription });

  /**
   * renderCard
   * ----------
   * Takes a URL and index, returns a styled "card" with:
   * - Logo (Wikipedia / YouTube / none for generic links)
   * - A clickable label (topic name or URL)
   *
   * Skips "search" type links since they are not useful references.
   */
  const renderCard = (url, idx) => {
    if (!url) return null;
    const type = getType(url);
    if (type === "search") return null;

    // Decide which logo to display (Wikipedia, YouTube, or none).
    const logo =
      type === "wikipedia" ? WIKI_LOGO : type === "youtube" ? YT_LOGO : null;

    // Decide the label text shown under the logo.
    const label =
      type === "wikipedia"
        ? `${capitalizedTitleName || "| Wikipedia"}`
        : type === "youtube"
          ? `${capitalizedTitleName || "| Youtube"}`
          : url;

    // Return a styled anchor tag as the "card".
    return (
      <a
        key={idx}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          textDecoration: "none",
          color: "inherit",
          width: 160,
          padding: 8,
          borderRadius: 6,
        }}
      >
        {/* Display logo image if available, else just keep empty space */}
        {logo ? (
          <img
            src={logo}
            alt={type}
            style={{
              width: 48,
              height: 48,
              objectFit: "contain",
              display: "block",
            }}
          />
        ) : (
          <div style={{ width: 48, height: 48 }} />
        )}

        {/* Display label (topic name or URL) */}
        <span
          style={{
            textAlign: "center",
            fontSize: 14,
            color: "#1a0dab",
            textDecoration: "underline",
            lineHeight: 1.2,
            wordBreak: "break-word",
          }}
        >
          {label}
        </span>
      </a>
    );
  };

  return (
    <>
      {/* Top section: shows the title or "Item Description" tooltip */}
      <div className="search-top">
        <h2 className="left-search">
          {itemName ? (
            capitalizedTitleName
          ) : (
            <Tooltip
              title="Detailed of the Topics extracted from the frames available under open-kg-curriculum"
              arrow
            >
              Item Description
            </Tooltip>
          )}
        </h2>
      </div>

      <div className="description-bottom" style={{ textWrap: "balance" }}>
        {/* using markdown component to render the description text with proper
        formatting */}
        <MarkdownComponent markdownData={itemDescription} />
      </div>
      <div className="references mt-4" style={{ marginTop: 12 }}>
        <h3 style={{ fontWeight: "bold", marginTop: 10 }}>Related Resources</h3>
      </div>

      {/* If no references found, show message, else render reference cards */}
      {finalRefs.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#666" }}>
          No related resources found.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            gap: 20,
            alignItems: "flex-start",
            marginTop: 8,
            flexWrap: "wrap",
          }}
        >
          {finalRefs.map((url, idx) => renderCard(url, idx))}
        </div>
      )}
    </>
  );
}

export default ItemDescription;
