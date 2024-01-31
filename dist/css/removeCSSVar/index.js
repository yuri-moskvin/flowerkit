import ow from"ow";import{getDocument}from"ssr-window";import{isNode}from"../../dom/isNode/index.js";import"node-html-parser";
/**
 * Removes CSS3 variable from specific DOM node
 * @param el{HTMLElement|Node|Element|Document=} - DOM element
 * @param variable{String} - variable name
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
 * @example
 * // How to remove CSS variable from div?
 * // <div id="myBlock" style="--myVar: 10;"></div>
 * const block = document.getElementById("myBlock");
 * removeCSSVar(block, "myVar");
 * // <div id="myBlock" style=""></div>
 */const removeCSSVar=(el=getDocument().documentElement,variable)=>{ow(el,ow.object.validate((value=>({validator:isNode(value),message:()=>`The object must be node`}))));ow(variable,ow.string.not.empty);el.style.removeProperty(variable.startsWith("--")?variable:`--${variable}`)};export{removeCSSVar};
//# sourceMappingURL=index.js.map
