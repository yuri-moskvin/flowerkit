import assert from "node:assert";
import { describe, test } from "node:test";
import { getStrDeclination } from "./index.ts";

describe(getStrDeclination.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      getStrDeclination(
        // @ts-expect-error testing invalid number argument
        "123",
        []
      )
    );
    assert.throws(() =>
      getStrDeclination(
        123,
        // @ts-expect-error testing invalid words argument
        ""
      )
    );
    assert.throws(() =>
      getStrDeclination(
        123,
        // @ts-expect-error testing invalid words argument
        [ "яблоко", "яблока" ]
      )
    );
  });

  test("Checks for positive number", () => {
    const words = [ "яблоко", "яблока", "яблок" ] as const;
    assert.strictEqual(getStrDeclination(0, words), words.at(2));
    assert.strictEqual(getStrDeclination(1, words), words.at(0));
    assert.strictEqual(getStrDeclination(2, words), words.at(1));
  });

  test("Checks for negative number", () => {
    const words = [ "груша", "груши", "груш" ] as const;
    assert.strictEqual(getStrDeclination(-2, words), words.at(1));
    assert.strictEqual(getStrDeclination(-1, words), words.at(0));
    assert.strictEqual(getStrDeclination(-10, words), words.at(2));
  });
});
