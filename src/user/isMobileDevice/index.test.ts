import { isMobileDevice } from "./index.ts";

describe(isMobileDevice.name, () => {

  test("Checks if function returns Boolean", () => {
    expect(typeof isMobileDevice()).toBe("boolean");
  });

});
