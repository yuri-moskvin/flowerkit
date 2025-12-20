import{getDocument}from"ssr-window";
/**
 * Removes CSS3 variable from specific DOM node
 * @param el{HTMLElement|Node|Element|Document=} DOM element
 * @param variable{String} variable name
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @throws {TypeError} removeCSSVar: el must be an HTMLElement
 * @throws {TypeError} removeCSSVar: variable must be a non-empty string
 * @example
 * // How to remove CSS variable from div?
 * // <div id="myBlock" style="--myVar: 10;"></div>
 * const block = document.getElementById("myBlock");
 * removeCSSVar(block, "myVar");
 * // <div id="myBlock" style=""></div>
 */const removeCSSVar=(el=getDocument().documentElement,variable)=>{if(!el||typeof el.style!=="object")throw new TypeError("removeCSSVar: el must be an HTMLElement");if(typeof variable!=="string"||variable.length===0)throw new TypeError("removeCSSVar: variable must be a non-empty string");el.style.removeProperty(variable.startsWith("--")?variable:`--${variable}`)};export{removeCSSVar};
//# sourceMappingURL=index.mjs.map
