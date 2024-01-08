import { getHTMLFromStr } from "./index.js";

describe(getHTMLFromStr.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getHTMLFromStr(false)).toThrow();
    expect(() => getHTMLFromStr("")).toThrow();
    expect(() => getHTMLFromStr(null)).toThrow();
    expect(() => getHTMLFromStr("<p>Hello world!</p>", "bad/type")).toThrow();
  });

  test("Checks for correct HTML parsing", () => {
    expect(getHTMLFromStr(`<p>Hello world!</p><p>Hello world!</p>`).length).toBe(2);
  });
});
