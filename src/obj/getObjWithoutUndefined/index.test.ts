import assert from "node:assert";
import { describe, test } from "node:test";
import { getObjWithoutUndefined } from "./index.ts";

describe(getObjWithoutUndefined.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid object argument
    assert.throws(() => getObjWithoutUndefined(null), TypeError);
  });

  test("Removes only undefined values", () => {
    assert.deepStrictEqual(
      getObjWithoutUndefined({
        id: 1, empty: undefined, nil: null, enabled: false,
      }),
      { id: 1, nil: null, enabled: false }
    );
  });
});
