import assert from "node:assert";
import { describe, test } from "node:test";
import { getScrollParent } from "./index.ts";

describe(getScrollParent.name, () => {
  test("Checks validation", () => {
    // @ts-expect-error testing invalid element argument
    assert.throws(() => getScrollParent(null), TypeError);
    const element = document.createElement("div");
    // @ts-expect-error testing invalid axis argument
    assert.throws(() => getScrollParent(element, "z"), TypeError);
  });

  test("Returns the nearest vertical scroll container", () => {
    const outer = document.createElement("div");
    const inner = document.createElement("div");
    const child = document.createElement("button");
    outer.style.overflowY = "auto";
    inner.appendChild(child);
    outer.appendChild(inner);
    document.body.appendChild(outer);

    assert.strictEqual(getScrollParent(child, "y"), outer);

    outer.remove();
  });

  test("Respects the selected axis", () => {
    const container = document.createElement("div");
    const child = document.createElement("div");
    container.style.overflowX = "scroll";
    container.style.overflowY = "visible";
    container.appendChild(child);
    document.body.appendChild(container);

    assert.strictEqual(getScrollParent(child, "x"), container);
    assert.strictEqual(
      getScrollParent(child, "y"),
      document.scrollingElement ?? document.documentElement
    );

    container.remove();
  });

  test("Traverses from a shadow tree to its host", () => {
    const container = document.createElement("div");
    const host = document.createElement("div");
    container.style.overflow = "auto";
    container.appendChild(host);
    document.body.appendChild(container);
    const shadow = host.attachShadow({ mode: "open" });
    const child = document.createElement("span");
    shadow.appendChild(child);

    assert.strictEqual(getScrollParent(child), container);

    container.remove();
  });

  test("Falls back to the document scroll root", () => {
    const child = document.createElement("div");
    document.body.appendChild(child);

    assert.strictEqual(
      getScrollParent(child),
      document.scrollingElement ?? document.documentElement
    );

    child.remove();
  });
});
