import { getDocument } from "ssr-window";
import { bubble } from "./index.ts";

describe(bubble.name, () => {

  test("Checks for invalid args", () => {
    expect(() => bubble("moo" as any, "test")).toThrow();
    expect(() => bubble(document as any, true as any)).toThrow();
    expect(() => bubble(document as any, "test", null as any, "123" as any)).toThrow();
  });

  test("Checks for event dispatch and bubbling", () => {
    let detail: any;
    document.body.innerHTML = `<div></div>`;
    document.addEventListener("myEvent", (e: any) => {
      detail = e.detail;
    });
    bubble(document.querySelector("div") as HTMLElement, "myEvent", "test");
    expect(detail).toBe("test");

    bubble(getDocument(), bubble.name, {});
  });

});
