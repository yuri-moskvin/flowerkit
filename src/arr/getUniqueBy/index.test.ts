import assert from "node:assert";
import { describe, test } from "node:test";
import { getUniqueBy } from "./index.ts";

describe(getUniqueBy.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid array argument
    assert.throws(() => getUniqueBy(null, (item) => item), TypeError);
    // @ts-expect-error testing invalid selector argument
    assert.throws(() => getUniqueBy([], null), TypeError);
  });

  test("Keeps the first item for each key", () => {
    const result = getUniqueBy(
      [ { id: 1, name: "first" }, { id: 1, name: "second" }, { id: 2, name: "third" } ],
      (item) => item.id
    );
    assert.deepStrictEqual(result.map(({ name }) => name), [ "first", "third" ]);
  });
});
