<template>
  <div class="content-area">
    <div class="form-area">
      <label class="form-field"
        >Stock symbol:
        <input v-model="symbol" maxlength="4" />
      </label>
      <span class="errors">{{ errors.symbol }}</span>
    </div>
    <div class="form-area check-box-area">
      <div class="content-area">
        <div v-for="type in socialMediaList" :key="type.id">
          <input
            type="checkbox"
            :id="type.name"
            :value="type.name"
            v-model="mediaTypes"
          />
          <label :for="type.name">{{
            type.name.charAt(0).toUpperCase() + type.name.slice(1)
          }}</label>
          <button v-on:click="removeSocialMedia(type.id)">Remove</button>
        </div>
        <span class="errors">{{ errors.mediaType }}</span>
      </div>
      <div class="content-area">
        <input v-model="mediaName" placeholder="Enter a media name" />
        <button v-on:click="addSocialMedia">Add Media</button>
      </div>
    </div>
    <div class="form-area">
      <label
        >Start date:
        <input v-model="startDate" type="date" />
      </label>
      <label
        >End date:
        <input v-model="endDate" type="date" />
      </label>
      <span class="errors">{{ errors.timeWindow }}</span>
    </div>
    <div><button v-on:click="submitForm">Submit</button></div>
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
      mediaName: "",
      socialMediaList: [
        { id: 1, name: "facebook" },
        { id: 2, name: "twitter" }
      ],
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
      const tenDaysBefore = new Date(Date.now() - 9 * 24 * 60 * 60 * 1000);
      return tenDaysBefore.toISOString().slice(0, 10);
    },
    getEndDate() {
      return new Date(Date.now()).toISOString().slice(0, 10);
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
    removeSocialMedia(id) {
      let newList = this.socialMediaList.filter(item => item.id !== id);
      this.socialMediaList = newList;
      this.mediaTypes = [];
    },
    addSocialMedia() {
      if (!this.mediaName) {
        return;
      }

      let newId = this.socialMediaList[this.socialMediaList.length - 1].id + 1;
      const newType = {
        name: this.mediaName,
        id: newId
      };
      this.socialMediaList.push(newType);
      this.mediaName = "";
    }
  }
};
</script>
