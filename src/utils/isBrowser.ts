/**
 *
 * Verify if the document has loaded.
 * @returns Boolean
 */

export function isBrowser(): Boolean {
  if (typeof window !== undefined) {
    return true;
  }

  return false;
}
