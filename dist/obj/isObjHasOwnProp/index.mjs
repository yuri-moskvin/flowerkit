const isObjHasOwnProp=(obj,prop)=>{if(obj===null||typeof obj!=="object")throw new TypeError("isObjHasOwnProp: obj must be an object");if(typeof prop!=="string"&&typeof prop!=="number"&&typeof prop!=="symbol")throw new TypeError("isObjHasOwnProp: prop must be a string|number|symbol");return Object.prototype.hasOwnProperty.call(obj,prop)};export{isObjHasOwnProp};
//# sourceMappingURL=index.mjs.map
