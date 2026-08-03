import { getWindow } from "ssr-window";

export type TIsMediaQueryArgs = Parameters<typeof isMediaQuery>;

export type TIsMediaQueryReturn = ReturnType<typeof isMediaQuery>;

/**
 * Gets a result of testing a CSS media query and wraps bare media features when needed.
 * @param str{string} source media query string
 * @returns {boolean}
 * @throws {TypeError} isMediaQuery: str must be a string
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Testing_media_queries
 * @example
 * // How to check if a user device has portrait or landscape orientation?
 * const mediaQuery = "(orientation: portrait)";
 * const isPortrait = isMediaQuery(mediaQuery);
 * console.log(isPortrait); // => false
 * @example
 * // Disable decorative animation when the user prefers reduced motion
 * const shouldReduceMotion = isMediaQuery("(prefers-reduced-motion: reduce)");
 */
export const isMediaQuery = (str: string): boolean => {
  if (typeof str !== "string") {
    throw new TypeError("isMediaQuery: str must be a string");
  }

  const query = /^[\w-]+\s*:/u.test(str.trim()) ? `(${str.trim()})` : str.trim();

  return getWindow().matchMedia(query)?.matches ?? false;
};
