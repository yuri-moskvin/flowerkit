import { getJSONFromStr } from "./index.ts";

describe(getJSONFromStr.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getJSONFromStr(false as any)).toThrow();
    expect(() => getJSONFromStr('{ "hello": "world" }', 0 as any)).toThrow();
  });

  test("Checks for strings", () => {
    expect(getJSONFromStr("")).toStrictEqual({});
    expect(getJSONFromStr('{ "hello": "world" }')).toStrictEqual({ hello: "world" });
    expect(getJSONFromStr('{ "broken": "str')).toStrictEqual({});
  });

});
