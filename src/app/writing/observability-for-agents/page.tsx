import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/content";

const title = "Observability for agents, not humans";
const description =
  "Why the logs we've written for twenty years fall apart the moment an agent reads them — and what AgentTrace explores instead.";

export const metadata: Metadata = {
  title: `${title} — ${profile.name}`,
  description,
  openGraph: { title, description, type: "article" },
  twitter: { card: "summary_large_image", title, description },
};

function H2({ children }: { children: string }) {
  return (
    <h2 className="mt-14 mb-4 flex items-center gap-3 text-sm uppercase tracking-[0.18em] text-accent">
      <span aria-hidden>▸</span>
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 font-sans text-[16px] leading-[1.75] text-foreground/85">
      {children}
    </p>
  );
}

function C({ children }: { children: string }) {
  return (
    <code className="rounded bg-panel px-1.5 py-0.5 text-[13px] text-accent">
      {children}
    </code>
  );
}

export default function Article() {
  return (
    <div className="mx-auto w-full max-w-2xl px-6 py-16 sm:py-24">
      <Link
        href="/"
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span> back
      </Link>

      <article className="mt-10">
        <header>
          <p className="text-sm text-muted">
            <span className="text-accent">$</span> cat observability-for-agents.md
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-4 font-sans text-[16px] leading-relaxed text-muted">
            {description}
          </p>
        </header>

        <P>
          Every logging system we use was designed around one reader: a human,
          scanning output after something has already gone wrong. Log levels
          exist so a person can filter noise. Messages are prose because a
          person parses prose. Dashboards are visual because a person sees. The
          entire interface — from <C>log.info()</C> to the Kibana panel — is
          optimised for human eyes arriving after the fact.
        </P>
        <P>
          That assumption held for twenty years. It is now quietly breaking.
        </P>

        <H2>What breaks when an agent reads them</H2>
        <P>
          The first time I pointed an agent at production logs — through an MCP
          server over Elasticsearch, asking it to find the root cause of an
          incident — the failure was immediate and mundane. The relevant context
          was thousands of log lines. The agent tried to pull them into its
          window, blew past the token budget, and when it could not fit
          everything, it filled the gaps by guessing. It produced a confident,
          plausible, wrong answer.
        </P>
        <P>
          The problem was not the model. The problem was the interface. Raw logs
          are a firehose of unstructured text designed to be{" "}
          <em>filtered by a human</em>, not <em>reasoned over by a machine</em>.
          An agent does not want ten thousand lines it has to read linearly. It
          wants the few facts that explain the failure, and the links to follow
          if it needs more.
        </P>

        <H2>What an agent actually needs</H2>
        <P>
          A human debugging an incident reconstructs a story: this request came
          in, it called that service, the state was X, then it became Y, and
          here is where it went wrong. We do this by <em>scanning</em> — our eyes
          are fast and we tolerate noise. An agent cannot afford to scan. It
          needs the story handed to it already assembled:
        </P>
        <ul className="mt-4 space-y-3 font-sans text-[16px] leading-relaxed text-foreground/85">
          <li className="flex gap-3">
            <span className="mt-[10px] h-px w-3 shrink-0 bg-muted" aria-hidden />
            <span>
              <strong className="text-foreground">Causality</strong> — what
              happened <em>because</em> of what, not just what happened near
              what.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-[10px] h-px w-3 shrink-0 bg-muted" aria-hidden />
            <span>
              <strong className="text-foreground">State transitions</strong> —
              what the system looked like before and after each step, and
              precisely what changed.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-[10px] h-px w-3 shrink-0 bg-muted" aria-hidden />
            <span>
              <strong className="text-foreground">Decisions</strong> — when the
              code took one branch over another, which branches were possible
              and why this one was chosen.
            </span>
          </li>
        </ul>
        <P>
          None of that is in a typical log line. A log line records that an event
          occurred. It does not record the counterfactual, the state delta, or
          the reasoning — which are exactly the things you need to answer{" "}
          <em>why</em>. And <em>why</em> is the only question that matters during
          an incident.
        </P>

        <H2>What AgentTrace explores</H2>
        <P>
          AgentTrace is a prototype built around a single change: make those
          three things first-class. Every span it records carries{" "}
          <C>state_before</C>, <C>state_after</C> and a computed{" "}
          <C>state_diff</C>. When code makes a choice, a{" "}
          <C>log_decision(candidates, chosen, rationale)</C> call records the
          branch taken <em>and the ones that were not</em>. Spans are causally
          linked by parent, so a trace is a tree you traverse, not a log you
          scan.
        </P>
        <P>
          On top sits a query interface that answers questions — &ldquo;which
          decision path was taken?&rdquo;, &ldquo;what state changed?&rdquo; — by
          walking that tree and returning a few kilobytes of structured context
          instead of a few megabytes of text. The bet is simple: if the
          telemetry is shaped for machine consumption from the start, an agent
          answers correctly in one pass, at a fraction of the tokens, without
          hallucinating.
        </P>

        <H2>Where this stops being a moat</H2>
        <P>
          I want to be honest about the limits, because the honesty is the point.
          Within a single, well-instrumented vendor, this is not defensible. If
          your logs already carry a transaction ID, Elasticsearch can key on it,
          backtrace and fronttrace, and return the correlated events itself.
          Rebuilding that on top of a vendor is strictly worse than the vendor
          doing it natively. The correlation is the <em>easy</em> part, and
          whoever owns the data owns it.
        </P>
        <P>
          The genuinely hard, genuinely useful problems are elsewhere: stitching
          a causal chain <em>across</em> vendors that no single tool can see;
          reconstructing causality from messy, uninstrumented logs with no clean
          ID to key on; and accumulating memory across incidents, so the system
          recognises that today&rsquo;s failure looks like one from three months
          ago. Those compound. Log correlation does not.
        </P>
        <P>
          So AgentTrace is not a company, and it is not trying to be. It is a
          working argument for a shift I think is coming: as operations move from
          human-first to agent-first, the observability layer has to move with it
          — and the interface we have taken for granted for two decades is the
          thing that has to change.
        </P>

        <footer className="mt-16 border-t border-line pt-6 text-sm text-muted">
          <Link href="/" className="transition-colors hover:text-accent">
            <span aria-hidden>←</span> back to {profile.name.toLowerCase()}
          </Link>
        </footer>
      </article>
    </div>
  );
}
