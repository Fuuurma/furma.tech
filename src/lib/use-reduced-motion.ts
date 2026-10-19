"use client";

import { useEffect, useState } from "react";

/**
 * Reduced-motion preference that is safe to branch markup on.
 *
 * framer-motion's `useReducedMotion` reports `null` on the server and the
 * real value on the very first client render. Any component that changes
 * class names or element structure on that value therefore renders one thing
 * on the server and another on the client, which React reports as a
 * hydration mismatch (error #418) and recovers from by re-rendering.
 *
 * This hook reports `false` for the server render and the first client
 * render, then switches to the real preference after mount, so the first
 * paint always agrees between the two.
 */
export function useStableReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}
