const isStrUrl=str=>{if(typeof str!=="string")throw new TypeError("isStrUrl: str must be a string");const res=str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/g);return res!==null};export{isStrUrl};
//# sourceMappingURL=index.mjs.map
