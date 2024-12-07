import ow from "ow";
import { getWindow } from "ssr-window";
import { getDebouncedFn } from "../../fn/getDebouncedFn/index.js";

/**
 * Runs callback when page has been resized
 * @param cb{Function} - callback function
 * @param delay{Number=} - callback execution delay
 * @param isAutoInit{Boolean=} - attaches event immediately
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/resize_event
 * @return {{ handler: Function, addListener: Function, removeListener: Function }}
 * @example
 * // How to detect when page has been resized and run callback once when resize ends?
 * const callback = () => console.log("Page resized");
 * onWindowResize(callback);
 *
 * // How to remove "resize" callback event listener?
 * const { removeListener, addListener } = onWindowResize(callback, 300, false);
 * addListener(); // adds listener manually
 * removeListener(); // removes listener manually
 * */
const onWindowResize = (cb, delay = 300, isAutoInit = true) => {

  ow(cb, ow.function);
  ow(delay, ow.optional.number);
  ow(isAutoInit, ow.optional.boolean);

  const handler = () => {
    if (delay) {
      const fn = getDebouncedFn(cb);
      fn();
    } else {
      cb();
    }
  };

  const addListener = () => {
    window.addEventListener("resize", handler);
  };

  const removeListener = () => {
    getWindow().removeEventListener("resize", handler);
  };

  if (isAutoInit) {
    addListener();
  }

  return {
    handler,
    addListener,
    removeListener
  };
};

export {
  onWindowResize
};
