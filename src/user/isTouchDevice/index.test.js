import { isTouchDevice } from "./index.js";

describe(isTouchDevice.name, () => {

  test("Checks if function return boolean", () => {
    expect(typeof isTouchDevice()).toBe("boolean");
  });

});
