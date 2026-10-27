"use client";

/**
 * The door out of a case page.
 *
 * A case page is a shop window: it shows the thing and, if the thing is open to
 * a stranger, says so in the corner so a reader who is convinced never has to
 * scroll looking for the way in. It is the only element on the site that is
 * fixed, so it is deliberately small and quiet.
 */
export function ProjectLive({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="plastic-live"
      data-cursor-label="open"
    >
      <span>{label}</span>
      <span aria-hidden className="plastic-live__arrow">
        ↗
      </span>
    </a>
  );
}
