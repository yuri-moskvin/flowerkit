import { isAdblock } from "./index.ts";

describe(isAdblock.name, () => {

  test("Checks if function returns Boolean", () => {

    const isAb = isAdblock();

    expect(!!document.body.querySelector(".ad_box")).toBeTruthy();

    expect(typeof isAb).toBe("boolean");
  });

});
