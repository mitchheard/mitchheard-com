"use client";

import { useState } from "react";

type Props = {
  title: string;
  images: string[];
  /** Descriptive alt text, same order as `images`. Falls back to "<title> screenshot". */
  alts?: string[];
  portrait?: boolean;
};

/* One large shot with a filmstrip under it. Click a thumbnail to make it the large one.
   No autoplay, no arrows: the reader drives. The strip is a group of toggle buttons
   (aria-pressed), not tabs: there is no tabpanel and no arrow-key behavior to promise. */
export function ProjectGallery({ title, images, alts, portrait }: Props) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];
  const altFor = (i: number) => alts?.[i] || `${title} screenshot ${i + 1} of ${images.length}`;

  if (images.length === 1) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={current} alt={alts?.[0] || `${title} screenshot`} className={`project-shot${portrait ? " project-shot-portrait" : ""}`} loading="lazy" />
    );
  }

  return (
    <div className="gallery">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={current} src={current} alt={altFor(index)} className="project-shot gallery-main" />
      <div className="gallery-strip" role="group" aria-label={`${title} screenshots`}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-pressed={i === index}
            aria-label={`Show screenshot ${i + 1} of ${images.length}`}
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
