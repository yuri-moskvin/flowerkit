Object.defineProperty(exports,"__esModule",{value:true});var index=require("../_caseWords/index.cjs");const getStrWithKebabCase=str=>{if(typeof str!=="string")throw new TypeError("getStrWithKebabCase: str must be a string");return index._getCaseWords(str).map(word=>word.toLocaleLowerCase()).join("-")};exports.getStrWithKebabCase=getStrWithKebabCase;
//# sourceMappingURL=index.cjs.map
