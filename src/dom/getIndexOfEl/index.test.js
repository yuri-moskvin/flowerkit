import { getIndexOfEl } from "./index.js";

describe(getIndexOfEl.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getIndexOfEl("moo")).toThrow();
    expect(() => getIndexOfEl(null)).toThrow();
  });

  test("Checks for correct el index", () => {
    document.body.innerHTML = `
     <ul>
       Test 0 
       <li id="item1">One</li>
       Text 1
       <li id="item2">Two</li>
       Text 2
       <li id="item3">Three</li>
       Text 3
     <ul>
  `;
    expect(getIndexOfEl(document.querySelector("#item3"))).toBe(2);
  });

});
