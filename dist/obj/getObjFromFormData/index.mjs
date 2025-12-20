/**
 * Gets an object from `FormData` interface
 * @param {FormData} [fd=new FormData()] Source `FormData` instance
 * @returns {Record<string, string|File|(string|File)[]>} Object representation
 * @throws {TypeError} getObjFromFormData: fd must be a FormData instance
 * @example
 * // How to convert `FormData` to object?
 * const fd = new FormData();
 * fd.append("test", "val");
 * getObjFromFormData(fd); // { test: "val" }
 */
const getObjFromFormData=(fd=new FormData)=>{if(!(fd instanceof FormData))throw new TypeError("getObjFromFormData: fd must be a FormData instance");const entries=[...fd].map((([name,value])=>{const values=fd.getAll(name);return[name,values.length>1?values:value]}));return Object.fromEntries(entries)};export{getObjFromFormData};
//# sourceMappingURL=index.mjs.map
