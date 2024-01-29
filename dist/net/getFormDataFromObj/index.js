import ow from"ow";const setItemFn=(name="",value,fd=new FormData)=>{fd.set(name,value?.toString()??"")};
/**
 * Gets FormData from object
 * @param obj{Object=} - source object
 * @param fd{FormData=} - FormData instance
 * @param setItem{Function=} - callback for each object key/value pair
 * @return {FormData}
 * @example
 * // How to convert object to FormData interface?
 * const obj = {
 *   test: 123,
 *   boo: "foo"
 * }
 *
 * getFormDataFromObj(obj); // FormData with "test" and "boo" keys
 *
 * // With custom callback
 * getFormDataFromObj(obj, new FormData(), (name, value, fd) => {
 *   if(name !== "test") {
 *      fd.set(name, value);
 *   }
 * }); // FormData only with "boo" key
 */const getFormDataFromObj=(obj={},fd=new FormData,setItem=setItemFn)=>{ow(obj,ow.object);ow(fd,ow.object.validate((value=>({validator:value instanceof FormData,message:()=>`Value must be instance of FormData`}))));ow(setItem,ow.function);Object.entries(obj).forEach((([name,value])=>{setItem(name,value,fd)}));return fd};export{getFormDataFromObj};
//# sourceMappingURL=index.js.map
