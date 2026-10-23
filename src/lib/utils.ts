import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * The house's type ladder is four custom font-size utilities — `text-label`,
 * `text-meta`, `text-small`, `text-body` — and tailwind-merge has to know
 * they are sizes.
 *
 * By default tailwind-merge classifies any `text-*` class it does not
 * recognise as a *colour*, so `text-meta` and `text-background` land in the
 * same group and the earlier one is dropped: the size silently disappears
 * from every element that also sets a text colour, and the element falls
 * back to the browser's 16px. Teaching the merge about the four steps keeps
 * a size and a colour as two different groups.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["label", "meta", "small", "body"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
