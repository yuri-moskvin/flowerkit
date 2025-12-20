/**
 * Checks if a string is a valid JSON string
 * @param {string} str source String
 * @returns {boolean}
 * @example
 * // How to check if string is a JSON?
 * const str = '{ "hello": "world" }';
 * const isStrJSON = isJSON(str);
 * console.log(isStrJSON); // => true
 */
const isJSON=str=>{if(typeof str==="string"&&str.length)try{const json=JSON.parse(str);return typeof json==="object"&&json!==null;
// eslint-disable-next-line no-unused-vars
}catch(_err){return false}return false};export{isJSON};
//# sourceMappingURL=index.mjs.map
