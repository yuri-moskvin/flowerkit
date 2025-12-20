import { isJSON } from "./index.ts";

describe(isJSON.name, () => {

  test("Checks for invalid args", () => {
    expect(isJSON(1 as any)).toBe(false);
    expect(isJSON(null as any)).toBe(false);
  });

  test("Checks for strings", () => {
    const str = '{ "hello": "world" }';
    const brokenStr = "{ hello }";
    expect(isJSON(str)).toBe(true);
    expect(isJSON(brokenStr)).toBe(false);
  });
});
