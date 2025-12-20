/**
 * Pads a number with leading zeros to match the desired digit count. Preserves sign for negative numbers.
 *
 * @param {number} num Source number
 * @param {number} [digits=2] Desired total digits for the absolute value
 * @returns {string} Zero-padded string
 * @throws {TypeError} If inputs are invalid
 * @example
 * getStrWithZeroFromNum(9, 3); // "009"
 * getStrWithZeroFromNum(-10, 5); // "-00010"
 */
const getStrWithZeroFromNum=(num,digits=2)=>{if(!Number.isFinite(num))throw new TypeError("getStrWithZeroFromNum: num must be a finite number");if(!Number.isFinite(digits)||digits<0||Math.floor(digits)!==digits)throw new TypeError("getStrWithZeroFromNum: digits must be a non-negative integer");const absNum=Math.abs(num);const raw=String(absNum);const padCount=Math.max(digits-raw.length,0);const padded=(padCount?"0".repeat(padCount):"")+raw;return(num<0?"-":"")+padded};export{getStrWithZeroFromNum};
//# sourceMappingURL=index.mjs.map
