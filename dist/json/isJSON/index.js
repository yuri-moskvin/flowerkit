/**
 * Checks if string is a valid JSON string
 * @param str{String} - source String
 * @return {Boolean}
 * @example
 * // How to check if string is a JSON?
 * const str = '{ "hello": "world" }';
 * const isStrJSON = isJSON(str);
 * console.log(isStrJSON); // => true
 */
const isJSON=str=>{if(typeof str==="string"&&str.length)try{const json=JSON.parse(str);return typeof json==="object"}catch(err){return false}else return false};export{isJSON};
//# sourceMappingURL=index.js.map
