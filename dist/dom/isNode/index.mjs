const isNode=el=>{if(typeof Element==="undefined"||typeof Document==="undefined")return el!==null&&typeof el==="object"&&el.nodeType===1&&typeof el.style==="object"&&typeof el.ownerDocument==="object";else return el instanceof Element||el instanceof Document};export{isNode};
//# sourceMappingURL=index.mjs.map
