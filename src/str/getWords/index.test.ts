import { getWords } from "./index.ts";

describe(getWords.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getWords(null as any)).toThrow();
    expect(() => getWords(1 as any)).toThrow();
    expect(() => getWords([] as any)).toThrow();
  });

  test("Checks for strings", () => {
    expect(getWords("helloWorld! what's_up?")).toStrictEqual([ "hello", "World", "what", "s", "up" ]);
    expect(getWords("24324word1#4234word2")).toStrictEqual([ "word", "word" ]);
    expect(getWords("")).toStrictEqual([]);
  });

});
