Object.defineProperty(exports,"__esModule",{value:true});var ssrWindow=require("ssr-window");const isSelectorValid=str=>{if(typeof str!=="string")throw new TypeError("isSelectorValid: str must be a string");try{ssrWindow.getDocument().createDocumentFragment().querySelector(str)}catch{return false}return true};exports.isSelectorValid=isSelectorValid;
//# sourceMappingURL=index.cjs.map
