<template>
  <div class="container">
    <div class="flex gap-2 mb-5">
      <div class="relative w-32 h-32">
        <Doughnut v-if="loaded" :data="chart1Data" :options="chartOptions" :plugins="[plugin]" />
        <!-- :plugins="[plugin]" -->
        <div id="chart1BG"></div>
      </div>
      <div
        class="flex flex-col md:flex-row items-center justify-center md:w-2/3 md:justify-evenly md:items-center text-primary">
        <h1>ยอดการล่วงเวลา</h1>
        <h1 class="text-[26px] md:text-3xl">100 คน</h1>
      </div>
    </div>

    <div class="flex gap-2 mb-5">
      <div class="relative w-32 h-32">
        <Doughnut v-if="loaded" :data="chart2Data" :options="chartOptions" :plugins="[plugin]" />
        <div id="chart2BG"></div>
      </div>
      <div
        class="flex flex-col md:flex-row items-center justify-center md:w-2/3 md:justify-evenly md:items-center text-primary">
        <h1>ยอดการเข้างานสาย</h1>
        <h1 class="text-3xl">80 คน</h1>
      </div>
    </div>

    <div class="flex gap-2 mb-5">
      <div class="relative w-32 h-32">
        <Doughnut v-if="loaded" :data="chart3Data" :options="chartOptions" :plugins="[plugin]" />
        <div id="chart3BG"></div>
      </div>
      <div
        class="flex flex-col md:flex-row items-center justify-center md:w-2/3 md:justify-evenly md:items-center text-primary">
        <h1>ยอดการเข้าลางาน</h1>
        <h1 class="text-3xl">10 คน</h1>
      </div>
    </div>
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { plugin } from "./js/douchart-plugin";
import { mapGetters } from 'vuex';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: "DouChart",
  props: ["chartData"],
  extends: Doughnut,
  components: { Doughnut },
  data() {
    return {
      loaded: false,
      plugin,
      chartOptions: {
        plugins: {
          legend: {
            display: false,
          },
        },
        responsive: true,
        borderRadius: 80,
        cutout: "80%",
      },
    };
  },

  computed: {
    ...mapGetters(['getDouchartData', 'YEARLY_GRAPH_DATA']),
    chart1Data() {
      if (sessionStorage.getItem('user-role') == 2) {
        return {
          datasets: [
            {
              Height: "1.95",
              Width: "1.45",
              backgroundColor: ["rgba(156, 227, 81, 1)", "transparent"],
              smallText: false,
              data: [this.getDouchartData.OT_percent, (100 - this.getDouchartData.OT_percent)],
              rotation: 174,
              hoverOffset: 4,
              borderWidth: 0,
              borderRadius: 80,
              spacing: 0,
            },
          ],
        };
      } else if (sessionStorage.getItem('user-role') == 1) {
        return {
          datasets: [
            {
              Height: "1.95",
              Width: "1.45",
              backgroundColor: ["rgba(156, 227, 81, 1)", "transparent"],
              smallText: false,
              data: [this.YEARLY_GRAPH_DATA.OT_percent, (100 - this.YEARLY_GRAPH_DATA.OT_percent)],
              rotation: 174,
              hoverOffset: 4,
              borderWidth: 0,
              borderRadius: 80,
              spacing: 0,
            },
          ],
        };
      }
    },
    chart2Data() {
      if (sessionStorage.getItem('user-role') == 2) {
        return {
          datasets: [
            {
              Height: "1.95",
              Width: "1.45",
              backgroundColor: ["rgba(255, 199, 115, 1)", "transparent"],
              data: [this.getDouchartData.late_percent, (100 - this.getDouchartData.late_percent)],
              rotation: 174,
              hoverOffset: 4,
              borderWidth: 0,
              borderRadius: 80,
              spacing: 0,
            },
          ],
        };
      }
      else if (sessionStorage.getItem('user-role') == 1) {
        return {
          datasets: [
            {
              Height: "1.95",
              Width: "1.45",
              backgroundColor: ["rgba(255, 199, 115, 1)", "transparent"],
              data: [this.YEARLY_GRAPH_DATA.late_percent, (100 - this.YEARLY_GRAPH_DATA.late_percent)],
              rotation: 174,
              hoverOffset: 4,
              borderWidth: 0,
              borderRadius: 80,
              spacing: 0,
            },
          ],
        };
      }
    },
    chart3Data() {
      if (sessionStorage.getItem('user-role') == 2) {
        return {
          datasets: [
            {
              Height: "1.95",
              Width: "1.45",
              backgroundColor: ["rgba(245, 102, 102, 1)", "transparent"],
              data: [this.getDouchartData.leave_percent, (100 - this.getDouchartData.leave_percent)],
              rotation: 174,
              hoverOffset: 4,
              borderWidth: 0,
              borderRadius: 80,
              spacing: 0,
            },
          ],
        };
      } else if (sessionStorage.getItem('user-role') == 1) {
        return {
          datasets: [
            {
              Height: "1.95",
              Width: "1.45",
              backgroundColor: ["rgba(255, 199, 115, 1)", "transparent"],
              data: [this.YEARLY_GRAPH_DATA.leave_percent, (100 - this.YEARLY_GRAPH_DATA.leave_percent)],
              rotation: 174,
              hoverOffset: 4,
              borderWidth: 0,
              borderRadius: 80,
              spacing: 0,
            },
          ],
        };
      }

    },
  },

  async mounted() {
    // let role = sessionStorage.getItem('user-role')
    // if (role == 0) {
    //   this.loaded = false
    //   await this.axios
    //     .post("report/yearly-graph")
    //     .then((response) => {
    //       this.chart1Data.datasets[0].data[0] = response.data.message.OT_percent;
    //       this.chart1Data.datasets[0].data[1] =
    //         100 - response.data.message.OT_percent;
    //       this.chart2Data.datasets[0].data[0] =
    //         response.data.message.late_percent;
    //       this.chart2Data.datasets[0].data[1] =
    //         100 - response.data.message.late_percent;
    //       this.chart3Data.datasets[0].data[0] =
    //         response.data.message.leave_percent;
    //       this.chart3Data.datasets[0].data[1] =
    //         100 - response.data.message.leave_percent;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       this.loaded = true;
    //     });
    // }
    //  else if (role == 2) {
    //   await this.axios
    //     .post("emp-yearly-graph")
    //     .then((response) => {
    //       this.chart1Data.datasets[0].data[0] = response.data.message.OT_percent;
    //       this.chart1Data.datasets[0].data[1] =
    //         100 - response.data.message.OT_percent;
    //       this.chart2Data.datasets[0].data[0] =
    //         response.data.message.late_percent;
    //       this.chart2Data.datasets[0].data[1] =
    //         100 - response.data.message.late_percent;
    //       this.chart3Data.datasets[0].data[0] =
    //         response.data.message.leave_percent;
    //       this.chart3Data.datasets[0].data[1] =
    //         100 - response.data.message.leave_percent;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     })
    //     .finally(() => {
    //       this.loaded = true;
    //     });
    // }
  },
};
</script>

<style scoped>
div#chart1BG {
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 100%;
  position: absolute;
  left: calc(50%);
  transform: translate(-50%, -50%);
  top: calc(50%);
  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.2), inset 0px 0px 15px #9ce351;
}

div#chart2BG {
  width: 5.6rem;
  height: 5.6rem;
  border-radius: 100%;
  position: absolute;
  left: calc(50%);
  transform: translate(-50%, -50%);
  top: calc(50%);
  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.2),
    inset 0px 0px 15px rgba(255, 199, 115, 1);
}

div#chart3BG {
  width: 5.8rem;
  height: 5.8rem;
  border-radius: 100%;
  position: absolute;
  left: calc(50%);
  transform: translate(-50%, -50%);
  top: calc(50%);
  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.2),
    inset 0px 0px 15px rgba(245, 102, 102, 1);
}
</style>
