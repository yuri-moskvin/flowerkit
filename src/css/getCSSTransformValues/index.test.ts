import { getCSSTransformValues } from "./index.ts";

describe(getCSSTransformValues.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getCSSTransformValues("test" as any)).toThrow();
    expect(() => getCSSTransformValues(null as any)).toThrow();
  });

});
