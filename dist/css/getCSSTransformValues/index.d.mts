/**
 * Gets an object with `x`, `y`, `z` values of CSS3 transform
 * @param el{HTMLElement|Node|Element|Document} DOM element
 * @returns {{x: number, y: number, z: number}}
 * @throws {TypeError} getCSSTransformValues: el must be an HTMLElement
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform
 * @example
 * // How to get `translate3d` values of a `div`?
 * // <div id="block" style="transform: translate3d(10px, 15px, 35px);"></div>
 * const block = document.getElementById("block");
 * const values = getCSSTransformValues(block);
 * console.log(values); // => { x: 10, y: 15, z: 35 }
 */
export declare const getCSSTransformValues: (el: HTMLElement) => {
    x: number;
    y: number;
    z: number;
};
