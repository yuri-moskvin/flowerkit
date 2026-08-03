const getObjFromFormData=(fd=new FormData)=>{if(!(fd instanceof FormData))throw new TypeError("getObjFromFormData: fd must be a FormData instance");const entries=[...fd].map(([name,value])=>{const values=fd.getAll(name);return[name,values.length>1?values:value]});return Object.fromEntries(entries)};export{getObjFromFormData};
//# sourceMappingURL=index.mjs.map
