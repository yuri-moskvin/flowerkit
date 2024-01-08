import { getElWrapper } from "./index.js";

describe(getElWrapper.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getElWrapper("moo")).toThrow();
    expect(() => getElWrapper(null)).toThrow();
    expect(() => getElWrapper(document.body, 1)).toThrow();
  });

  test("Checks for el wrapper creation", () => {
    document.body.innerHTML = `<div id="test"></div>`;
    const block = document.getElementById("test");
    expect(() => getElWrapper(block, "")).toThrow();
    expect(getElWrapper(block, "<div></div>").outerHTML).toBe(`<div><div id="test"></div></div>`);
  });

});
