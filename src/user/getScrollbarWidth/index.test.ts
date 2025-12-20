import { getScrollbarWidth } from "./index.ts";

describe(getScrollbarWidth.name, () => {

  test("Checks if function returns Number", () => {
    expect(typeof getScrollbarWidth()).toBe("number");
  });

});
