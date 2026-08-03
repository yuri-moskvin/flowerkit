const getLastFromIterable=obj=>{const hasLen=obj&&typeof obj.length==="number";const hasIter=obj&&typeof obj[Symbol.iterator]==="function";if(!hasLen||!hasIter)throw new TypeError("getLastFromIterable: obj must be iterable with a numeric length");const{length:length}=obj;return length?obj[length-1]:null};export{getLastFromIterable};
//# sourceMappingURL=index.mjs.map
