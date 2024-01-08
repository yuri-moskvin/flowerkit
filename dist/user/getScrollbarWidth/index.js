import{getDocument}from"ssr-window";
/**
 * Gets width of user scrollbar
 * @return {number}
 * @example
 * // How to get width of user scrollbar?
 * const scrollbarWidth = getScrollBarWidth();
 * console.log(scrollbarWidth); // => number
 */const getScrollbarWidth=()=>{const doc=getDocument();const outer=doc.createElement("div");outer.style.visibility="hidden";outer.style.overflow="scroll";outer.style.msOverflowStyle="scrollbar";doc.body.appendChild(outer);const inner=doc.createElement("div");outer.appendChild(inner);const scrollbarWidth=outer.offsetWidth-inner.offsetWidth;outer.parentNode.removeChild(outer);return scrollbarWidth};export{getScrollbarWidth};
//# sourceMappingURL=index.js.map
