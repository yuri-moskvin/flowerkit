import { getStrDeclination } from "./index.ts";

describe(getStrDeclination.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getStrDeclination("123" as any, [] as any)).toThrow();
    expect(() => getStrDeclination(123, "" as any)).toThrow();
    expect(() => getStrDeclination(123, [ "яблоко", "яблока" ] as any)).toThrow();
  });

  test("Checks for positive number", () => {
    const words = [ "яблоко", "яблока", "яблок" ] as const;
    expect(getStrDeclination(0, words)).toBe(words.at(2));
    expect(getStrDeclination(1, words)).toBe(words.at(0));
    expect(getStrDeclination(2, words)).toBe(words.at(1));
  });

  test("Checks for negative number", () => {
    const words = [ "груша", "груши", "груш" ] as const;
    expect(getStrDeclination(-2, words)).toBe(words.at(1));
    expect(getStrDeclination(-1, words)).toBe(words.at(0));
    expect(getStrDeclination(-10, words)).toBe(words.at(2));
  });
});
