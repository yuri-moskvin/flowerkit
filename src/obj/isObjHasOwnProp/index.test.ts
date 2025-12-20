
import { isObjHasOwnProp } from "./index.ts";

describe(isObjHasOwnProp.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isObjHasOwnProp(null as any, "")).toThrow();
    expect(() => isObjHasOwnProp({}, [] as any)).toThrow();
  });

  test("Checks for plain object", () => {
    const obj = {
      foo: "bar",
    };
    expect(isObjHasOwnProp(obj, "foo")).toBe(true);
  });

});
