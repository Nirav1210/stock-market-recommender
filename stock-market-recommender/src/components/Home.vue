<template>
  <div class="home">
    <Form @submit="submitData" />
    <Ratings :symbol="symbol" :ratings="ratings" />
    <Post />
  </div>
</template>

<script>
import Form from "./Form.vue";
import Ratings from "./Ratings.vue";
import Post from "./Post.vue";

import {
  socialMediaCountGenerator,
  stockPriceGenerator,
  recommendationAlgorithm
} from "../services/api";

export default {
  name: "Home",
  components: {
    Form,
    Ratings,
    Post
  },
  data() {
    return {
      mediaTypes: [],
      symbol: "",
      startDate: "",
      endDate: "",
      ratings: []
    };
  },
  methods: {
    submitData(data) {
      this.mediaTypes = data.mediaTypes;
      this.symbol = data.symbol;
      this.startDate = data.startDate;
      this.endDate = data.endDate;

      this.fetchRatings();
    },
    fetchRatings() {
      const prices = stockPriceGenerator(
        this.symbol,
        this.startDate,
        this.endDate
      );

      const counts = prices.map(() =>
        socialMediaCountGenerator(this.symbol, this.mediaTypes)
      );

      this.ratings = recommendationAlgorithm(prices, counts);
    }
  }
};
</script>
