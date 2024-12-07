import ow from "ow";

/**
 * Gets a throttled function with specific delay
 * @param func{Function} - function
 * @param delay{Number=} - delay in ms, 1000 by default
 * @return {*}
 * @example
 * // How to implement function throttling?
 * const getDataFromAPI = () => Promise.resolve([]);
 * const getThrottledDataFromAPI = getThrottledFn(getDataFromAPI, 3000);
 * getThrottledFn(); // => []
 */
const getThrottledFn = (func, delay = 1000) => {

  ow(func, ow.function);
  ow(delay, ow.optional.number.not.infinite);

  let timeout = null;
  return (...args) => {
    if (!timeout) {
      func(...args);
      timeout = setTimeout(() => {
        timeout = null;
      }, delay);
    }
  };
};

export {
  getThrottledFn
};
