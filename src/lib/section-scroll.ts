/**
 * Pure section-navigation boundary decisions for the plastic home.
 *
 * Zero-dependency so the node:test gate can pin the contracts without a DOM.
 * The hook (`useSmoothSectionScroll`) and the portfolio menu import these;
 * all DOM reads (scroll metrics, focus) stay at the call sites.
 */

export type ScrollMetrics = {
  scrollTop: number;
  scrollHeight: number;
  clientHeight: number;
};

export function atScrollTop({ scrollTop }: ScrollMetrics): boolean {
  return scrollTop <= 0;
}

export function atScrollBottom({
  scrollTop,
  scrollHeight,
  clientHeight,
}: ScrollMetrics): boolean {
  // 2px tolerance for fractional layout / zoom rounding.
  return scrollTop + clientHeight >= scrollHeight - 2;
}

/**
 * Whether a section-advance gesture in `direction` (+1 = next/down,
 * -1 = prev/up) may move sections, given the innermost `[data-section-scroll]`
 * region metrics — or null when the gesture started outside any region.
 *
 * A region that cannot scroll (content fits) reports both edges, so gestures
 * always advance — deliberate tour swipes are preserved.
 */
export function shouldAdvanceSection(
  direction: 1 | -1,
  metrics: ScrollMetrics | null,
): boolean {
  if (!metrics) return true;
  return direction > 0 ? atScrollBottom(metrics) : atScrollTop(metrics);
}

export type MenuNavKey = "ArrowDown" | "ArrowUp" | "Home" | "End";

/**
 * Roving focus target for the flat portfolio link menu. Wraps at both ends;
 * Home/End jump. Degenerate totals never yield an out-of-range index.
 */
export function nextMenuIndex(current: number, total: number, key: MenuNavKey): number {
  if (total <= 0) return 0;
  switch (key) {
    case "ArrowDown":
      return (current + 1) % total;
    case "ArrowUp":
      return (current - 1 + total) % total;
    case "Home":
      return 0;
    case "End":
      return total - 1;
  }
}
