import{getCaseWords}from"../caseWords.mjs";const getStrWithSnakeCase=str=>{if(typeof str!=="string")throw new TypeError("getStrWithSnakeCase: str must be a string");return getCaseWords(str).map(word=>word.toLocaleLowerCase()).join("_")};export{getStrWithSnakeCase};
//# sourceMappingURL=index.mjs.map
