/**
 * Unescapes HTML entities back to their characters.
 * Unescaped: `&amp; &lt; &gt; &quot; &#39;`
 * @param {string} str Source string
 * @returns {string} Unescaped string
 * @throws {TypeError} If str is not a string
 * @example
 * getStrUnescaped("&lt;b&gt;Hello &amp; world&lt;/b&gt;");
 * // => "<b>Hello & world</b>"
 */
export const getStrUnescaped = (str: string): string => {
  if (typeof str !== "string") {
    throw new TypeError("getStrUnescaped: str must be a string");
  }

  const symbols: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": "\"",
    "&#39;": "'",
  };

  const regExp = /&(?:amp|lt|gt|quot|#39);/g;

  const getUnescaped = (entity: "&amp;" | "&lt;" | "&gt;" | "&quot;" | "&#39;"): string => symbols[entity];

  return str.replace(regExp, getUnescaped as (m: string) => string);
};
