import ow from"ow";
/**
 * Checks if string is URL address or valid pathname of URL address
 * @param str{String} - source string
 * @return {boolean}
 * @example
 * // How to check if string is URL or pathname of URL?
 * const isUrl = isStrUrl("myPage.php");
 * console.log(isUrl); // => true
 */const isStrUrl=str=>{ow(str,ow.string);const res=str.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);return res!==null};export{isStrUrl};
//# sourceMappingURL=index.js.map
