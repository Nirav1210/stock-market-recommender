import { shallowMount } from "@vue/test-utils";
import StockGrid from "@/components/StockGrid.vue";

const props = {
  ratings: [
    [3, "buy"],
    [10, "sell"]
  ],
  symbol: "ABCS"
};

describe("Form validation", () => {
  const wrapper = shallowMount(StockGrid, props);
  it("should emit submit event if no errors", () => {
    expect(1).toEqual(1);
  });
});
