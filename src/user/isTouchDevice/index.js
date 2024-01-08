import { getWindow, getDocument } from "ssr-window";

/**
 * Checks if user devise has touchscreen
 * @return {boolean}
 * @example
 * // How to check if user has touchscreen device?
 * const isTouchEnabled = isTouchDevice();
 * console.log(isTouchEnabled); // => false
 */
const isTouchDevice = () => {
  const win = getWindow();
  return !!("ontouchstart" in win || typeof win.navigator.maxTouchPoints !== "undefined" && win.navigator.maxTouchPoints || typeof win.navigator.msMaxTouchPoints !== "undefined" || (win.DocumentTouch && getDocument() instanceof win.DocumentTouch) || win.navigator.msPointerEnabled && win.MSGesture);
};

export {
  isTouchDevice,
};
