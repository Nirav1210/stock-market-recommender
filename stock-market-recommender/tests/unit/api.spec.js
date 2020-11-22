import { 
  stockPriceGenerator, 
  socialMediaCountGenerator, 
  recommendationAlgorithm 
} from "../../src/services/api";

describe("given stockPriceGenerator is called", () => {
  describe("when dates are not provided", () => {
    it("should return 10 prices by default", () => {
      const list = stockPriceGenerator("ABCD", null, null)
      expect(list.length).toEqual(10);
    });
  });
  describe("when time window is provided", () => {
    it("should return prices in the date-range", () => {
      const list = stockPriceGenerator("ABCD", "2020-10-11", "2020-11-11");
      expect(list.length).toEqual(31);
    });
  });
});

describe("given socialMediaCountGenerator is called", () => {
  it("should return a number for each mediaType", () => {
    const mediaTypes = ["facebook", "twitter"];
    const obj = socialMediaCountGenerator("ABCD", mediaTypes);
    expect(obj["facebook"]).toBeGreaterThan(0);
    expect(obj["twitter"]).toBeGreaterThan(0);
  });
});

describe("given recommendationAlgorithm is executed", () => {
  beforeEach(() => {});
  const data = [
    { price: [2, 15, 4], count: [0, 6, 1], result: [[2, "hold"], [15, "buy"], [4, "buy"]] },
    { price: [2, 15, 4, 9], count: [0, 6, 1, 2], result: [[2, "hold"], [15, "buy"], [4, "hold"], [9, "buy"]] },
    { price: [10.4, 10.59, 11.2, 5.7], count: [3, 0, 5, 1], result: [[10.4, "buy"], [10.59, "sell"], [11.2, "buy"], [5.7, "hold"]] },
    { price: [2, 15, 4], count: [0, 6], result: null},
  ];
  data.forEach(item => {
    it(`should return correct set of ratings`, () => {
      const res = recommendationAlgorithm(item.price, item.count);
      expect(res).toEqual(item.result);
    });
  });
});
