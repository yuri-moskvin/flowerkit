import { onWindowLoad } from "./index.js";

describe(onWindowLoad.name, () => {

  test("Checks for invalid args", () => {
    expect(() => onWindowLoad(1)).toThrow();
    expect(() => onWindowLoad(null)).toThrow();
  });

  test("Checks for correct load callback", () => {
    let isLoad = false;
    const getLoad = () => isLoad = true;
    onWindowLoad(getLoad);
    expect(isLoad).toBe(true);
  });

});
