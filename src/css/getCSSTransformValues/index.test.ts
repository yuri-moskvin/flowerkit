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

  test("Returns numeric matrix translation values", () => {
    const element = document.createElement("div");
    element.style.transform = "matrix(1,0,0,1,10,20)";
    document.body.append(element);

    assert.deepStrictEqual(getCSSTransformValues(element), {
      x: 10,
      y: 20,
      z: 0,
    });
    element.remove();
  });
});
