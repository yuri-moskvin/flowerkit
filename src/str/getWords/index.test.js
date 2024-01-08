import { getWords } from "./index.js";

describe(getWords.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getWords(null)).toThrow();
    expect(() => getWords(1)).toThrow();
    expect(() => getWords([])).toThrow();
  });

  test("Checks for strings", () => {
    expect(getWords("helloWorld! what's_up?")).toStrictEqual([ "hello", "World", "what", "s", "up" ]);
    expect(getWords("24324word1#4234word2")).toStrictEqual([ "word", "word" ]);
    expect(getWords("")).toStrictEqual([]);
  });

});
