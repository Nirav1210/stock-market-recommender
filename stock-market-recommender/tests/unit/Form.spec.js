import { shallowMount } from "@vue/test-utils";
import Form from "@/components/Form.vue";

describe("Form validation", () => {
  const wrapper = shallowMount(Form);
  beforeEach(() => {
    wrapper.setData({
      mediaTypes: ["facebook"],
      symbol: "ABCD",
      startDate: "2020-11-04",
      endDate: "2020-11-10",
      isError: false,
      errors: {
        symbol: "",
        mediaType: "",
        timeWindow: ""
      }
    });
  });
  it("should emit submit event if no errors", () => {
    wrapper.vm.submitForm();
    expect(wrapper.vm.isError).toEqual(false);
    const emittedData = wrapper.emitted()["submit"][0][0];
    expect(emittedData).toEqual({
      mediaTypes: wrapper.vm.mediaTypes,
      symbol: wrapper.vm.symbol,
      startDate: wrapper.vm.startDate,
      endDate: wrapper.vm.endDate
    });
  });
  it("should validate symbol", () => {
    // correct symbol
    wrapper.vm.validateForm();
    expect(wrapper.vm.errors.symbol).toEqual("");

    // incorrect symbol
    wrapper.setData({ symbol: "" });
    wrapper.vm.validateForm();
    expect(wrapper.vm.errors.symbol).toEqual("Please provide a symbol");
  });
  it("should validate dates", () => {
    // correct dates
    wrapper.vm.validateForm();
    expect(wrapper.vm.errors.timeWindow).toEqual("");

    // incorrect dates
    wrapper.setData({
      startDate: "2020-11-10",
      endDate: "2020-11-10"
    });
    wrapper.vm.validateForm();
    expect(wrapper.vm.errors.timeWindow).toEqual(
      "Start date must be before End date"
    );
  });
  it("should validate social media types", () => {
    // correct values
    wrapper.vm.validateForm();
    expect(wrapper.vm.errors.mediaType).toEqual("");

    // incorrect value
    wrapper.setData({
      mediaTypes: []
    });
    wrapper.vm.validateForm();
    expect(wrapper.vm.errors.mediaType).toEqual(
      "Select atleast 1 social media type"
    );
  });
});
