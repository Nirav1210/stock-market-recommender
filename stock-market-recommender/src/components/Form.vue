<template>
  <div class="content-area">
    <div>
      <label class="form-field"
        >Stock symbol:
        <input v-model="symbol" maxlength="4" />
      </label>
      <span class="errors">{{ errors.symbol }}</span>
    </div>
    <div>
      <label>Social media type</label>
      <span class="errors">{{ errors.mediaType }}</span>
      <input
        type="checkbox"
        id="facebook"
        value="Facebook"
        v-model="mediaTypes"
      />
      <label for="facebook">Facebook</label>
      <input
        type="checkbox"
        id="twitter"
        value="Twitter"
        v-model="mediaTypes"
      />
      <label for="twitter">Twitter</label>
    </div>
    <div class="time-window">
      <label>Time window</label>
      <span class="errors">{{ errors.timeWindow }}</span>
      <label
        >Start date:
        <input v-model="startDate" type="date" />
      </label>
      <label
        >End date:
        <input v-model="endDate" type="date" />
      </label>
    </div>
    <button v-on:click="submitForm">Submit</button>
  </div>
</template>

<script>
import { getNumberOfDays } from "../services/helpers";

export default {
  name: "Form",
  components: {},
  props: {},
  data() {
    return {
      mediaTypes: [],
      symbol: "",
      startDate: this.getStartDate(),
      endDate: this.getEndDate(),
      isError: false,
      errors: {
        symbol: "",
        mediaType: "",
        timeWindow: ""
      }
    };
  },
  methods: {
    getStartDate() {
      const tenDaysBefore = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000);
      return tenDaysBefore.toISOString().slice(0,10);
    },
    getEndDate() {
      return new Date(Date.now()).toISOString().slice(0,10);
    },
    submitForm() {
      this.resetErrors();
      this.validateForm();

      const formData = {
        symbol: this.symbol,
        startDate: this.startDate,
        endDate: this.endDate,
        mediaTypes: this.mediaTypes
      };

      if (!this.isError) {
        this.$emit("submit", formData);
      }
    },
    validateForm() {
      if (getNumberOfDays(this.startDate, this.endDate) <= 0) {
        this.errors.timeWindow = "Start date must be before End date";
        this.isError = true;
      }
      if (this.symbol <= 0) {
        this.errors.symbol = "Please provide a symbol";
        this.isError = true;
      }
      if (this.mediaTypes.length <= 0) {
        this.errors.mediaType = "Select atleast 1 social media type";
        this.isError = true;
      }
    },
    resetErrors() {
      this.isError = false;
      this.errors = {
        symbol: "",
        mediaType: "",
        timeWindow: ""
      };
    },
  }
};
</script>
