import { getRandomIntFromInterval } from "./index.ts";

describe(getRandomIntFromInterval.name, () => {

  test("Checks for invalid args", () => {
    expect(() => getRandomIntFromInterval(false as any, 10)).toThrow();
  });

  test("Checks for valid numbers", () => {
    const random = getRandomIntFromInterval(1, 10);
    expect(getRandomIntFromInterval(0, 0)).toBe(0);
    expect(random >= 1 && random <= 10).toBe(true);
  });

});
