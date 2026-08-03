import{getDateValue}from"../dateValue.mjs";const getDateFormatted=(date,locales,options={})=>{if(!options||typeof options!=="object"||Array.isArray(options))throw new TypeError("getDateFormatted: options must be a plain object");return new Intl.DateTimeFormat(locales,options).format(getDateValue(date,getDateFormatted.name))};export{getDateFormatted};
//# sourceMappingURL=index.mjs.map
