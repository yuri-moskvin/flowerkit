/**
 * Gets a `Promise` that resolves after specific time
 * @param {number} [ms=0] delay in ms
 * @returns {Promise<void>}
 * @throws {TypeError} wait: ms must be a non-negative finite number
 * @example
 * // How to sleep/delay in JS?
 * wait(3000).finally(() => {
 *   console.log("Runs after 3 sec!");
 * })
 */
const wait=(ms=0)=>{if(typeof ms!=="number"||!Number.isFinite(ms)||ms<0)throw new TypeError("wait: ms must be a non-negative finite number");return new Promise((resolve=>{setTimeout(resolve,ms)}))};export{wait};
//# sourceMappingURL=index.mjs.map
