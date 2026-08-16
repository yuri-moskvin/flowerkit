const _getDateValue=(value,functionName)=>{const date=value instanceof Date?new Date(value.getTime()):new Date(value);if(Number.isNaN(date.getTime()))throw new TypeError(`${functionName}: date must be a valid date`);return date};export{_getDateValue};
//# sourceMappingURL=index.mjs.map
