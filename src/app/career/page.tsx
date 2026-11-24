import { TrackedLink } from "@/components/TrackedLink";
import { career, careerIntro } from "@/data/career";
import { seo, site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/career", seo.career);

export default function CareerPage() {
  return (
    <article>
      <header className="mb-12 md:mb-16">
        <h1 className="project-page-title">Career</h1>
        <p className="work-lede">{careerIntro}</p>
      </header>

      {/* The stories */}
      {career.map((c) => (
        <section key={c.id} id={c.id} className="section scroll-mt-10">
          <div className="career-gutter">
            <h2 className="career-company">
              <TrackedLink href={c.url} event="company_link_clicked" data={{ company: c.id, location: "career" }}>{c.company}</TrackedLink>
            </h2>
            <p className="career-roles">{c.roles}</p>
            <p className="career-years">{c.years}</p>
          </div>
          <div className="career-body">
            <p className="career-sides">{c.sides}</p>
            <p className="career-story">{c.story}</p>
            {c.outcomes?.length ? (
              <ul className="career-outcomes">
                {c.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ))}

      {/* Next step */}
      <section className="section">
        <div>
          <h2 className="label">Talk</h2>
        </div>
        <div className="career-body">
          <p className="career-story">
            If you&rsquo;re building something where several kinds of users have to trust each other, I&rsquo;d like to hear about it.
          </p>
          <p className="meta career-next">
            <TrackedLink href={`mailto:${site.email}`} event="email_clicked" data={{ location: "career" }} className="tap">Email</TrackedLink>
            <span aria-hidden>·</span>
            <TrackedLink href={site.linkedin} event="linkedin_clicked" data={{ location: "career" }} className="tap">LinkedIn</TrackedLink>
            {site.resumeUrl ? (
              <>
                <span aria-hidden>·</span>
                <TrackedLink href={site.resumeUrl} event="resume_clicked" data={{ location: "career" }} className="tap">Résumé (PDF)</TrackedLink>
              </>
            ) : null}
          </p>
        </div>
      </section>
    </article>
  );
}
