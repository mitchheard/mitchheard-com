import { career, careerIntro } from "@/data/career";

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
              <a href={c.url} target="_blank" rel="noopener noreferrer">{c.company}</a>
            </h2>
            <p className="career-roles">{c.roles}</p>
            <p className="career-years">{c.years}</p>
          </div>
          <div className="career-body">
            <p className="career-sides">{c.sides}</p>
            <p className="career-story">{c.story}</p>
          </div>
        </section>
      ))}
    </article>
  );
}
