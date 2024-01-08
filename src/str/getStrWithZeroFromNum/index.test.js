
import { getStrWithZeroFromNum } from "./index.js";

describe(getStrWithZeroFromNum.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getStrWithZeroFromNum("123")).toThrow();
    expect(() => getStrWithZeroFromNum(null)).toThrow();
  });

  test("Checks for numbers", () => {
    expect(getStrWithZeroFromNum(123)).toBe("123");
    expect(getStrWithZeroFromNum(1)).toBe("01");
    expect(getStrWithZeroFromNum(-100)).toBe("-100");
    expect(getStrWithZeroFromNum(-1)).toBe("-01");
    expect(getStrWithZeroFromNum(-10)).toBe("-10");
    expect(getStrWithZeroFromNum(0)).toBe("00");
  });

  test("Checks for custom leading count of numbers", () => {
    expect(getStrWithZeroFromNum(-10, 5)).toBe("-00010");
  });

});
