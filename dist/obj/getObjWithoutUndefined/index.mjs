const getObjWithoutUndefined=obj=>{if(!obj||typeof obj!=="object"||Array.isArray(obj))throw new TypeError("getObjWithoutUndefined: obj must be a plain object");const result={};Reflect.ownKeys(obj).forEach(key=>{const value=obj[key];if(value!==void 0)result[key]=value});return result};export{getObjWithoutUndefined};
//# sourceMappingURL=index.mjs.map
