import {
  stockPriceGenerator,
  socialMediaCountGenerator,
  recommendationAlgorithm
} from "../../src/services/api";

describe("given stockPriceGenerator is called", () => {
  describe("when dates are not provided", () => {
    it("should return 10 prices by default", () => {
      const list = stockPriceGenerator("ABCD", null, null);
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
    const count = socialMediaCountGenerator("ABCD", mediaTypes);
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(200);
  });
});

describe("given recommendationAlgorithm is executed", () => {
  beforeEach(() => {});
  const data = [
    {
      price: [ {date: "2020-11-04", price: 2 }, {date: "2020-11-05", price: 15 }, {date: "2020-11-06", price: 4 }],
      count: [0, 6, 1],
      result: [
        [2, "hold", "2020-11-04"],
        [15, "buy", "2020-11-05"],
        [4, "buy", "2020-11-06"]
      ]
    },
    {
      price: [{date: "2020-11-04", price: 2 }, {date: "2020-11-05", price: 15 }, {date: "2020-11-06", price: 4 }, {date: "2020-11-07", price: 9 }],
      count: [0, 6, 1, 2],
      result: [
        [2, "hold", "2020-11-04"],
        [15, "buy", "2020-11-05"],
        [4, "hold", "2020-11-06"],
        [9, "buy", "2020-11-07"]
      ]
    },
    {
      price: [{date: "2020-11-04", price: 10.4 }, {date: "2020-11-05", price: 10.59 }, {date: "2020-11-06", price: 11.2 }, {date: "2020-11-07", price: 5.7 } ],
      count: [3, 0, 5, 1],
      result: [
        [10.4, "buy", "2020-11-04"],
        [10.59, "sell", "2020-11-05"],
        [11.2, "buy", "2020-11-06"],
        [5.7, "hold", "2020-11-07"]
      ]
    },
    { price: [{date: "2020-11-04", price: 2 }, {date: "2020-11-05", price: 15 }, {date: "2020-11-06", price: 4 }], count: [0, 6], result: [] }
  ];
  data.forEach(item => {
    it(`should return correct set of ratings`, () => {
      const res = recommendationAlgorithm(item.price, item.count);
      expect(res).toEqual(item.result);
    });
  });
});
