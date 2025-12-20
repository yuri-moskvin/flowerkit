import { getElWrapper } from "./index.ts";

describe(getElWrapper.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getElWrapper("moo" as any, "")).toThrow();
    expect(() => getElWrapper(null as any, "")).toThrow();
    expect(() => getElWrapper(document.body, 1 as any)).toThrow();
  });

  test("Checks for el wrapper creation", () => {
    document.body.innerHTML = `<div id="test"></div>`;
    const block = document.getElementById("test") as HTMLElement;
    expect(() => getElWrapper(block, "")).toThrow();
    expect(getElWrapper(block, "<div></div>").outerHTML).toBe(`<div><div id="test"></div></div>`);
  });

});
