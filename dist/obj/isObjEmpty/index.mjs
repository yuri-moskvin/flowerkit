const isObjEmpty=obj=>{if(obj===null||typeof obj!=="object")throw new TypeError("isObjEmpty: obj must be an object or array");if(Array.isArray(obj))return obj.length===0;const prototype=Object.getPrototypeOf(obj);return(prototype===Object.prototype||prototype===null)&&Object.keys(obj).length===0};export{isObjEmpty};
//# sourceMappingURL=index.mjs.map
