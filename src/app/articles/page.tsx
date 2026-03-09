export default function ArticlesPage() {
  return (
    <article>
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
          Articles
        </h1>
        <p className="mt-2 text-[var(--muted)]">
          Writing about product, systems, and building things.
        </p>
      </header>

      <p className="text-[var(--muted)] leading-relaxed">
        Nothing published yet — first post coming soon.
      </p>
    </article>
  );
}
