<template>
  <main>
    <teleport to="body">
      <Modal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="!loaded" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </Modal>
    </teleport>

    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-16 p-10 pb-5">
      <div class="flex mb-10">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-3xl ml-3">การเข้า-ออกงานประจำปี </h1>
      </div>
      <div class="relative mb-7 py-4">
        <div class="grid gap-2 md:flex md:gap-5 items-center mb-4">
          <div class="md:w-56 rounded-xl focus:ring-blue-500 focus:border-blue-500">
            <div>
              <!-- date Picker -->
              <VueDatePicker :format="$format" class="text-muted rounded-xl focus:ring-blue-500 focus:border-blue-500"
                v-model="date" :enable-time-picker="false" />
            </div>
          </div>
          <button @click="resetDate"
            class="shadow border border-origin md:w-28 hover:bg-origin hover:text-white transition-all duration-300 text-origin font-normal py-[7px] rounded-xl">
            วันนี้
          </button>
        </div>
        <div class="md:flex justify-between">
          <div class="grid gap-2 md:flex md:gap-4">
            <select
              class="border md:w-56 border-slate-300 text-muted text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="">
              <option value="">แสดง 10 แถว</option>
            </select>
            <select
              class="border border-slate-300 md:w-40 text-muted text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="">
              <option value="">มกราคม 2023</option>
            </select>
          </div>

          <div class="flex flex-col md:flex-row gap-2 items-center mt-2 md:mt-0">
            <div class="relative w-full md:w-auto">
              <input
                class="w-full md:w-auto border border-slate-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                type="text" placeholder="ค้นหา" />
              <font-awesome-icon class="absolute right-3 top-3 text-muted" icon="fa-solid fa-search" />
            </div>
            <div class="flex justify-end gap-2 w-full">
              <div @click="
                $download(
                  'report/export-yearly/attendance',
                  'Annual Attendance'
                )
                "
                class="flex justify-center items-center p-1 border border-slate-300 rounded-2xl hover:bg-gray-200 duration-300">
                <img src="@/assets/images/excel.svg" alt="" />
              </div>
              <div
                class="flex justify-center items-center p-2 border border-slate-300 rounded-2xl hover:bg-gray-200 duration-300">
                <img src="@/assets/images/printer.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mb-10">
        <div class="container md:flex gap-4 mt-5">
          <div class="box-card rounded-lg md:w-1/2 mx-4">
            <h1 class="text-center text-primary font-medium text-3xl py-5">
              สถิติ (รายปี)
            </h1>
            <div class="relative h-[400px]">
              <Bar v-if="loaded" class="p-5" id="my-chart-id" :options="barChartOptions" :data="barChartData" />
              <span class="absolute top-5 left-6 text-muted text-xs">จำนวนคน</span>
            </div>
          </div>
          <div class="relative md:w-1/2 flex flex-col items-start md:pt-6 md:pl-20 m-4">
            <DoughChart2 ref="douchart" :chartData="chartData" />
          </div>
        </div>
      </div>

      <div class="overflow-auto mx-5">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">พนักงาน</th>
              <th scope="col" class="px-2 py-2 font-medium">เดือน</th>
              <th scope="col" class="px-2 py-2 font-medium">มาสาย</th>
              <th scope="col" class="px-2 py-2 font-medium">เวลามาสาย</th>
              <th scope="col" class="px-2 py-2 font-medium">
                เวลาทำงานล่วงเวลา
              </th>
              <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
                จำนวนวันที่ทำงานล่วงเวลา
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(item, index) in tableData" :key="index">
              <td class="px-1 py-1 whitespace-nowrap">{{ ++index }}</td>
              <td class="py-1 whitespace-nowrap">{{ item.fullname }}</td>
              <td class="py-1 whitespace-nowrap">
                <p class="bg-red-400 py-2" v-for="(month, index) in item.monthly" :key="index">
                  {{ month.month_name }},
                </p>
              </td>
              <td class="py-1 whitespace-nowrap">
                <p class="bg-red-400 py-2" v-for="(lateDay, index) in item.monthly" :key="index">
                  {{ lateDay.lateDays }},
                </p>
              </td>
              <td class="py-1 whitespace-nowrap">
                <p class="bg-red-400 py-2" v-for="(lateTime, index) in item.monthly" :key="index">
                  {{ lateTime.lateTime }}
                </p>
              </td>
              <td class="py-1 whitespace-nowrap">
                <p class="bg-lime-300 py-2" v-for="(overtime, index) in item.monthly" :key="index">
                  {{ overtime.overTime }}
                </p>
              </td>
              <td class="py-1 whitespace-nowrap">
                <p class="bg-lime-300 py-2" v-for="(overDay, index) in item.monthly" :key="index">
                  {{ overDay.overDays }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getPaginateReport('report/yearly/attendance')" hideFirstButton
          hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import { Bar } from "vue-chartjs";
import DoughChart2 from "@/components/DougChart2.vue";
import { plugin } from "@/components/js/douchart-plugin";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
} from "chart.js";
import { mapActions, mapGetters, mapState } from "vuex";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
);

export default {
  components: { Bar, DoughChart2 },

  data() {
    return {
      date: "",
      plugin,
      loading: true,
      color: "#36A1EA",
      size: "20px",
      loaded: true,
      barChartOptions: {
        plugins: {
          legend: {
            display: true,
            position: "top",
            align: "end",
            labels: {
              usePointStyle: true,
              pointStyle: "circle",
            },
          },
        },
        responsive: true,
        borderRadius: 4,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 30,
          },
        },
      },
      tableData: [],
      chartData: [],
    };
  },
  methods: {
    ...mapActions(['fetchYearlyDouchartData']),
    resetDate() {
      this.date = new Date();
    },
  },

  computed: {
    ...mapState({
      dataLoading: state => state.chartData.dataLoading
    }),
    ...mapGetters(['YEARLY_GRAPH_DATA']),
    barChartData() {
      return {
        labels: [this.YEARLY_GRAPH_DATA.labels],
        datasets: [
          {
            label: "ล่วงเวลา",
            backgroundColor: "rgba(156, 227, 81, 1)",
            data: [this.YEARLY_GRAPH_DATA.OT_percent],
          },
          {
            label: "มาสาย",
            backgroundColor: "rgba(255, 199, 115, 1)",
            data: [this.YEARLY_GRAPH_DATA.late_percent],
          },
          {
            label: "ลางาน",
            backgroundColor: "rgba(245, 102, 102, 1)",
            data: [this.YEARLY_GRAPH_DATA.leave_percent],
          },
        ],
      };
    },
  },

  watch: {
    dataLoading(val, oldVal) {
      console.log(val, oldVal);
      if (!val) {
        this.loaded = true
        this.loading = false
        this.$refs.douchart.loaded = true
      }
    }
  },

  beforeMount: async function () {
    this.$paginateData.current_page = 1;
    this.$getPaginateReport("report/yearly/attendance");
    await this.fetchYearlyDouchartData()
  },

  mounted() {

  },
};
</script>

<style scoped>
input,
select {
  padding: 0.5rem;
}

div.box-card {
  border-radius: 20px;
  background: #fff;
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25),
    0px 0px 4px 0px rgba(0, 0, 0, 0.1) inset;
}
</style>
