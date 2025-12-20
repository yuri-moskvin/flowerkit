import { isIterable } from "./index.ts";

describe(isIterable.name, () => {

  test("Checks for iterator", () => {
    expect(isIterable(12 as any)).toBe(false);
    expect(isIterable([])).toBe(true);
    expect(isIterable(new Map())).toBe(true);
    expect(isIterable({})).toBe(false);
    expect(isIterable(document.forms)).toBe(true);
  });

});
