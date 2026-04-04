import assert from "node:assert";
import { describe, test } from "node:test";
import { onDOMReady } from "./index.ts";

describe(onDOMReady.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid callback argument
      onDOMReady(1)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid callback argument
      onDOMReady(null)
    );
  });

  test("Checks for correct DOMContentLoaded callback", () => {
    let isReady = false;
    const getReady = () => isReady = true;
    onDOMReady(getReady);
    assert.strictEqual(isReady, true);
  });

});
