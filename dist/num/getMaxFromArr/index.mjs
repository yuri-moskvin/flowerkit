const getMaxFromArr=arr=>{const isValid=Array.isArray(arr)&&arr.length>0&&arr.every(v=>typeof v==="number"&&(Number.isFinite(v)||v===Infinity||v===-Infinity));if(!isValid)throw new TypeError("getMaxFromArr: expected a non-empty array of numbers");return arr.reduce((p,v)=>p>v?p:v)};export{getMaxFromArr};
//# sourceMappingURL=index.mjs.map
