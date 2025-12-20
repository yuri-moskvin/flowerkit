import { onWindowLoad } from "./index.ts";

describe(onWindowLoad.name, () => {

  test("Checks for invalid args", () => {
    expect(() => onWindowLoad(1 as any)).toThrow();
    expect(() => onWindowLoad(null as any)).toThrow();
  });

  test("Checks for correct load callback", () => {
    let isLoad = false;
    const getLoad = () => isLoad = true;
    onWindowLoad(getLoad);
    expect(isLoad).toBe(true);
  });

});
