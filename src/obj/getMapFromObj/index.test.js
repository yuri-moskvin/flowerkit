import { getMapFromObj } from "./index.js";

describe(getMapFromObj.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getMapFromObj("moo")).toThrow();
    expect(() => getMapFromObj({}, null)).toThrow();
  });

  test("Check for empty plain object", () => {
    expect(getMapFromObj({})).toBeInstanceOf(Map);
  });

  test("Check for non-empty plain object", () => {
    expect(getMapFromObj({ "1": 1, "3": 2 }, (key) => key === "3").get("3")).toBe(2);
  });

});
