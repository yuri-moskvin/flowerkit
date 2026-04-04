import assert from "node:assert";
import { describe, test } from "node:test";
import { getMapFromObj } from "./index.ts";

describe(getMapFromObj.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid obj argument
      getMapFromObj("moo")
    );
    assert.throws(() =>
      getMapFromObj(
        {},
        // @ts-expect-error testing invalid callback argument
        null
      )
    );
  });

  test("Check for empty plain object", () => {
    assert.ok(getMapFromObj({}) instanceof Map);
  });

  test("Check for non-empty plain object", () => {
    assert.strictEqual(getMapFromObj({ "1": 1, "3": 2 }, (key: string) => key === "3").get("3"), 2);
  });

});
