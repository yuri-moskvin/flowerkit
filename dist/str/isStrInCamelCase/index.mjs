const isStrInCamelCase=str=>{if(typeof str!=="string")throw new TypeError("isStrInCamelCase: str must be a string");return!!str.length&&/^([a-z]+)(([A-Z]([a-z]+))+)$/.test(str)};export{isStrInCamelCase};
//# sourceMappingURL=index.mjs.map
