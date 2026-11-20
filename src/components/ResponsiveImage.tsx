/* A <picture> that serves the WebP variants made by scripts/make-images.mjs
   (<name>-<width>.webp next to <name>.jpg), with the original JPG as the fallback.
   Pass `sizes` the way you would for any srcset: the width the image is drawn at. */

type Props = {
  /** Path to the original JPG, e.g. "/projects/lellow.jpg". */
  src: string;
  alt: string;
  /** Widths that exist on disk as <name>-<width>.webp. */
  widths?: readonly number[];
  sizes: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  style?: React.CSSProperties;
  width?: number;
  height?: number;
};

export const PROJECT_WIDTHS = [400, 800, 1200] as const;
/* Portrait (phone) shots are 16:10 files cropped into a 9:16 box, so the file is drawn about
   2.8x wider than the box. They need the larger variants. */
export const PORTRAIT_SHOT_WIDTHS = [800, 1200, 1600] as const;
export const HEADSHOT_WIDTHS = [240, 480] as const;

export function webpSrcSet(src: string, widths: readonly number[]): string {
  const base = src.replace(/\.jpg$/, "");
  return widths.map((w) => `${base}-${w}.webp ${w}w`).join(", ");
}

export function ResponsiveImage({
  src,
  alt,
  widths = PROJECT_WIDTHS,
  sizes,
  className,
  loading = "lazy",
  fetchPriority,
  style,
  width,
  height,
}: Props) {
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      style={style}
      width={width}
      height={height}
    />
  );
  // Only .jpg sources have variants; anything else is served as-is.
  if (!src.endsWith(".jpg")) return img;
  return (
    <picture>
      <source type="image/webp" srcSet={webpSrcSet(src, widths)} sizes={sizes} />
      {img}
    </picture>
  );
}
