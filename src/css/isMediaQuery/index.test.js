import { isMediaQuery } from "./index.js";

describe(isMediaQuery.name, () => {

  test("Checks for invalid args", () => {
    expect(() => isMediaQuery(0)).toThrow();
    expect(() => isMediaQuery(null)).toThrow();
  });

});
