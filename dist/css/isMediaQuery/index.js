import ow from"ow";import{getWindow}from"ssr-window";
/**
 * Gets result of testing of a CSS media query
 * @param str{String} - source media query string
 * @return {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Testing_media_queries
 * @example
 * // How to check if user device has portrait or landscape orientation?
 * const mediaQuery = "(orientation: portrait)";
 * const isPortrait = isMediaQuery(mediaQuery);
 * console.log(isPortrait); // => false
 */const isMediaQuery=str=>{ow(str,ow.string.not.empty);return getWindow().matchMedia(str)?.matches??false};export{isMediaQuery};
//# sourceMappingURL=index.js.map
