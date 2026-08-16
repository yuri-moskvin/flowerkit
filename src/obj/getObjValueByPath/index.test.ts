import assert from "node:assert";
import { describe, test } from "node:test";
import { getObjValueByPath } from "./index.ts";

describe(getObjValueByPath.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid object argument
    assert.throws(() => getObjValueByPath(null, "value"), TypeError);
    assert.throws(() => getObjValueByPath({}, ""), TypeError);
    assert.throws(() => getObjValueByPath({}, "user..name"), TypeError);
    assert.throws(() => getObjValueByPath({}, []), TypeError);
    // @ts-expect-error testing invalid property key
    assert.throws(() => getObjValueByPath({}, [ {} ]), TypeError);
  });

  test("Reads dot paths and array indexes", () => {
    const source = {
      order: {
        items: [ { quantity: 3 } ],
      },
    };

    assert.strictEqual(getObjValueByPath<number>(source, "order.items.0.quantity"), 3);
    assert.strictEqual(getObjValueByPath<number>(source, [ "order", "items", 0, "quantity" ]), 3);
  });

  test("Supports symbols and keys containing dots", () => {
    const secret = Symbol("secret");
    const source = {
      [secret]: "value",
      "product.name": "Rose",
    };

    assert.strictEqual(getObjValueByPath<string>(source, [ secret ]), "value");
    assert.strictEqual(getObjValueByPath<string>(source, [ "product.name" ]), "Rose");
  });

  test("Returns a fallback for missing, inherited, and undefined values", () => {
    const inherited = { privateValue: "hidden" };
    const source = Object.assign(Object.create(inherited) as Record<string, unknown>, {
      nested: { value: undefined },
    });

    assert.strictEqual(getObjValueByPath(source, "privateValue", "fallback"), "fallback");
    assert.strictEqual(getObjValueByPath(source, "nested.missing", "fallback"), "fallback");
    assert.strictEqual(getObjValueByPath(source, "nested.value", "fallback"), "fallback");
  });

  test("Preserves null and false values", () => {
    const source = { disabled: false, optional: null };

    assert.strictEqual(getObjValueByPath<boolean>(source, "disabled", true), false);
    assert.strictEqual(getObjValueByPath<null>(source, "optional"), null);
  });
});
