/**
 *
 * Verify if the document has loaded.
 * @returns Boolean
 */

export default typeof window !== "undefined" &&
  typeof document !== "undefined" &&
  typeof navigator !== "undefined";
