
import React from "react";

interface VideoBlockProps {
  content: {
    title: string;
    videoUrl: string;
    autoplay: boolean;
  };
  theme?: any;
}

export function VideoBlock({ content, theme }: VideoBlockProps) {
  const { title, videoUrl, autoplay } = content;

  // Append autoplay parameter if needed
  const videoSrc = autoplay 
    ? `${videoUrl}${videoUrl.includes('?') ? '&' : '?'}autoplay=1&mute=1` 
    : videoUrl;

  return (
    <div className="w-full py-6">
      {title && <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>}
      
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <iframe
          src={videoSrc}
          className="w-full h-full"
          title={title || "Embedded video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
