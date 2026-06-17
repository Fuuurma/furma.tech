/** Subtle film grain overlay — agency portfolio aesthetic */
export function FilmGrain({ className = "" }: { className?: string }) {
  return (
    <div
      className={`film-grain pointer-events-none ${className}`}
      aria-hidden
    />
  );
}
