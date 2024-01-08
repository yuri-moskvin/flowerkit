import { getDebouncedFn } from "./index.js";

describe(getDebouncedFn.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getDebouncedFn("")).toThrow();
    expect(() => getDebouncedFn(() => {}, null)).toThrow();
  });

  test("Checks for calling of debounced fn with 1000ms delay", () => {

    jest.useFakeTimers();

    const fn = jest.fn();
    const debouncedFn = getDebouncedFn(fn, 1000);

    debouncedFn();

    jest.advanceTimersByTime(500);
    debouncedFn();
    expect(fn).not.toBeCalled();

    jest.runAllTimers();

    expect(fn).toBeCalledTimes(1);
  });
});
