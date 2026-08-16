import{_getCaseWords}from"../_caseWords/index.mjs";const getStrWithKebabCase=str=>{if(typeof str!=="string")throw new TypeError("getStrWithKebabCase: str must be a string");return _getCaseWords(str).map(word=>word.toLocaleLowerCase()).join("-")};export{getStrWithKebabCase};
//# sourceMappingURL=index.mjs.map
