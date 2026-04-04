import assert from "node:assert";
import { describe, test } from "node:test";
import { isAdblock } from "./index.ts";

describe(isAdblock.name, () => {

  test("Checks if function returns Boolean", () => {

    const isAb = isAdblock();

    assert.ok(!!document.body.querySelector(".ad_box"));

    assert.strictEqual(typeof isAb, "boolean");
  });

});
