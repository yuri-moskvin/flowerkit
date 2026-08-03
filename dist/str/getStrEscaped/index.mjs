const getStrEscaped=str=>{if(typeof str!=="string")throw new TypeError("getStrEscaped: str must be a string");const symbols={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"};const regExp=/[&<>"']/g;const getEscaped=char=>symbols[char];return str.replace(regExp,getEscaped)};export{getStrEscaped};
//# sourceMappingURL=index.mjs.map
