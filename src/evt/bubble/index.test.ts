import { getDocument } from "ssr-window";
import assert from "node:assert";
import { describe, test, before } from "node:test";
import { bubble } from "./index.ts";

describe(bubble.name, () => {

  before(() => {
    // Polyfill globalThis for jsdom environment
    if (typeof window !== "undefined") {
      if (window.CustomEvent !== (globalThis as any).CustomEvent) {
        (globalThis as any).CustomEvent = window.CustomEvent;
      }
      if (typeof (globalThis as any).dispatchEvent === "undefined") {
        (globalThis as any).dispatchEvent = () => true;
      }
    }
  });

  test("Checks for invalid args", () => {
    assert.throws(() =>
      bubble(
        // @ts-expect-error testing invalid el argument
        "moo", "test"
      )
    );
    assert.throws(() =>
      bubble(
        document,
        // @ts-expect-error testing invalid name argument
        true
      )
    );
    assert.throws(() =>
      bubble(
        document,
        "test",
        null,
        // @ts-expect-error testing invalid bubbles argument
        "123"
      )
    );
  });

  test("Checks for event dispatch and bubbling", () => {
    let detail: any;
    document.body.innerHTML = `<div></div>`;
    const div = document.querySelector("div") as HTMLElement;

    // Add event listener to the document to catch bubbled events
    const handler = (e: any) => {
      detail = e.detail;
    };
    document.addEventListener("myEvent", handler, false);

    // Dispatch the event
    bubble(div, "myEvent", "test");

    // Clean up
    document.removeEventListener("myEvent", handler);

    assert.strictEqual(detail, "test");

    bubble(getDocument(), bubble.name, {});
  });

});
