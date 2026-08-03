const getStrWithCapitalized=str=>{if(typeof str!=="string")throw new TypeError("getStrWithCapitalized: str must be a string");if(!str.length)return"";const trimmed=str.trim();if(!trimmed)return"";return trimmed[0].toUpperCase()+trimmed.slice(1)};export{getStrWithCapitalized};
//# sourceMappingURL=index.mjs.map
