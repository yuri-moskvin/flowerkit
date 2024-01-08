import ow from"ow";
/**
 * Gets a string with replaced HTML entities on special chars
 * @param str{String} - source string
 * @return {string}
 * @example
 * // How to unescape special HTML characters?
 * const str = "&lt;b&gt;Hello world &amp; underworld!&lt;/b&gt;";
 * const escaped = getStrEscaped(str);
 * console.log(escaped); // => "<b>Hello world & underworld!</b>"
 */const getStrUnescaped=str=>{ow(str,ow.string);const symbols={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"};const regExp=/&(?:amp|lt|gt|quot|#39);/g;const getUnescaped=char=>symbols[char];return str.replace(regExp,getUnescaped)};export{getStrUnescaped};
//# sourceMappingURL=index.js.map
