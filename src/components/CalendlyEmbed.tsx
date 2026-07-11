"use client";

import { useEffect, useRef, useState } from "react";

interface CalendlyEmbedProps {
  url: string;
  mode?: "inline" | "popup";
}

export default function CalendlyEmbed({ url, mode = "inline" }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!url || mode !== "inline") return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loaded) {
          loadCalendly();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [url, mode, loaded]);

  function loadCalendly() {
    if (document.getElementById("calendly-script")) {
      setLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "calendly-script";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.onload = () => setLoaded(true);
    document.head.appendChild(script);
  }

  if (!url) return null;

  return (
    <div ref={containerRef} className="w-full">
      {!loaded && (
        <div className="flex items-center justify-center h-64 text-[var(--muted-foreground)] text-sm">
          Chargement du calendrier…
        </div>
      )}
      <div
        className="calendly-inline-widget w-full"
        data-url={url}
        style={{ minWidth: "320px", height: "700px", display: loaded ? "block" : "none" }}
      />
    </div>
  );
}
