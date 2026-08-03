Object.defineProperty(exports,"__esModule",{value:true});const isStrInKebabCase=str=>{if(typeof str!=="string")throw new TypeError("isStrInKebabCase: str must be a string");const pattern=/^[a-z]+(?:-[a-z]+)*$/;return!!str.length&&pattern.test(str)};exports.isStrInKebabCase=isStrInKebabCase;
//# sourceMappingURL=index.cjs.map
