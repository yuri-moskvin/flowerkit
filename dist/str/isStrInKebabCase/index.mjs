const isStrInKebabCase=str=>{if(typeof str!=="string")throw new TypeError("isStrInKebabCase: str must be a string");const pattern=/^[a-z]+(?:-[a-z]+)*$/;return!!str.length&&pattern.test(str)};export{isStrInKebabCase};
//# sourceMappingURL=index.mjs.map
