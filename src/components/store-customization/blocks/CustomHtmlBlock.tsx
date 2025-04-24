
import React from "react";

interface CustomHtmlBlockProps {
  content: {
    html: string;
  };
  theme?: any;
}

export function CustomHtmlBlock({ content }: CustomHtmlBlockProps) {
  return (
    <div className="custom-html-container" dangerouslySetInnerHTML={{ __html: content.html }} />
  );
}
