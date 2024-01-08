
import { isObjHasOwnProp } from "./index.js";

describe(isObjHasOwnProp.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isObjHasOwnProp(null, "")).toThrow();
    expect(() => isObjHasOwnProp({}, 123)).toThrow();
    expect(() => isObjHasOwnProp([])).toThrow();
  });

  test("Checks for plain object", () => {
    const obj = {
      foo: "bar"
    };
    expect(isObjHasOwnProp(obj, "foo")).toBe(true);
  });

});
