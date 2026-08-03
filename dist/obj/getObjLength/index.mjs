const getObjLength=(obj={})=>{if(Array.isArray(obj))return obj.length;if(obj===null||typeof obj!=="object")throw new TypeError("getObjLength: obj must be an object or array");return Object.keys(obj).length};export{getObjLength};
//# sourceMappingURL=index.mjs.map
