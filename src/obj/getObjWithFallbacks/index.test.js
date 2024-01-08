
import { getObjWithFallbacks } from "./index.js";

describe(getObjWithFallbacks.name, () => {

  const types = [ "object", "array", "string", "number", "boolean" ];

  const rules = Object.fromEntries(types.map((type) => [ type, { type, output: type } ]));

  const data = Object.fromEntries(types.map((type) => [ type, undefined ]));

  test("Checks for invalid args", () => {
    expect(() => getObjWithFallbacks(123, {})).toThrow();
    expect(() => getObjWithFallbacks({}, null)).toThrow();
    expect(() => getObjWithFallbacks({}, { prop: "123" })).toThrow();
    expect(() => getObjWithFallbacks({}, { prop: { type: 1 } })).toThrow();
  });

  test("Checks for default fallbacks", () => {
    expect(getObjWithFallbacks(data, rules)).toStrictEqual({
      object: {},
      array: [],
      string: "",
      number: 0,
      boolean: false
    });
  });

  test("Checks for custom types", () => {
    expect(getObjWithFallbacks({
      nullishProp: null,
      wrongNumberProp: "1,11",
      tryToNumber: "1.11"
    }, {
      nullishProp: {
        type: "string"
      },
      wrongNumberProp: {
        type: "number"
      },
      tryToNumber: {
        type: "number"
      }
    })).toStrictEqual({
      nullishProp: "",
      wrongNumberProp: 0,
      tryToNumber: 1.11
    });
  });

  test("Checks without rules prop", () => {
    expect(getObjWithFallbacks({
      prop1: 1,
      prop2: 2,
    })).toStrictEqual({
      prop1: 1,
      prop2: 2,
    });
  });

  test("Checks for custom fallbacks", () => {
    expect(getObjWithFallbacks({
      string: null,
      number: [],
    }, {
      string: {
        type: "string",
        fallback: "custom string"
      },
      number: {
        type: "number",
        fallback: -1
      }
    })).toStrictEqual({
      string: "custom string",
      number: -1,
    });
  });

});
