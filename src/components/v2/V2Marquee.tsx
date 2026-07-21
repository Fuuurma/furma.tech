import { V2_PROJECTS } from "@/lib/v2-projects";

function MarqueeContent() {
  return (
    <>
      {V2_PROJECTS.map((p) => (
        <span key={p.id} className="inline-flex items-center">
          <span className="mx-6 font-[family-name:var(--v2-font-display)] text-sm font-bold tracking-[0.06em] uppercase [font-stretch:115%] md:mx-10 md:text-base">
            {p.name}
          </span>
          <span className="font-[family-name:var(--v2-font-mono)] text-[10px] tracking-[0.14em] text-[var(--v2-cream-60)] uppercase">
            {p.statusLabel}
          </span>
          <span
            aria-hidden="true"
            className="mx-6 text-[var(--v2-accent)] md:mx-10"
          >
            ✳
          </span>
        </span>
      ))}
      <span className="inline-flex items-center">
        <span className="v2-serif-accent mx-6 text-lg md:mx-10 md:text-xl">
          software that works
        </span>
        <span aria-hidden="true" className="mx-6 text-[var(--v2-accent)] md:mx-10">
          ✳
        </span>
      </span>
    </>
  );
}

export function V2Marquee() {
  return (
    <div
      className="v2-marquee border-y border-[var(--v2-ink)] bg-[var(--v2-dark)] py-4 text-[var(--v2-cream-on-dark)]"
      aria-label="Product index ticker"
    >
      <div className="v2-marquee__track">
        <MarqueeContent />
        <MarqueeContent />
      </div>
    </div>
  );
}
