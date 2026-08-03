Object.defineProperty(exports,"__esModule",{value:true});var index=require("../isValidDate/index.cjs");const getPureDate=(date=new Date)=>{const convertedDate=index.isValidDate(date)?new Date(date.getTime()):new Date(date);if(!index.isValidDate(convertedDate))return null;convertedDate.setHours(0,0,0,0);return convertedDate};exports.getPureDate=getPureDate;
//# sourceMappingURL=index.cjs.map
