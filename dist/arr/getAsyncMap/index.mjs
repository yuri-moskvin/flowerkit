const getAsyncMap=async(arr,callback)=>{if(!Array.isArray(arr))return Promise.reject(new TypeError("getAsyncMap: arr must be an array"));if(typeof callback!=="function")return Promise.reject(new TypeError("getAsyncMap: callback must be a function"));return await Promise.all(arr.map((v,i,a)=>Promise.resolve(callback(v,i,a))))};export{getAsyncMap};
//# sourceMappingURL=index.mjs.map
