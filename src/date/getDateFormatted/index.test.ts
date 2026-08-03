import assert from "node:assert";
import { describe, test } from "node:test";
import { getDateFormatted } from "./index.ts";

describe(getDateFormatted.name, () => {
  test("Checks validation", () => {
    assert.throws(() => getDateFormatted("invalid"), TypeError);
    // @ts-expect-error testing invalid options argument
    assert.throws(() => getDateFormatted(0, "en-US", null), TypeError);
  });

  test("Formats with explicit locale and time zone", () => {
    assert.strictEqual(
      getDateFormatted("2024-01-02T00:00:00Z", "en-US", {
        day: "2-digit",
        month: "2-digit",
        timeZone: "UTC",
        year: "numeric",
      }),
      "01/02/2024"
    );
  });
});
