import assert from "node:assert";
import { describe, test } from "node:test";
import { isMediaQuery } from "./index.ts";

describe(isMediaQuery.name, () => {
  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid query argument
      isMediaQuery(0)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid query argument
      isMediaQuery(null)
    );
  });
});
