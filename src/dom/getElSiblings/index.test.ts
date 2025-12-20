import getElSiblings from "./index.ts";

describe(getElSiblings.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getElSiblings("moo" as any)).toThrow();
    expect(() => getElSiblings(null as any)).toThrow();
  });

  test("Checks for el siblings length", () => {
    document.body.innerHTML = `
     <ul>
       Text 0
       <li id="item1">One</li>
       Text 1
       <li id="item2">Two</li>
       Text 2
       <li id="item3">Three</li>
       Text 3
     <ul>
  `;

    expect(getElSiblings(document.getElementById("item2") as HTMLElement).length).toBe(3);
    expect(getElSiblings(document.querySelector("ul") as any)).toBeInstanceOf(Array);
  });

});
