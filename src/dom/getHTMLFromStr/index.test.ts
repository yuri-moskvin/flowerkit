import { getHTMLFromStr } from "./index.ts";

describe(getHTMLFromStr.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getHTMLFromStr(false as any)).toThrow();
    expect(() => getHTMLFromStr("")).toThrow();
    expect(() => getHTMLFromStr(null as any)).toThrow();
    expect(() => getHTMLFromStr("<p>Hello world!</p>", "bad/type" as any)).toThrow();
  });

  test("Checks for correct HTML parsing", () => {
    expect(getHTMLFromStr(`<p>Hello world!</p><p>Hello world!</p>`).length).toBe(2);
  });
});
