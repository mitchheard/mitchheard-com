export default function PhotographyPage() {
  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
          Photography
        </h1>
      </header>

      <section className="max-w-2xl space-y-6">
        <p className="text-[var(--muted)] leading-relaxed">
          Add a gallery here: link to an external gallery (Flickr, Unsplash, etc.) or host images in{" "}
          <code className="rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 font-mono text-sm">public/</code> and render a grid.
        </p>
        <p className="text-sm text-[var(--muted)]">
          You can store image metadata in <code className="rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 font-mono text-xs">src/data/photography.json</code> and
          use Next.js <code className="rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 font-mono text-xs">Image</code> for responsive loading.
        </p>
      </section>
    </article>
  );
}
