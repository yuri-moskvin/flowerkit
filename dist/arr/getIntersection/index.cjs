Object.defineProperty(exports,"__esModule",{value:true});const getIntersection=(arr1,arr2)=>{if(!Array.isArray(arr1)||!Array.isArray(arr2))throw new TypeError("getIntersection: arr1 and arr2 must be arrays");return[...arr1].filter(val=>arr2.includes(val))};exports.getIntersection=getIntersection;
//# sourceMappingURL=index.cjs.map
