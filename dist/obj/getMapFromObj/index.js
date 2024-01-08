import ow from"ow";
/**
 * Gets a Map from object
 * @param obj{Object=} - source object
 * @param getFiltered{Function=} - filter function for each pair of key and value
 * @return {Map}
 * @example
 * // How to convert an object to ES6 Map and pass only number values?
 * const sourceObj = {
 *   hello: "world",
 *   goodbye: 1
 * };
 * const targetMap = getMapFromObj(sourceObj, (key, value, index) => typeof value === "number");
 * console.log(targetMap); // => Map<"goodbye", 1>
 */const getMapFromObj=(obj={},getFiltered=((key,value,index)=>true))=>{ow(obj,ow.object);ow(getFiltered,ow.optional.function);const map=new Map;Object.entries(obj).forEach((([key,value],index)=>{if(getFiltered(key,value,index))map.set(key,value)}));return map};export{getMapFromObj};
//# sourceMappingURL=index.js.map
