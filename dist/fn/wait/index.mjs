const wait=(ms=0)=>{if(typeof ms!=="number"||!Number.isFinite(ms)||ms<0)throw new TypeError("wait: ms must be a non-negative finite number");return new Promise(resolve=>{setTimeout(resolve,ms)})};export{wait};
//# sourceMappingURL=index.mjs.map
