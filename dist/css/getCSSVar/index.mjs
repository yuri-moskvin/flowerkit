import{getCSSValue}from"../getCSSValue/index.mjs";
/**
 * Gets value of CSS variable
 * @param el{HTMLElement} source DOM element
 * @param variable{String} variable name
 * @param isNumberFormat{Boolean=} whether to return a number rather than a string
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @returns {string|number}
 * @throws {TypeError} getCSSVar: el must be an HTMLElement
 * @throws {TypeError} getCSSVar: variable must be a non-empty string
 * @throws {TypeError} getCSSVar: isNumberFormat must be a boolean
 * @example
 * // How to get CSS3 variable value from an element?
 * const block = document.querySelector("#myBlock"); // <div id="myBlock" style="--myVar: value;">
 * getCSSVar(block, "--myVar"); // or just "myVar"
 */const getCSSVar=(el,variable,isNumberFormat=false)=>{if(!el||typeof el.style!=="object")throw new TypeError("getCSSVar: el must be an HTMLElement");if(typeof variable!=="string"||variable.length===0)throw new TypeError("getCSSVar: variable must be a non-empty string");if(typeof isNumberFormat!=="boolean")throw new TypeError("getCSSVar: isNumberFormat must be a boolean");const prefix="--";const prop=variable.startsWith(prefix)?variable:prefix+variable;const value=getCSSValue(el,prop);return isNumberFormat?parseFloat(value):value};export{getCSSVar};
//# sourceMappingURL=index.mjs.map
