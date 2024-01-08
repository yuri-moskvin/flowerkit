import { isFnAsync } from "./index.js";

describe(isFnAsync.name, () => {

  test("Checks for other types", () => {
    expect(isFnAsync(null)).toBe(false);
    expect(isFnAsync(1)).toBe(false);
  });

  test("Checks for async fn", () => {
    const asyncFn = async function() {};
    const asyncArrowFn = async () => {};
    const bindAsyncFn = asyncFn.bind({});
    expect(isFnAsync(asyncFn)).toBe(true);
    expect(isFnAsync(asyncArrowFn)).toBe(true);
    expect(isFnAsync(bindAsyncFn)).toBe(true);
  });

  test("Checks for default fn", () => {
    const defaultFn = function() {};
    const defaultArrowFn = () => {};
    expect(isFnAsync(defaultFn)).toBe(false);
    expect(isFnAsync(defaultArrowFn)).toBe(false);
  });

});
