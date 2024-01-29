import { getDocument } from "ssr-window";
import { bubble } from "./index.js";

describe(bubble.name, () => {

  test("Checks for invalid args", () => {
    expect(() => bubble("moo", "test")).toThrow();
    expect(() => bubble(document, true)).toThrow();
    expect(() => bubble(document, "test", null, "123")).toThrow();
  });

  test("Checks for event dispatch and bubbling", () => {
    let detail;
    document.body.innerHTML = `<div></div>`;
    document.addEventListener("myEvent", (e) => {
      detail = e.detail;
    });
    bubble(document.querySelector("div"), "myEvent", "test");
    expect(detail).toBe("test");

    bubble(getDocument(), bubble.name, {});
  });

});
