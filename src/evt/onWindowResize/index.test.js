import { bubble } from "../bubble/index.js";
import { onWindowResize } from "./index.js";

describe(onWindowResize.name, () => {

  test("Checks for invalid args", () => {
    expect(() => onWindowResize(null)).toThrow();
    expect(() => onWindowResize(() => {}, null)).toThrow();
  });

  test("Checks for correct resize callback with 500ms delay", () => {
    const callback = jest.fn();
    const delay = 500;
    onWindowResize(callback, delay);
    bubble(document, "resize");
    expect(callback).not.toHaveBeenCalled();
    setTimeout(() => {
      expect(callback).toHaveBeenCalled();
    }, delay);
  });

});
