Object.defineProperty(exports,"__esModule",{value:true});const isStrInSnakeCase=str=>{if(typeof str!=="string")throw new TypeError("isStrInSnakeCase: str must be a string");const pattern=/^[a-z]+(?:_[a-z]+)*$/;return!!str.length&&pattern.test(str)};exports.isStrInSnakeCase=isStrInSnakeCase;
//# sourceMappingURL=index.cjs.map
