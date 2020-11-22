<template>
  <div v-show="loaded" class="content-area">
    <ul class="legend">
      <li><span class="buy"></span> Buy</li>
      <li><span class="hold"></span> Hold</li>
      <li><span class="sell"></span> Sell</li>
    </ul>
    <BarChart :chart-data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import BarChart from "./BarChart";
import { colors } from "../services/constants";

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false
  },
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
  }
};

export default {
  name: "Ratings",
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
  computed: {
    chartData() {
      return this.buildData();
    },
    chartOptions() {
      return chartOptions;
    },
    loaded() {
      return this.ratings && this.ratings.length > 0 ? true : false;
    }
  },
  methods: {
    buildData() {
      return {
        labels: this.getDates(),
        datasets: [
          {
            backgroundColor: this.getColour(),
            borderColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            label: this.getSymbol(),
            fill: true,
            data: this.getData()
          }
        ]
      };
    },
    getSymbol() {
      return this.symbol;
    },
    getData() {
      const prices = [];
      this.ratings.forEach(item => {
        prices.push(item[0]);
      });
      return prices;
    },
    getDates() {
      const dates = [];
      this.ratings.map(item => dates.push(item[2]));
      return dates;
    },
    getColour() {
      const colorList = [];
      this.ratings.map(item => {
        if (item[1] === "sell") colorList.push(colors.colorSell);
        if (item[1] === "hold") colorList.push(colors.colorHold);
        if (item[1] === "buy") colorList.push(colors.colorBuy);
      });
      return colorList;
    }
  }
};
</script>

<style lang="less" scoped></style>
