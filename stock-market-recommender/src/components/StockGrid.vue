<template>
  <div class="content-area">
    <div class="symbol">{{ stockSymbol }}</div>
    <section class="stock-grid">
      <div class="row">
        <h4 class="col">Price</h4>
        <h4 class="col">Rating</h4>
      </div>
      <div v-for="(no, index) in numberOfDays" :key="index" class="row">
        <div class="col">{{ index }}</div>
        <div class="col">buy</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "StockGrid",
  components: {},
  props: {
    numberOfDays: {
      type: Number,
      default: 2
    },
    stockSymbol: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.stock-grid {
  margin: 0 auto;
}

.row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.col {
  padding: 2px;
  margin: 2px;
  background-color: cornflowerblue;
  color: whitesmoke;
}
</style>
