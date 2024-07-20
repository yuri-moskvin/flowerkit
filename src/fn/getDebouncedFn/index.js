import ow from "ow";

/**
 * Gets a function that is executed no more than once in a specified period of time
 * @param cb{Function} - source function
 * @param wait{Number=} - interval of execution
 * @param isImmediate{Boolean=} - immediate execution
 * @return {function}
 * @example
 * // How to execute function no more than once per second?
 * const fn = getDebouncedFn(alert, 1000);
 *
 * fn(1); // calls immediately
 * fn(2); // ignored
 *
 * setTimeout(() => fn(3), 100); // ignored
 * setTimeout(() => fn(4), 1100); // calls
 * setTimeout(() => fn(5), 1500); // ignored
 */
const getDebouncedFn = (cb, wait = 250, isImmediate = false) => {

  ow(cb, ow.function);
  ow(wait, ow.optional.number.not.infinite);
  ow(isImmediate, ow.optional.boolean);

  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!isImmediate) {
        cb.apply(context, args);
      }
    };
    const callNow = isImmediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      cb.apply(context, args);
    }
  };
};

export {
  getDebouncedFn
};
