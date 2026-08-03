const getElSiblings=el=>{if(!el||typeof el.nodeType!=="number")throw new TypeError("getElSiblings: el must be an HTMLElement");const siblings=[];let sibling=el?.parentNode?.firstChild;while(sibling){if(sibling.nodeType===1&&sibling!==el)siblings.push(sibling);sibling=sibling.nextSibling}return siblings};export{getElSiblings};
//# sourceMappingURL=index.mjs.map
