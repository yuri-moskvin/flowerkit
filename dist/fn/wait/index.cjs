Object.defineProperty(exports,"__esModule",{value:true});const wait=(ms=0)=>{if(typeof ms!=="number"||!Number.isFinite(ms)||ms<0)throw new TypeError("wait: ms must be a non-negative finite number");return new Promise(resolve=>{setTimeout(resolve,ms)})};exports.wait=wait;
//# sourceMappingURL=index.cjs.map
