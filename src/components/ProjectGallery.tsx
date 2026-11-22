"use client";

import { useState } from "react";
import { trackUmamiEvent } from "@/lib/umami-bootstrap";
import { PORTRAIT_SHOT_WIDTHS, PROJECT_WIDTHS, ResponsiveImage } from "./ResponsiveImage";

type Props = {
  /** Sent with the gallery_image_selected Umami event. */
  projectId: string;
  title: string;
  images: string[];
  /** Descriptive alt text, same order as `images`. Falls back to "<title> screenshot". */
  alts?: string[];
  /** True if the first image is a phone capture (single-image case). */
  portrait?: boolean;
  /** Per-image shape, same order as `images`, so a gallery can mix iPhone portrait and iPad landscape shots. Missing = landscape. */
  shapes?: ("portrait" | "landscape")[];
  /** True for the first image on the page: load it eagerly at high priority (it's the LCP element). */
  priority?: boolean;
};

/* Width the large shot is drawn at: full column on a phone, capped by .project-shot's max-width. */
const MAIN_SIZES = "(min-width: 768px) 680px, calc(100vw - 40px)";
/* .project-shot-portrait is 300px wide x 9:16 (533px tall) with object-fit: cover on a 16:10
   file, so the file itself is drawn 533 x 1.6 = 853px wide and only its middle 300px shows. */
const PORTRAIT_SIZES = "853px";
/* Filmstrip tiles: a quarter of the gallery, about 160px on desktop and 80px on a phone. */
const THUMB_SIZES = "(min-width: 640px) 160px, 80px";

/* One large shot with a filmstrip under it. Click a thumbnail to make it the large one.
   No autoplay, no arrows: the reader drives. The strip is a group of toggle buttons
   (aria-pressed), not tabs: there is no tabpanel and no arrow-key behavior to promise. */
export function ProjectGallery({ projectId, title, images, alts, portrait, shapes, priority }: Props) {
  const [index, setIndex] = useState(0);
  // The swap animation only plays after a click. Animating the first paint would delay LCP.
  const [interacted, setInteracted] = useState(false);
  const current = images[index] ?? images[0];
  const isPortrait = (i: number) => shapes?.[i] === "portrait";
  const mixed = Boolean(shapes?.some((s) => s === "portrait"));
  const altFor = (i: number) => alts?.[i] || `${title} screenshot ${i + 1} of ${images.length}`;
  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? "high" : undefined;

  if (images.length === 1) {
    return (
      <ResponsiveImage
        src={current}
        alt={alts?.[0] || `${title} screenshot`}
        widths={portrait ? PORTRAIT_SHOT_WIDTHS : PROJECT_WIDTHS}
        sizes={portrait ? PORTRAIT_SIZES : MAIN_SIZES}
        className={`project-shot${portrait ? " project-shot-portrait" : ""}`}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    );
  }

  return (
    <div className="gallery">
      <ResponsiveImage
        key={current}
        src={current}
        alt={altFor(index)}
        widths={isPortrait(index) ? PORTRAIT_SHOT_WIDTHS : undefined}
        sizes={isPortrait(index) ? PORTRAIT_SIZES : MAIN_SIZES}
        className={`project-shot gallery-main${isPortrait(index) ? " project-shot-portrait" : ""}${interacted ? " gallery-swap" : ""}`}
        loading={index === 0 ? loading : "eager"}
        fetchPriority={index === 0 ? fetchPriority : undefined}
      />
      <div className={`gallery-strip${mixed ? " gallery-strip-mixed" : ""}`} role="group" aria-label={`${title} screenshots`}>
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-pressed={i === index}
            aria-label={`Show screenshot ${i + 1} of ${images.length}`}
            className={`gallery-thumb${i === index ? " is-active" : ""}${isPortrait(i) ? " gallery-thumb-portrait" : ""}`}
            onClick={() => {
              if (i !== index) trackUmamiEvent("gallery_image_selected", { project_id: projectId, index: i + 1 });
              setInteracted(true);
              setIndex(i);
            }}
          >
            <ResponsiveImage src={src} alt="" widths={[400]} sizes={THUMB_SIZES} loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
