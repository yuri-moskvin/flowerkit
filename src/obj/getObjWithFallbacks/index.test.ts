import assert from "node:assert";
import { describe, test } from "node:test";
import { getObjWithFallbacks } from "./index.ts";

describe(getObjWithFallbacks.name, () => {

  const types = [ "object", "array", "string", "number", "boolean" ] as const;

  const rules = Object.fromEntries(types.map((type) => [ type, { type, output: type } ]));

  const data = Object.fromEntries(types.map((type) => [ type, undefined ]));

  test("Checks for invalid args", () => {
    assert.throws(() =>
      getObjWithFallbacks(
        123 as unknown as Parameters<typeof getObjWithFallbacks>[0],
        {} as unknown as Parameters<typeof getObjWithFallbacks>[1]
      )
    );
    assert.throws(() =>
      getObjWithFallbacks(
        {},
        null as unknown as Parameters<typeof getObjWithFallbacks>[1]
      )
    );
    assert.throws(() =>
      getObjWithFallbacks(
        {},
        { prop: "123" } as unknown as Parameters<typeof getObjWithFallbacks>[1]
      )
    );
    assert.throws(() =>
      getObjWithFallbacks(
        {},
        { prop: { type: 1 } } as unknown as Parameters<typeof getObjWithFallbacks>[1]
      )
    );
  });

  test("Checks for default fallbacks", () => {
    assert.deepStrictEqual(getObjWithFallbacks(data as any, rules as any), {
      object: {},
      array: [],
      string: "",
      number: 0,
      boolean: false,
    });
  });

  test("Checks for custom types", () => {
    assert.deepStrictEqual(getObjWithFallbacks({
      nullishProp: null,
      wrongNumberProp: "1,11",
      tryToNumber: "1.11",
    }, {
      nullishProp: {
        type: "string",
      },
      wrongNumberProp: {
        type: "number",
      },
      tryToNumber: {
        type: "number",
      },
    }), {
      nullishProp: "",
      wrongNumberProp: 0,
      tryToNumber: 1.11,
    });
  });

  test("Checks without rules prop", () => {
    assert.deepStrictEqual(getObjWithFallbacks({
      prop1: 1,
      prop2: 2,
    }), {
      prop1: 1,
      prop2: 2,
    });
  });

  test("Checks for custom fallbacks", () => {
    assert.deepStrictEqual(getObjWithFallbacks({
      string: null,
      number: [],
    } as any, {
      string: {
        type: "string",
        fallback: "custom string",
      },
      number: {
        type: "number",
        fallback: -1,
      },
    }), {
      string: "custom string",
      number: -1,
    });
  });

});
