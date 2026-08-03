const getStrUnescaped=str=>{if(typeof str!=="string")throw new TypeError("getStrUnescaped: str must be a string");const symbols={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"};const regExp=/&(?:amp|lt|gt|quot|#39);/g;const getUnescaped=entity=>symbols[entity];return str.replace(regExp,getUnescaped)};export{getStrUnescaped};
//# sourceMappingURL=index.mjs.map
