import { getObjFromFormData } from "./index.ts";

describe(getObjFromFormData.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getObjFromFormData("moo" as any)).toThrow();
    expect(() => getObjFromFormData(null as any)).toThrow();
  });

  test("Checks for valid FormData instance", () => {
    const fd = new FormData();
    fd.append("moo", "foo");
    fd.append("arr[]", "boo 1");
    fd.append("arr[]", "boo 2");

    expect(getObjFromFormData(fd)).toStrictEqual({
      moo: "foo",
      "arr[]": [ "boo 1", "boo 2" ],
    });
  });

});
