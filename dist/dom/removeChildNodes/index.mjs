const removeChildNodes=el=>{if(!el||typeof el.nodeType!=="number")throw new TypeError("removeChildNodes: el must be a Node");while(el.firstChild)el.removeChild(el.lastChild)};export{removeChildNodes};
//# sourceMappingURL=index.mjs.map
