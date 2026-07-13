/**
 * Dashed elbow that links one staggered experience card to the next.
 * "ltr" leaves a left-offset card and drops into the right-offset card below it;
 * "rtl" does the reverse. Drawn in a 1000x120 viewBox stretched to the row width,
 * with a non-scaling stroke so the dashes stay even at any screen size.
 */
export function Connector({ dir }: { dir: "ltr" | "rtl" }) {
  const d =
    dir === "ltr"
      ? "M 760 0 H 840 Q 860 0 860 20 V 120"
      : "M 240 0 H 160 Q 140 0 140 20 V 120";

  const nodeX = dir === "ltr" ? "860" : "140";

  return (
    <div className="relative h-24 w-full" aria-hidden>
      {/* Desktop: the zigzag elbow. */}
      <svg
        className="hidden h-full w-full md:block"
        viewBox="0 0 1000 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d={d}
          stroke="var(--line)"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={nodeX} cy="120" r="3" fill="var(--accent)" opacity="0.55" />
      </svg>

      {/* Mobile: cards stack full width, so a plain vertical run is enough. */}
      <svg
        className="h-full w-full md:hidden"
        viewBox="0 0 100 120"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M 50 0 V 120"
          stroke="var(--line)"
          strokeWidth="1.5"
          strokeDasharray="5 6"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="50" cy="120" r="3" fill="var(--accent)" opacity="0.55" />
      </svg>
    </div>
  );
}
