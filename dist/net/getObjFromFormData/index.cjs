Object.defineProperty(exports,"__esModule",{value:true});var index=require("../../obj/getObjFromFormData/index.cjs");
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
 */const getObjFromFormData=index.getObjFromFormData;exports.getObjFromFormData=getObjFromFormData;
//# sourceMappingURL=index.cjs.map
