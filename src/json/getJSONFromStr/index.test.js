import { getJSONFromStr } from "./index.js";

describe(getJSONFromStr.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getJSONFromStr(false)).toThrow();
    expect(() => getJSONFromStr('{ "hello": "world" }', 0)).toThrow();
  });

  test("Checks for strings", () => {
    expect(getJSONFromStr("")).toStrictEqual({});
    expect(getJSONFromStr('{ "hello": "world" }')).toStrictEqual({ hello: "world" });
    expect(getJSONFromStr('{ "broken": "str')).toStrictEqual({});
  });

});
