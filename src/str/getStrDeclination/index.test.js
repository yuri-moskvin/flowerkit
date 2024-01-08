import { getStrDeclination } from "./index.js";

describe(getStrDeclination.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getStrDeclination("123", [])).toThrow();
    expect(() => getStrDeclination(123, "")).toThrow();
    expect(() => getStrDeclination(123, [ "яблоко", "яблока" ])).toThrow();
  });

  test("Checks for positive number", () => {
    const words = [ "яблоко", "яблока", "яблок" ];
    expect(getStrDeclination(0, words)).toBe(words.at(2));
    expect(getStrDeclination(1, words)).toBe(words.at(0));
    expect(getStrDeclination(2, words)).toBe(words.at(1));
  });

  test("Checks for negative number", () => {
    const words = [ "груша", "груши", "груш" ];
    expect(getStrDeclination(-2, words)).toBe(words.at(1));
    expect(getStrDeclination(-1, words)).toBe(words.at(0));
    expect(getStrDeclination(-10, words)).toBe(words.at(2));
  });
});
