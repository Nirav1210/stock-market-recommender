import { shallowMount } from "@vue/test-utils";
import Home from "@/components/Home.vue";

const formData = {
  mediaTypes: ["facebook"],
  symbol: "ABCD",
  startDate: "2020-11-04",
  endDate: "2020-11-06"
};

describe("when form is submitted", () => {
  const wrapper = shallowMount(Home);
  beforeEach(() => {
    wrapper.setData({
      mediaTypes: [],
      symbol: "",
      startDate: "",
      endDate: "",
      ratings: []
    });
  });
  it("should return ratings when correct data", () => {
    wrapper.vm.submitData(formData);
    expect(wrapper.vm.ratings.length).toEqual(3);
  });
});
