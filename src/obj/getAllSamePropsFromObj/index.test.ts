import assert from "node:assert";
import { describe, test } from "node:test";
import { getAllSamePropsFromObj } from "./index.ts";

describe(getAllSamePropsFromObj.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      getAllSamePropsFromObj(
        "moo" as unknown as Record<string, unknown>,
        "test"
      )
    );
    assert.throws(() =>
      getAllSamePropsFromObj(
        {},
        1 as unknown as string
      )
    );
  });

  test("Checks for nested objects", () => {
    assert.deepStrictEqual(getAllSamePropsFromObj({
      someProp1: {
        a: "value 1",
        b: 2,
        c: 3,
        d: {
          a: 1,
          b: 2,
        },
      },
      someProp12: {
        a: "value 3",
        b: 2,
        c: {
          a: "value 4",
        },
      },
    }, "a"), [ "value 1", 1, "value 3", "value 4" ]);
  });

});
