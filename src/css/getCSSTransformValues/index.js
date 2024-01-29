import ow from "ow";
import { getWindow } from "ssr-window";
import { isNode } from "../../dom/isNode/index.js";

/**
 * Gets an object with `x`, `y`, `z` values of CSS3 transform
 * @param el{HTMLElement|Node|Element|Document} - DOM element
 * @return {{x: number, y: number, z: number}}
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/transform
 * @example
 * // How to get `translate3d` values of a `div`?
 * // <div id="block" style="transform: translate3d(10px, 15px, 35px);"></div>
 * const block = document.getElementById("block");
 * const values = getCSSTransformValues(block);
 * console.log(values); // => { x: 10, y: 15, z: 35 }
 */
const getCSSTransformValues = (el) => {

  ow(el, ow.object.validate(value => ({
    validator: isNode(value),
    message: () => `The object must be node`
  })));

  const style = getWindow().getComputedStyle(el);
  const matrix = style.transform;

  const matrixType = matrix === "none" ? "none" : matrix.includes("3d") ? "3d" : "2d";

  const getValues = (index) => {
    const val = matrix.match(/matrix.*\((.+)\)/);
    return val ? val[1].split(", ")[index] : 0;
  };


  switch (matrixType) {
    case "2d": {
      return {
        x: getValues(4),
        y: getValues(5),
        z: 0
      };
    }
    case "3d": {
      return {
        x: getValues(12),
        y: getValues(13),
        z: getValues(14),
      };
    }
    case "none":
    default: {
      return {
        x: 0,
        y: 0,
        z: 0
      };
    }
  }

};

export {
  getCSSTransformValues
};
