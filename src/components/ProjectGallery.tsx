"use client";

import { useState } from "react";

type Props = {
  title: string;
  images: string[];
  portrait?: boolean;
};

/* One large shot with a filmstrip under it. Click a thumbnail to make it the large one.
   No autoplay, no arrows: the reader drives. */
export function ProjectGallery({ title, images, portrait }: Props) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  if (images.length === 1) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={current} alt={`${title} screenshot`} className={`project-shot${portrait ? " project-shot-portrait" : ""}`} loading="lazy" />
    );
  }

  return (
    <div className="gallery">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={current} src={current} alt={`${title} screenshot ${index + 1} of ${images.length}`} className="project-shot gallery-main" />
      <div className="gallery-strip" role="tablist" aria-label={`${title} screenshots`}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Screenshot ${i + 1}`}
            className={`gallery-thumb${i === index ? " is-active" : ""}`}
            onClick={() => setIndex(i)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
