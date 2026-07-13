import { CopyEmail } from "@/components/CopyEmail";
import { education, experience, profile, projects, skills } from "@/lib/content";

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-xs tracking-[0.2em] text-accent uppercase mb-8 flex items-center gap-3">
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
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <header>
        <div className="text-sm text-muted mb-3">
          <span className="text-accent">$</span> whoami
          <span className="cursor ml-1" aria-hidden>
            ▋
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {profile.name}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {profile.role} @ {profile.company} · {profile.location}
        </p>

        <div className="mt-8 border-l-2 border-line pl-4 font-sans text-[15px] leading-relaxed text-foreground/90 space-y-1">
          {profile.tagline.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <nav className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
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

      <section className="mt-20">
        <SectionHeading>experience</SectionHeading>
        <div className="space-y-12">
          {experience.map((job) => (
            <article key={job.company}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  {job.company}
                  {job.current && (
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
                      title="Current role"
                    />
                  )}
                </h3>
                <span className="text-xs text-muted tabular-nums">{job.period}</span>
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
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading>building</SectionHeading>
        <div className="space-y-6">
          {projects.map((project) => (
            <article
              key={project.name}
              className="rounded-md border border-line bg-panel p-6"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-base font-semibold text-foreground">
                  {project.name}
                </h3>
                <span className="text-xs text-muted tabular-nums">{project.year}</span>
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
          ))}
        </div>
      </section>

      <section className="mt-20">
        <SectionHeading>stack</SectionHeading>
        <dl className="space-y-3 text-sm">
          {skills.map((group) => (
            <div key={group.label} className="sm:flex sm:gap-4">
              <dt className="w-32 shrink-0 text-muted">{group.label}</dt>
              <dd className="mt-1 sm:mt-0 text-foreground/85">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20">
        <SectionHeading>education</SectionHeading>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-base font-semibold text-foreground">
            {education.school}
          </h3>
          <span className="text-xs text-muted tabular-nums">{education.period}</span>
        </div>
        <p className="mt-1 text-sm text-muted">
          {education.degree} · {education.location}
        </p>
      </section>

      <footer className="mt-24 border-t border-line pt-6 text-xs text-muted">
        <span className="text-accent">$</span> built with next.js · deployed on vercel
      </footer>
    </main>
  );
}
