export type TIsMediaQueryArgs = Parameters<typeof isMediaQuery>;
export type TIsMediaQueryReturn = ReturnType<typeof isMediaQuery>;
/**
 * Gets a result of testing of a CSS media query
 * @param str{String} source media query string
 * @returns {boolean}
 * @throws {TypeError} isMediaQuery: str must be a string
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Testing_media_queries
 * @example
 * // How to check if a user device has portrait or landscape orientation?
 * const mediaQuery = "(orientation: portrait)";
 * const isPortrait = isMediaQuery(mediaQuery);
 * console.log(isPortrait); // => false
 */
export declare const isMediaQuery: (str: string) => boolean;
