import assert from "node:assert";
import { describe, test } from "node:test";
import { getStorage } from "./index.ts";

describe(getStorage.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid storage type
    assert.throws(() => getStorage("memory"), TypeError);
  });

  test("Gets available browser storages", () => {
    assert.strictEqual(getStorage("local"), window.localStorage);
    assert.strictEqual(getStorage("session"), window.sessionStorage);
  });
});
