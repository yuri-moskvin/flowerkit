import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrWithThousandSeparator } from "./index.ts";

describe(getStrWithThousandSeparator.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid num argument
      getStrWithThousandSeparator("moo")
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid num argument
      getStrWithThousandSeparator(null)
    );
  });

  test("Checks for large numbers", () => {
    assert.strictEqual(getStrWithThousandSeparator(1_000_000), "1 000 000");
    assert.strictEqual(getStrWithThousandSeparator(1_000_000_000), "1 000 000 000");
  });

  test("Checks for custom separator", () => {
    assert.strictEqual(getStrWithThousandSeparator(1000, ","), "1,000");
  });

  test("Preserves decimal and exponent parts", () => {
    assert.strictEqual(getStrWithThousandSeparator(1234.5678), "1 234.5678");
    assert.strictEqual(getStrWithThousandSeparator(-1234.5, ","), "-1,234.5");
    assert.strictEqual(getStrWithThousandSeparator(1.234e+21), "1.234e+21");
  });

});
