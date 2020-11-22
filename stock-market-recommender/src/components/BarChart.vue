<script>
import { Bar, mixins } from "vue-chartjs";

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      type: Object,
      default: null
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options);
  },
  watch: {
    chartData () {
        this.$data._chart.update()
    }
}
};
</script>