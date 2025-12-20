import { removeChildNodes } from "./index.ts";

describe(removeChildNodes.name, () => {

  test("Checks for invalid args", () => {
    expect(() => removeChildNodes("str" as any)).toThrow();
    expect(() => removeChildNodes(null as any)).toThrow();
  });

  test("Checks for correct removing of child nodes", () => {
    document.body.innerHTML = `<div id="myBlock"><div>Block with child nodes</div></div>`;
    const myDiv = document.getElementById("myBlock") as HTMLElement;
    expect(Array.from(myDiv.children).length).toBe(1);
    removeChildNodes(myDiv);
    expect(Array.from(myDiv.children).length).toBe(0);
  });

});
