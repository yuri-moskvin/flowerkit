import { getLastFromIterable } from "./index.js";

describe(getLastFromIterable.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getLastFromIterable(null)).toThrow();
    expect(() => getLastFromIterable({})).toThrow();
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
    expect(getLastFromIterable(document.querySelectorAll("li")).textContent).toBe("Three");
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
    const emptyArr = [];
    expect(getLastFromIterable(emptyArr)).toBe(null);
  });

});
