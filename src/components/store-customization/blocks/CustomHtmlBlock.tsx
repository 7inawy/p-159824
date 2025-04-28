
import React from "react";

interface CustomHtmlBlockProps {
  content: {
    html: string;
  };
  theme?: any;
}

export function CustomHtmlBlock({ content }: CustomHtmlBlockProps) {
  // Ensure content.html exists with a default value if missing
  const html = content && content.html ? content.html : "<p>No HTML content provided</p>";
  
  return (
    <div className="custom-html-container" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
