import ow from"ow";
/**
 * Gets a Promise that resolves after specific time
 * @param ms{Number=} - delay in ms
 * @return {Promise}
 * @example
 * // How to sleep/delay in JS?
 * wait(3000).then(() => {
 *   console.log("Runs after 3 sec!");
 * })
 */const wait=(ms=0)=>{ow(ms,ow.optional.number.not.infinite);return new Promise((resolve=>{setTimeout(resolve,ms)}))};export{wait};
//# sourceMappingURL=index.js.map
