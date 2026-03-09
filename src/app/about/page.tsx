export default function AboutPage() {
  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
          About
        </h1>
      </header>

      <section className="max-w-2xl space-y-6">
        <p className="text-[var(--muted)] leading-relaxed">
          Edit <code className="rounded border border-[var(--border)] bg-[var(--background)] px-1.5 py-0.5 font-mono text-sm">src/app/about/page.tsx</code> or
          replace this with content from your CMS or markdown. You can also add a photo, links to
          socials, or a short bio here.
        </p>
      </section>
    </article>
  );
}
