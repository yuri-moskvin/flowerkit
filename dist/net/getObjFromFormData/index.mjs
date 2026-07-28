import{getObjFromFormData as getObjFromFormData$1}from"../../obj/getObjFromFormData/index.mjs";
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
 */const getObjFromFormData=getObjFromFormData$1;export{getObjFromFormData};
//# sourceMappingURL=index.mjs.map
