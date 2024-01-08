import { getCSSTransformValues } from "./index.js";

describe(getCSSTransformValues.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getCSSTransformValues("test")).toThrow();
    expect(() => getCSSTransformValues(null)).toThrow();
  });

});
