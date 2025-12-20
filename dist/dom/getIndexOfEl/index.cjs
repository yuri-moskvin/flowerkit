Object.defineProperty(exports,"__esModule",{value:true});
/**
 * Gets index of Node from relatively its siblings
 * @param el{HTMLElement|Node|Element|Document} DOM element
 * @returns {number}
 * @throws {TypeError} getIndexOfEl: el must be a Node/Element
 * @example
 * // <ul>
 * //  <li id="a">A</li>
 * //  Text node
 * //  <li id="b">B</li>
 * //  <li id="c">C</li>
 * // </ul>
 * getIndexOfEl(document.querySelector("#c")!) // 2
 */const getIndexOfEl=el=>{if(!el||typeof el.parentNode==="undefined")throw new TypeError("getIndexOfEl: el must be a Node/Element");const parent=el.parentNode;if(parent&&parent.children)return Array.from(parent.children).indexOf(el);else return 0};exports.getIndexOfEl=getIndexOfEl;
//# sourceMappingURL=index.cjs.map
