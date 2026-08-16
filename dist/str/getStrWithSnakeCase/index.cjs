Object.defineProperty(exports,"__esModule",{value:true});var index=require("../_caseWords/index.cjs");const getStrWithSnakeCase=str=>{if(typeof str!=="string")throw new TypeError("getStrWithSnakeCase: str must be a string");return index._getCaseWords(str).map(word=>word.toLocaleLowerCase()).join("_")};exports.getStrWithSnakeCase=getStrWithSnakeCase;
//# sourceMappingURL=index.cjs.map
