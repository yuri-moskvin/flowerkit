import assert from "node:assert";
import { describe, test } from "node:test";
import { getNumberFormatted } from "./index.ts";

describe(getNumberFormatted.name, () => {
  test("Checks validation", () => {
    assert.throws(() => getNumberFormatted(Number.NaN), TypeError);
    // @ts-expect-error testing invalid options argument
    assert.throws(() => getNumberFormatted(1, "en-US", null), TypeError);
  });

  test("Uses Intl formatting options", () => {
    assert.strictEqual(
      getNumberFormatted(1234.5, "en-US", { minimumFractionDigits: 2 }),
      "1,234.50"
    );
  });
});
