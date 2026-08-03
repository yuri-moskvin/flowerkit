import assert from "node:assert";
import { describe, test } from "node:test";
import { getObjWithPickedProps } from "./index.ts";

describe(getObjWithPickedProps.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid object argument
    assert.throws(() => getObjWithPickedProps(null, []), TypeError);
    // @ts-expect-error testing invalid keys argument
    assert.throws(() => getObjWithPickedProps({}, null), TypeError);
  });

  test("Picks only own requested properties", () => {
    const source = Object.assign(Object.create({ inherited: true }), { id: 1, name: "Ada" });
    assert.deepStrictEqual(getObjWithPickedProps(source, [ "id", "inherited" ]), { id: 1 });
  });
});
