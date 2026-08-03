import{isValidDate}from"../isValidDate/index.mjs";const getPureDate=(date=new Date)=>{const convertedDate=isValidDate(date)?new Date(date.getTime()):new Date(date);if(!isValidDate(convertedDate))return null;convertedDate.setHours(0,0,0,0);return convertedDate};export{getPureDate};
//# sourceMappingURL=index.mjs.map
