import { isTouchDevice } from "./index.ts";

describe(isTouchDevice.name, () => {

  test("Checks if function return boolean", () => {
    expect(typeof isTouchDevice()).toBe("boolean");
  });

});
