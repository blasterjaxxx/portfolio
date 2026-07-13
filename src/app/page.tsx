import { Connector } from "@/components/Connector";
import { CopyEmail } from "@/components/CopyEmail";
import { education, experience, profile, projects, skills } from "@/lib/content";

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-xs tracking-[0.2em] text-accent uppercase mb-10 flex items-center gap-3">
      <span aria-hidden>▸</span>
      {children}
      <span className="h-px flex-1 bg-line" aria-hidden />
    </h2>
  );
}

function Bullet({ children }: { children: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[9px] h-px w-3 shrink-0 bg-muted" aria-hidden />
      <span>{children}</span>
    </li>
  );
}

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
      {/* Hero — centered. */}
      <header className="text-center">
        <div className="text-sm text-muted mb-3">
          <span className="text-accent">$</span> whoami
          <span className="cursor ml-1" aria-hidden>
            ▋
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          {profile.name}
        </h1>
        <p className="mt-3 text-sm text-muted">
          {profile.role} · {profile.location}
        </p>

        {profile.availability && (
          <p className="mt-5 inline-flex items-center gap-2 rounded border border-line bg-panel px-3 py-1.5 text-xs text-accent">
            <span
              className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden
            />
            {profile.availability}
          </p>
        )}

        <p className="mx-auto mt-8 max-w-3xl font-sans text-xl sm:text-2xl leading-snug text-foreground">
          {profile.headline}
        </p>

        <div className="mx-auto mt-6 max-w-3xl space-y-2 text-left">
          {profile.summary.map((line) => (
            <p
              key={line}
              className="flex gap-3 font-sans text-[15px] leading-relaxed text-muted"
            >
              <span className="mt-[2px] shrink-0 text-accent" aria-hidden>
                ▸
              </span>
              <span>{line}</span>
            </p>
          ))}
        </div>

        <dl className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-px overflow-hidden rounded-md border border-line bg-line sm:auto-cols-fr sm:grid-flow-col">
          {profile.stats.map((stat) => (
            <div key={stat.label} className="bg-panel px-4 py-4">
              <dt className="text-lg font-semibold text-accent tabular-nums">
                {stat.value}
              </dt>
              <dd className="mt-1 text-[11px] leading-snug text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm">
          {profile.resume && (
            <a
              href={profile.resume}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              resume.pdf
            </a>
          )}
          <a
            href={profile.linkedin}
            className="text-muted hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin
          </a>
          <a
            href={profile.github}
            className="text-muted hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <CopyEmail email={profile.email} />
        </nav>
      </header>

      {/* Tech stack — full-width band. */}
      <section className="mt-24">
        <SectionHeading>tech stack</SectionHeading>
        <dl className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.label}>
              <dt className="text-[11px] uppercase tracking-[0.15em] text-accent/70">
                {group.label}
              </dt>
              <dd className="mt-2 text-[13px] leading-relaxed text-foreground/80">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Experience — staggered zigzag with dashed connectors. */}
      <section className="mt-24">
        <SectionHeading>experience</SectionHeading>
        <div>
          {experience.map((job, i) => {
            const left = i % 2 === 0;
            return (
              <div key={job.company}>
                <article
                  className={`rounded-md border border-line bg-panel p-6 transition-colors hover:border-accent/30 md:w-[76%] ${
                    left ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
                      {job.company}
                      {job.current && (
                        <span
                          className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                          title="Current role"
                        />
                      )}
                    </h3>
                    <span className="text-xs text-muted tabular-nums">
                      {job.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">
                    {job.title} · {job.location}
                  </p>
                  <ul className="mt-4 space-y-2.5 font-sans text-[15px] leading-relaxed text-foreground/80">
                    {job.bullets.map((bullet) => (
                      <Bullet key={bullet}>{bullet}</Bullet>
                    ))}
                  </ul>
                </article>

                {i < experience.length - 1 && (
                  <Connector dir={left ? "ltr" : "rtl"} />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Projects — same staggered zigzag as experience. */}
      <section className="mt-24">
        <SectionHeading>building</SectionHeading>
        <div>
          {projects.map((project, i) => {
            const left = i % 2 === 0;
            return (
              <div key={project.name}>
                <article
                  className={`rounded-md border border-line bg-panel p-6 transition-colors hover:border-accent/30 md:w-[76%] ${
                    left ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-base font-semibold text-foreground">
                      {project.name}
                    </h3>
                    <span className="text-xs text-muted tabular-nums">
                      {project.year}
                    </span>
                  </div>

                  <p className="mt-3 font-sans text-[15px] leading-relaxed text-foreground/90">
                    {project.blurb}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded border border-line px-2 py-0.5 text-[11px] text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <ul className="mt-5 space-y-2.5 font-sans text-[15px] leading-relaxed text-foreground/70">
                    {project.highlights.map((highlight) => (
                      <Bullet key={highlight}>{highlight}</Bullet>
                    ))}
                  </ul>
                </article>

                {i < projects.length - 1 && (
                  <Connector dir={left ? "ltr" : "rtl"} />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Education. */}
      <section className="mt-24">
        <SectionHeading>education</SectionHeading>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-base font-semibold text-foreground">
            {education.school}
          </h3>
          <span className="text-xs text-muted tabular-nums">
            {education.period}
          </span>
        </div>
        <p className="mt-1 text-sm text-muted">
          {education.degree} · {education.location}
        </p>
      </section>

      <footer className="mt-24 border-t border-line pt-6 text-center text-xs text-muted">
        <span className="text-accent">$</span> built with next.js · deployed on
        vercel
      </footer>
    </div>
  );
}
