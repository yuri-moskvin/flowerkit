import { getExternalScript } from "./index.ts";

describe(getExternalScript.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getExternalScript({
      src: false as any,
    } as any)).rejects.toThrow();
    expect(() => getExternalScript({
      crossorigin: 1 as any,
    } as any)).rejects.toThrow();
    expect(() => getExternalScript({
      appendTo: null as any,
    } as any)).rejects.toThrow();
  });

  test("Checks for script appending", () => {
    getExternalScript({
      src: "https://ajax.googleapis.com/ajax/libs/d3js/7.8.5/d3.min.js",
      id: "d3",
    });
    expect((document.getElementById("d3") as HTMLElement).tagName).toBe("SCRIPT");
  });

});
