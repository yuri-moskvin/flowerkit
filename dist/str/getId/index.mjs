import{getRandomIntFromInterval}from"../../num/getRandomIntFromInterval/index.mjs";
/**
 * Gets unique string ID.
 * @param length{Number=} length of ID
 * @returns {string}
 * @throws {TypeError} getId: length must be a positive finite integer
 * @example
 * // How to generate unique string ID?
 * const uniqueId = getId(100);
 * console.log(uniqueId.length); // 100
 */const getId=(length=getRandomIntFromInterval(8,16))=>{if(typeof length!=="number"||!Number.isFinite(length)||length<=0||Math.floor(length)!==length)throw new TypeError("getId: length must be a positive finite integer");const str=new Array(3).fill("").map((()=>Math.random().toString(36).substring(2)));const counter=Math.floor(Math.random()*10**8);return`${str.join("")}}${counter}`.substring(0,length)};export{getId};
//# sourceMappingURL=index.mjs.map
