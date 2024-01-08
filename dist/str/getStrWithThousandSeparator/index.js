import ow from"ow";
/**
 * Gets a formatted string with thousands separators from given number
 * @param num{Number} - source number
 * @param separator{String=} - separator between every thousand
 * @return {string}
 * @example
 * // How to format a number with commas as thousands separators?
 * const str = getStrWithThousandSeparator(1000000, ",");
 * console.log(str); // => "1,000,000"
 */const getStrWithThousandSeparator=(num,separator=" ")=>{ow(num,ow.number.not.infinite);ow(separator,ow.optional.string);return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,separator)};export{getStrWithThousandSeparator};
//# sourceMappingURL=index.js.map
