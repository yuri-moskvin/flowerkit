import { isJSON } from "./index.js";

describe(isJSON.name, () => {

  test("Checks for invalid args", () => {
    expect(isJSON(1)).toBe(false);
    expect(isJSON(null)).toBe(false);
  });

  test("Checks for strings", () => {
    const str = '{ "hello": "world" }';
    const brokenStr = "{ hello }";
    expect(isJSON(str)).toBe(true);
    expect(isJSON(brokenStr)).toBe(false);
  });
});
