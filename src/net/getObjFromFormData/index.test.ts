import assert from "node:assert";
import { describe, test } from "node:test";
import { getObjFromFormData } from "./index.ts";
import { getObjFromFormData as getObjFromObjKit } from "../../obj/getObjFromFormData/index.ts";

describe(getObjFromFormData.name, () => {

  test("Matches obj kit behavior", () => {
    const fd = new FormData();
    fd.append("name", "flowerkit");
    fd.append("tag", "typescript");
    fd.append("tag", "ssr");

    assert.deepStrictEqual(getObjFromFormData(fd), getObjFromObjKit(fd));
  });

  test("Checks for invalid args", () => {
    assert.throws(() =>
      // @ts-expect-error testing invalid fd argument
      getObjFromFormData("flowerkit")
    );
  });

});
