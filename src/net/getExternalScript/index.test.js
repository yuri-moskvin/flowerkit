import { getExternalScript } from "./index.js";

describe(getExternalScript.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getExternalScript({
      src: false
    })).toThrow();
    expect(() => getExternalScript({
      crossorigin: 1
    })).toThrow();
    expect(() => getExternalScript({
      appendTo: null
    })).toThrow();
  });

  test("Checks for script appending", () => {
    getExternalScript({
      src: "https://ajax.googleapis.com/ajax/libs/d3js/7.8.5/d3.min.js",
      id: "d3"
    });
    expect(document.getElementById("d3").tagName).toBe("SCRIPT");
  });

});
