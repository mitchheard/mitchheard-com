import { site } from "@/data/site";

export default function HomePage() {
  return (
    <article className="space-y-0">
      {/* Hero: punches harder — tighter line-height, larger, warm accent dot as brand signature */}
      <header>
        <h1 className="flex items-baseline gap-3 font-serif text-5xl font-bold leading-tight tracking-tight text-[var(--foreground)] md:text-6xl md:leading-tight md:tracking-tighter">
          <span>{site.name}</span>
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-[var(--accent)] opacity-90"
            aria-hidden
          />
        </h1>
        <p className="mt-8 max-w-[38rem] font-serif text-xl font-medium leading-tight tracking-tight text-[var(--foreground)] md:text-2xl md:leading-tight">
          Turning complex systems into clear, scalable product experiences.
        </p>
        <p className="mt-6 max-w-[30rem] font-sans text-[var(--muted-soft)] font-normal leading-relaxed">
          Product and strategy leader across the startup lifecycle — specializing in multi-party
          platforms, integration-heavy systems, and scalable execution.
        </p>
      </header>

      <hr className="my-14" aria-hidden />

      {/* Two-column: philosophy left, Currently card right — depth and structure */}
      <section className="grid gap-10 md:grid-cols-[1fr,minmax(0,320px)] md:gap-12">
        <div className="min-w-0">
          <p className="font-sans text-[var(--muted)] leading-relaxed">
            I&apos;m drawn to the hard problems that sit between teams, companies, and users. My work
            centers on connecting systems, reducing friction, and building software that works in the
            real world.
          </p>
        </div>

        {site.currentFocus.length > 0 && (
          <div
            className="min-w-0 rounded-xl border p-6 md:p-8"
            style={{
              backgroundColor: "var(--card-bg)",
              borderColor: "var(--card-border)",
            }}
          >
            <h2 className="font-sans text-xs font-medium uppercase tracking-wider text-[var(--muted-soft)]">
              Currently
            </h2>
            <ul className="mt-5 space-y-4">
              {site.currentFocus.map((item) => (
                <li
                  key={item}
                  className="font-sans text-[var(--muted)] leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      <footer className="mt-20 border-t border-[var(--border)] pt-8 opacity-80">
        <p className="font-sans text-sm text-[var(--muted-soft)]">
          {site.location}
          <span className="mx-1.5">·</span>
          {site.footerLine}
        </p>
      </footer>
    </article>
  );
}
