import assert from "node:assert";
import { describe, test } from "node:test";
import { getGroupedBy } from "./index.ts";

describe(getGroupedBy.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid array argument
    assert.throws(() => getGroupedBy(null, () => "x"), TypeError);
    // @ts-expect-error testing invalid selector argument
    assert.throws(() => getGroupedBy([], null), TypeError);
  });

  test("Groups items and handles unsafe-looking keys", () => {
    const result = getGroupedBy(
      [ { type: "fruit", name: "apple" }, { type: "fruit", name: "pear" }, { type: "__proto__", name: "safe" } ],
      (item) => item.type
    );
    assert.deepStrictEqual(result.fruit?.map(({ name }) => name), [ "apple", "pear" ]);
    assert.strictEqual(result.__proto__?.[0]?.name, "safe");
  });
});
