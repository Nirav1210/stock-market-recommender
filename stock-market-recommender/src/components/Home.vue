<template>
  <div class="home">
    <Form />
    <StockGrid />
    <Post />
  </div>
</template>

<script>
import Form from "./Form.vue";
import StockGrid from "./StockGrid.vue";
import Post from "./Post.vue";

export default {
  name: "Home",
  components: {
    Form,
    StockGrid,
    Post
  },
  props: {
    msg: String
  }
};
</script>
