import ow from"ow";
/**
 * Gets object from FormData interface
 * @param fd{FormData=} - source FormData instance
 * @return {Object}
 * @example
 * // How to convert FormData to object?
 * const fd = new FormData();
 * fd.append("test", "val");
 *
 * getObjFromFd(fd); // { test: "val" }
 */const getObjFromFormData=(fd=new FormData)=>{ow(fd,ow.object.validate((value=>({validator:value instanceof FormData,message:`Fd must be FormData`}))));const entries=[...fd].map((([name,value])=>{const values=fd.getAll(name);return[name,values.length>1?values:value]}));return Object.fromEntries(entries)};export{getObjFromFormData};
//# sourceMappingURL=index.js.map
