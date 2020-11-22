import { shallowMount } from "@vue/test-utils";
import Ratings from "@/components/Ratings.vue";
import { colors } from "../../src/services/constants";

const props = {
  ratings: [
    [2, "hold", "2020-11-04"],
    [15, "sell", "2020-11-05"],
    [4, "buy", "2020-11-06"]
  ],
  symbol: "ABCS"
};

describe("When stock information is fetched", () => {
  const wrapper = shallowMount(Ratings);
  wrapper.setProps(props);
  it("should feed correct data to chart object", () => {
    const data = wrapper.vm.getData();
    expect(data).toEqual([2, 15, 4]);
  });
  it("should feed correct dates to chart object", () => {
    const data = wrapper.vm.getDates();
    expect(data).toEqual(["2020-11-04", "2020-11-05", "2020-11-06"]);
  });
  it("should feed correct colour codes to chart object", () => {
    const data = wrapper.vm.getColour();
    expect(data).toEqual([colors.colorHold, colors.colorSell, colors.colorBuy]);
  });
  it("should build a correct chart object", () => {
    const data = wrapper.vm.buildData();
    expect(data).toEqual({
      labels: ["2020-11-04", "2020-11-05", "2020-11-06"],
      datasets: [
        {
          backgroundColor: [
            colors.colorHold,
            colors.colorSell,
            colors.colorBuy
          ],
          borderColor: "rgba(75, 192, 192, 0.2)",
          borderWidth: 2,
          label: "ABCS",
          fill: true,
          data: [2, 15, 4]
        }
      ]
    });
  });
});
