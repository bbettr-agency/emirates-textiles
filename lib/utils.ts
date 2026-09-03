/**
 * cn — merge conditional class names without pulling in a dependency.
 * Falsy values are dropped; the rest are space-joined.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
