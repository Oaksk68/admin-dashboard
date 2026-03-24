<template>
  <div class="h-[238px]">
    <Doughnut
      v-if="loaded"
      :data="chartData"
      :options="chartOptions"
      :plugins="[plugin]"
    />
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { plugin } from "./js/douchart-plugin";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "DouChart",
  props: ["data", "loaded"],
  extends: Doughnut,
  components: { Doughnut },
  data() {
    return {
      plugin,
      value: 80,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "82%",
        radius: "100%",
      },
    };
  },
  computed: {
    chartData() {
      return {
        datasets: [
          {
            total_employees: null,
            Height: "2",
            Width: "1.20",
            backgroundColor: ["#36A1EA", "transparent"],
            smallText: true,
            data: [null, null],
            rotation: 174,
            hoverOffset: [4, 0],
            borderWidth: 0,
            borderRadius: 80,
            spacing: 0,
          },
        ],
      };
    },
  },

  methods: {
    updateChart(val) {
      this.chartData.datasets[0].data[0] = val.percent_today_stamp_in;
      this.chartData.datasets[0].data[1] = 100 - val.percent_today_stamp_in;
      this.chartData.datasets[0].total_employees = val.total_employees;
    },
  },

  watch: {
    data: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.updateChart(newVal);
      },
    },
  },
};
</script>

<style scoped></style>
