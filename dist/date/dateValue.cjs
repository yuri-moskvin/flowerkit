Object.defineProperty(exports,"__esModule",{value:true});const getDateValue=(value,functionName)=>{const date=value instanceof Date?new Date(value.getTime()):new Date(value);if(Number.isNaN(date.getTime()))throw new TypeError(`${functionName}: date must be a valid date`);return date};exports.getDateValue=getDateValue;
//# sourceMappingURL=dateValue.cjs.map
