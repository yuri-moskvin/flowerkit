import ow from"ow";
/**
 * Gets all values inside an object by the specified key, including deeply nested objects
 * @param obj{Object} - source object
 * @param prop{String} - specified key to find
 * @return {Array}
 * @example
 * // How to get all duplicate key values inside object?
 * const myObj = {
 *   someProp1: {
 *     a: "value 1",
 *     b: 2,
 *     c: 3,
 *     d: {
 *       a: 1,
 *       b: 2
 *     }
 *   },
 *   someProp2: {
 *     a: "value 3",
 *     b: 2,
 *     c: {
 *       a: "value 4"
 *     }
 *   }
 * }
 * getAllSamePropsFromObj(myObj, "a") // [ "value 1", 1, "value 3", "value 4" ]
 */const getAllSamePropsFromObj=(obj,prop)=>{ow(obj,ow.object);ow(prop,ow.string.not.empty);return(res=>(JSON.stringify(obj,((key,value)=>(key===prop&&res.push(value),value))),res))([])};export{getAllSamePropsFromObj};
//# sourceMappingURL=index.js.map
