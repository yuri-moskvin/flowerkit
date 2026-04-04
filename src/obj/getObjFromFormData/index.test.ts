import assert from "node:assert";
import { describe, test } from "node:test";
import { getObjFromFormData } from "./index.ts";

describe(getObjFromFormData.name, () => {

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid fd argument
      getObjFromFormData("moo")
    );
    assert.throws(() =>
      // @ts-expect-error testing invalid fd argument
      getObjFromFormData(null)
    );
  });

  test("Checks for valid FormData instance", () => {
    const fd = new FormData();
    fd.append("moo", "foo");
    fd.append("arr[]", "boo 1");
    fd.append("arr[]", "boo 2");

    assert.deepStrictEqual(getObjFromFormData(fd), {
      moo: "foo",
      "arr[]": [ "boo 1", "boo 2" ],
    });
  });

});
