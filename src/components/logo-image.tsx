/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";

// Round logo with a plain placeholder circle when the image is missing or fails to load.
export function LogoImage({ src, alt }: { src?: string; alt: string }) {
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The server-rendered <img> can fail before React hydrates and attaches
  // onError, so also check once mounted whether it already failed.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) {
      setImageError(true);
    }
  }, [src]);

  if (!src || imageError) {
    return (
      <div className="size-8 flex-none rounded-full border bg-muted p-1 shadow ring-2 ring-border md:size-10" />
    );
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      className="size-8 flex-none overflow-hidden rounded-full border object-contain p-1 shadow ring-2 ring-border md:size-10"
      onError={() => setImageError(true)}
    />
  );
}
