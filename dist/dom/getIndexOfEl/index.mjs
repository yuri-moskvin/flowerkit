const getIndexOfEl=el=>{if(!el||typeof el.parentNode==="undefined")throw new TypeError("getIndexOfEl: el must be a Node/Element");const parent=el.parentNode;if(parent&&parent.children)return Array.from(parent.children).indexOf(el);else return 0};export{getIndexOfEl};
//# sourceMappingURL=index.mjs.map
