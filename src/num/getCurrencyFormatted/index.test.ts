import assert from "node:assert";
import { describe, test } from "node:test";
import { getCurrencyFormatted } from "./index.ts";

describe(getCurrencyFormatted.name, () => {
  test("Checks validation", () => {
    assert.throws(() => getCurrencyFormatted(Number.NaN, "USD"), TypeError);
    assert.throws(() => getCurrencyFormatted(1, ""), TypeError);
  });

  test("Formats a currency using Intl", () => {
    assert.strictEqual(getCurrencyFormatted(12.5, "USD", "en-US"), "$12.50");
    assert.strictEqual(
      getCurrencyFormatted(12.5, "USD", "en-US", { currencyDisplay: "code" }),
      "USD 12.50"
    );
  });
});
