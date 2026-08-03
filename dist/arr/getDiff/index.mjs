const getDiff=(arr1,arr2)=>{if(!Array.isArray(arr1)||!Array.isArray(arr2))throw new TypeError("getDiff: arr1 and arr2 must be arrays");return[...arr1.filter(value=>!arr2.includes(value)),...arr2.filter(value=>!arr1.includes(value))]};export{getDiff};
//# sourceMappingURL=index.mjs.map
