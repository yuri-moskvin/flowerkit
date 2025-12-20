import { getMapFromObj } from "./index.ts";

describe(getMapFromObj.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getMapFromObj("moo" as any)).toThrow();
    expect(() => getMapFromObj({}, null as any)).toThrow();
  });

  test("Check for empty plain object", () => {
    expect(getMapFromObj({})).toBeInstanceOf(Map);
  });

  test("Check for non-empty plain object", () => {
    expect(getMapFromObj({ "1": 1, "3": 2 }, (key: string) => key === "3").get("3")).toBe(2);
  });

});
