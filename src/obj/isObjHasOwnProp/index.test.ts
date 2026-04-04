import assert from "node:assert";
import { describe, test } from "node:test";
import { isObjHasOwnProp } from "./index.ts";

describe(isObjHasOwnProp.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      isObjHasOwnProp(
        null, ""
      )
    );
    assert.throws(() =>
      isObjHasOwnProp(
        {},
        // @ts-expect-error testing invalid prop argument
        []
      )
    );
  });

  test("Checks for plain object", () => {
    const obj = {
      foo: "bar",
    };
    assert.strictEqual(isObjHasOwnProp(obj, "foo"), true);
  });

});
