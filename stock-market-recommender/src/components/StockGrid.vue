<template>
  <div class="content-area">
    <BarChart v-show="loaded" :chart-data="chartData" :options="options"/>
  </div>
</template>

<script>
import BarChart from "./BarChart";

export default {
  name: "StockGrid",
  components: {
    BarChart
  },
  props: {
    ratings: {
      type: Array,
      default: () => []
    },
    symbol: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              display: true,
              ticks: {
                suggestedMin: 0,
                beginAtZero: true
              }
            }
          ]
        },
      }
    };
  },
  computed: {
    chartData() {
      return this.buildData();
    },
    loaded() {
      return this.ratings  && this.ratings.length > 0 ? true : false;
    }
  },
  methods: {
    buildData() {
      return {
        labels: this.getDates(),
        datasets: [
          {
            backgroundColor: this.getColour(),
            borderColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            label: this.getSymbol(),
            fill: true,
            data: this.getData()
          },
        ]
      }
    },
    getSymbol() {
      return this.symbol;
    },
    getData() {
      const prices = [];
      this.ratings.forEach(item => {
        prices.push(item[0])
      });
      return prices;
    },
    getDates() {
      const dates = [];
      this.ratings.map(item => dates.push(item[2]));
      return dates;
    },
    getColour() {
      const colors = [];
      this.ratings.map(item => {
        if (item[1] === "sell") {
          colors.push('#ff6183')
        }
        if (item[1] === "hold") {
          colors.push('#ffcf57')
        }
        if (item[1] === "buy") {
          colors.push('#4abfbf')
        }
      });
      return colors;
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
