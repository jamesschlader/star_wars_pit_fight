import d6 from "../assets/javascript/functions/d6.js";

describe("d6.js", () => {
  it("should return an integer equal to or greater than n but not greater than n * 6", () => {
    const result = d6(3);
    expect(result).toBeGreaterThanOrEqual(3);
    expect(result).toBeLessThanOrEqual(18);
  });
});
