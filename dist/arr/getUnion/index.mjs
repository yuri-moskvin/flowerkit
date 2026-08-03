const getUnion=(arr1,arr2)=>{if(!Array.isArray(arr1)||!Array.isArray(arr2))throw new TypeError("getUnion: arr1 and arr2 must be arrays");return[...new Set([...arr1,...arr2])]};export{getUnion};
//# sourceMappingURL=index.mjs.map
