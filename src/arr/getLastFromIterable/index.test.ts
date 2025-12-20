import { getLastFromIterable } from "./index.ts";

describe(getLastFromIterable.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getLastFromIterable(null as any)).toThrow();
    expect(() => getLastFromIterable({} as any)).toThrow();
  });

  test("Checks for NodeList", () => {
    document.body.innerHTML = `
     <ul>
       <li id="item1">One</li>
       text 1
       <li id="item2">Two</li>
       text 2
       <li id="item3">Three</li>
       text 3
     <ul>
  `;

    const elements = document.querySelectorAll("li");

    expect(getLastFromIterable(elements)!.textContent).toBe("Three");
  });

  test("Checks for ClassList", () => {
    document.body.classList.add("class1", "class2", "class3");
    expect(getLastFromIterable(document.body.classList)).toBe("class3");
  });

  test("Checks for Arrays", () => {
    const arr = [ 1, 2, 3, null, 5 ];
    expect(getLastFromIterable(arr)).toBe(5);
  });

  test("Checks for empty Arrays", () => {
    const emptyArr: any[] = [];
    expect(getLastFromIterable(emptyArr as any)).toBe(null);
  });

});
