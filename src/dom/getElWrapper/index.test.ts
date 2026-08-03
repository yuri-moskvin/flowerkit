import assert from "node:assert";
import { describe, test } from "node:test";
import { getElWrapper } from "./index.ts";

describe(getElWrapper.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      getElWrapper(
        // @ts-expect-error testing invalid el argument
        "moo", ""
      )
    );
    assert.throws(() =>
      getElWrapper(
        // @ts-expect-error testing invalid el argument
        null, ""
      )
    );
    assert.throws(() =>
      getElWrapper(
        document.body,
        // @ts-expect-error testing invalid wrapper argument
        1
      )
    );
  });

  test("Checks for el wrapper creation", () => {
    document.body.innerHTML = `<div id="test"></div>`;
    const block = document.getElementById("test") as HTMLElement;
    assert.throws(() => getElWrapper(block, ""));
    assert.strictEqual(getElWrapper(block, "<div></div>").outerHTML, `<div><div id="test"></div></div>`);
  });

  test("Supports whitespace and returns the root wrapper", () => {
    document.body.innerHTML = `<div id="test"></div>`;
    const block = document.getElementById("test") as HTMLElement;
    const wrapper = getElWrapper(block, `
      <div class="wrapper">
        <div class="wrapper__inner"></div>
      </div>
    `);

    assert.strictEqual(wrapper.className, "wrapper");
    assert.strictEqual(wrapper.querySelector(".wrapper__inner")?.firstElementChild, block);
    assert.strictEqual(document.body.firstElementChild, wrapper);
  });

});
