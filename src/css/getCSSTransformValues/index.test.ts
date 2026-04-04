import assert from "node:assert";
import { describe, test } from "node:test";
import { getCSSTransformValues } from "./index.ts";

describe(getCSSTransformValues.name, () => {
  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid el argument
      getCSSTransformValues("test")
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid el argument
      getCSSTransformValues(null)
    );
  });
});
