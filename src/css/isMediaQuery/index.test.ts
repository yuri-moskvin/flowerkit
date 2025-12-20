import { isMediaQuery } from "./index.ts";

describe(isMediaQuery.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isMediaQuery(0 as any)).toThrow();
    expect(() => isMediaQuery(null as any)).toThrow();
  });

});
