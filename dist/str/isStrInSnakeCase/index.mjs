const isStrInSnakeCase=str=>{if(typeof str!=="string")throw new TypeError("isStrInSnakeCase: str must be a string");const pattern=/^[a-z]+(?:_[a-z]+)*$/;return!!str.length&&pattern.test(str)};export{isStrInSnakeCase};
//# sourceMappingURL=index.mjs.map
