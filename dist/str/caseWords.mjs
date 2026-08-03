const getCaseWords=str=>str.trim().replace(/([\p{Ll}\d])(\p{Lu})/gu,"$1 $2").replace(/(\p{Lu})(\p{Lu}\p{Ll})/gu,"$1 $2").split(/[^\p{L}\p{N}]+/u).filter(Boolean);export{getCaseWords};
//# sourceMappingURL=caseWords.mjs.map
