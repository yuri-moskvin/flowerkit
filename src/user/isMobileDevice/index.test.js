import { isMobileDevice } from "./index.js";

describe(isMobileDevice.name, () => {

  test("Checks if function returns Boolean", () => {
    expect(typeof isMobileDevice()).toBe("boolean");
  });

});
