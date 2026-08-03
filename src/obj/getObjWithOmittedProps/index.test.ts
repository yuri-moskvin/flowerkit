import assert from "node:assert";
import { describe, test } from "node:test";
import { getObjWithOmittedProps } from "./index.ts";

describe(getObjWithOmittedProps.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid object argument
    assert.throws(() => getObjWithOmittedProps(null, []), TypeError);
    // @ts-expect-error testing invalid keys argument
    assert.throws(() => getObjWithOmittedProps({}, null), TypeError);
  });

  test("Omits selected properties without mutation", () => {
    const source = { id: 1, password: "secret", name: "Ada" };
    assert.deepStrictEqual(getObjWithOmittedProps(source, [ "password" ]), { id: 1, name: "Ada" });
    assert.strictEqual(source.password, "secret");
  });
});
