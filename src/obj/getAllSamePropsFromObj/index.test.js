
import { getAllSamePropsFromObj } from "./index.js";

describe(getAllSamePropsFromObj.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getAllSamePropsFromObj("moo", "test")).toThrow();
    expect(() => getAllSamePropsFromObj({}, 1)).toThrow();
  });

  test("Checks for nested objects", () => {
    expect(getAllSamePropsFromObj({
      someProp1: {
        a: "value 1",
        b: 2,
        c: 3,
        d: {
          a: 1,
          b: 2
        }
      },
      someProp12: {
        a: "value 3",
        b: 2,
        c: {
          a: "value 4"
        }
      }
    }, "a")).toStrictEqual( [ "value 1", 1, "value 3", "value 4" ]);
  });

});
