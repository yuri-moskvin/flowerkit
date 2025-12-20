Object.defineProperty(exports,"__esModule",{value:true});
/**
 * Gets min number from an array of numbers
 * @param {number[]} arr Source array of numbers (must be non-empty)
 * @returns {number} Minimum value
 * @throws {TypeError} getMinFromArr: expected a non-empty array of numbers
 * @example
 * // How to get min number from Array of numbers?
 * const arr = [ 100, 200, 300 ];
 * const min = getMinFromArr(arr);
 * console.log(min); // 100
 */const getMinFromArr=arr=>{const isValid=Array.isArray(arr)&&arr.length>0&&arr.every((v=>typeof v==="number"&&(Number.isFinite(v)||v===Infinity||v===-Infinity)));if(!isValid)throw new TypeError("getMinFromArr: expected a non-empty array of numbers");return arr.reduce(((p,v)=>p<v?p:v))};exports.getMinFromArr=getMinFromArr;
//# sourceMappingURL=index.cjs.map
