import assert from "node:assert";
import { describe, test } from "node:test";
import { onWindowLoad } from "./index.ts";

describe(onWindowLoad.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid callback argument
      onWindowLoad(1)
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid callback argument
      onWindowLoad(null)
    );
  });

  test("Checks for correct load callback", () => {
    let isLoad = false;
    const getLoad = () => isLoad = true;
    onWindowLoad(getLoad);
    assert.strictEqual(isLoad, true);
  });

});
