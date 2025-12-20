import { isFnAsync } from "./index.ts";

describe(isFnAsync.name, () => {

  test("Checks for other types", () => {
    expect(isFnAsync(null as any)).toBe(false);
    expect(isFnAsync(1 as any)).toBe(false);
  });

  test("Checks for async fn", () => {
    const asyncFn = async function() {};
    const asyncArrowFn = async () => {};
    const bindAsyncFn = asyncFn.bind({});
    expect(isFnAsync(asyncFn as any)).toBe(true);
    expect(isFnAsync(asyncArrowFn as any)).toBe(true);
    expect(isFnAsync(bindAsyncFn as any)).toBe(true);
  });

  test("Checks for default fn", () => {
    const defaultFn = function() {};
    const defaultArrowFn = () => {};
    expect(isFnAsync(defaultFn as any)).toBe(false);
    expect(isFnAsync(defaultArrowFn as any)).toBe(false);
  });

});
