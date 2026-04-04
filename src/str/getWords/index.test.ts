import assert from "node:assert";
import { describe, test } from "node:test";
import { getWords } from "./index.ts";

describe(getWords.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getWords(null)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getWords(1)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid str argument
      getWords([])
    );
  });

  test("Checks for strings", () => {
    assert.deepStrictEqual(getWords("helloWorld! what's_up?"), [ "hello", "World", "what", "s", "up" ]);
    assert.deepStrictEqual(getWords("24324word1#4234word2"), [ "word", "word" ]);
    assert.deepStrictEqual(getWords(""), []);
  });

});
