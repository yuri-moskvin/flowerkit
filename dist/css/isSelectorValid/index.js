import ow from"ow";import{getDocument}from"ssr-window";
/**
 * Checks if string is valid CSS selector
 * @param str{String} - source selector
 * @return {boolean}
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors
 * @example
 * // How to check if CSS selector is valid?
 * const selector = "#myElement";
 * const isValid = isSelectorValid(selector);
 * console.log(isValid); // => true
 */const isSelectorValid=str=>{ow(str,ow.string.not.empty);try{getDocument().createDocumentFragment().querySelector(str)}catch{return false}return true};export{isSelectorValid};
//# sourceMappingURL=index.js.map
