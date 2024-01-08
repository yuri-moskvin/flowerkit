import { getScrollbarWidth } from "./index.js";

describe(getScrollbarWidth.name, () => {

  test("Checks if function returns Number", () => {
    expect(typeof getScrollbarWidth()).toBe("number");
  });

});
