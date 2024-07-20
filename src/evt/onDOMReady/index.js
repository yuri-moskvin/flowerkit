import ow from "ow";
import { getDocument } from "ssr-window";

/**
 * Runs callback when DOM tree can be manipulated
 * @param cb{Function} - callback function
 * @param isAutoInit{Boolean=} - attaches event immediately
 * @return {{ handler: Function, addListener: Function, removeListener: Function }}
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
 * @example
 * // How to check if DOM is ready?
 * const callback = () => console.log("DOM Content Loaded");
 * onDOMReady(callback);
 */
const onDOMReady = (cb, isAutoInit = true) => {

  ow(cb, ow.function);

  const handler = () => {
    cb();
  };

  const addListener = () => {
    if (getDocument().readyState === "loading") {
      getDocument().addEventListener("DOMContentLoaded", handler);
    } else {
      handler();
    }
  };

  const removeListener = () => {
    getDocument().removeEventListener("DOMContentLoaded", handler);
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
  onDOMReady
};
