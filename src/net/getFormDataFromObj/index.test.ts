import { getFormDataFromObj } from "./index.ts";

describe(getFormDataFromObj.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getFormDataFromObj("moo" as any)).toThrow();
    expect(() => getFormDataFromObj({}, function() {} as any)).toThrow();
    expect(() => getFormDataFromObj({}, new FormData(), true as any)).toThrow();
  });

  test("Checks for correct FormData transform", () => {
    const fd1 = getFormDataFromObj({
      test: 123,
      boo: "foo",
    });
    const fd2 = getFormDataFromObj({
      test: 123,
      boo: "foo",
    }, new FormData(), (name, value, fd) => {
      if (name !== "test") {
        fd.set(name, value as string);
      }
    });
    expect(fd1).toBeInstanceOf(FormData);
    expect(fd1.get("test")).toBe("123");
    expect(fd1.get("boo")).toBe("foo");
    expect(fd2.get("boo")).toBe("foo");
    expect(fd2.has("test")).toBe(false);
  });

});
