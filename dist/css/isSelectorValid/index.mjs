import{getDocument}from"ssr-window";const isSelectorValid=str=>{if(typeof str!=="string")throw new TypeError("isSelectorValid: str must be a string");try{getDocument().createDocumentFragment().querySelector(str)}catch{return false}return true};export{isSelectorValid};
//# sourceMappingURL=index.mjs.map
