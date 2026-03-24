<template>
  <main>
    <teleport to="body">
      <Modal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </Modal>
    </teleport>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex gap-3 items-start md:items-center pb-8 p-4 md:p-0">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-[26px] text-3xl">
          <VueDatePicker class="" :model-value="this.filter.date" @update:model-value="handleYear" year-picker>
            <template #trigger>
              <button class="flex items-center gap-3">
                การเข้า-ออกงานประจำปี
                <span class="text-[26px] md:text-3xl text-primary">{{ this.filter.date }}</span>
                <font-awesome-icon id="caret" icon="fa-solid fa-caret-down" class="text-primary" />
              </button>
            </template>
          </VueDatePicker>
        </h1>

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

      <div class="relative mb-7 px-8 py-4">
        <div class="md:flex justify-between">
          <div class="grid gap-2 md:flex items-center md:gap-4">
            <select
              class="border md:w-56 border-slate-300 text-muted text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="">
              <option value="">แสดง 10 แถว</option>
            </select>
            <VueDatePicker class="md:w-52"
              input-class-name="w-full border border-slate-300 text-muted text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="">
              <option value="">มกราคม 2023</option>
            </VueDatePicker>
          </div>
          <div class="flex flex-col md:flex-row gap-2 items-center mt-2 md:mt-0">
            <div class="flex justify-end gap-2 w-full">
              <div @click="
                $download('emp-export-yearly-report', 'Annual Attendance')
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

      <div class="overflow-auto mx-5 hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t('month') }}
              </th>
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
            <tr class="h-14" v-for="(data, index) in tableData" :key="index">
              <td class="px-1 py-1 whitespace-nowrap">{{ ++index }}</td>
              <td class="py-1 whitespace-nowrap">{{ data.month_name }}</td>
              <td class="py-1 whitespace-nowrap">
                {{ data.lateDays }}
              </td>
              <td class="py-1 whitespace-nowrap">
                {{ data.lateTime }}
              </td>
              <td class="py-1 whitespace-nowrap">
                {{ data.overTime }}
              </td>
              <td class="py-1 whitespace-nowrap">
                {{ data.overDays }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="block md:hidden">
        <div id="accordion" class="block md:hidden border-b mb-4">
          <div v-for="(data, index) in tableData" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
            <button @click="this.$toggleAccordion(index, 'annualIO')" class="flex items-center w-full gap-3">
              <font-awesome-icon :id="`annualIO-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
                icon="fa-solid fa-chevron-up" rotation="180" />
              <span class="capitalize text-sm text-primary">
                {{ data.month_name }}
              </span>
            </button>
            <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
              :class="data.open ? 'h-auto ' : 'h-0'" id="content">
              <div>
                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                <span class="text-h1mute text-sm capitalize">
                  {{ data.month_name }}
                </span>
              </div>
              <div>
                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                <span class="text-h1mute text-sm capitalize">
                  {{ data.lateDays }}
                </span>
              </div>
              <div>
                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                <span class="text-h1mute text-sm capitalize">
                  {{ data.lateDays }}
                </span>
              </div>
              <div>
                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                <span class="text-h1mute text-sm capitalize">
                  {{ data.lateTime }}
                </span>
              </div>
              <div>
                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                <span class="text-h1mute text-sm capitalize">
                  {{ data.overTime }}
                </span>
              </div>
              <div>
                <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
                <span class="text-h1mute text-sm capitalize">
                  {{ data.overDays }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getPaginateReport('report/yearly/attendance')" hideFirstButton
          hideLastButton />
      </div> -->
    </div>
  </main>
</template>

<script>
import { Bar } from 'vue-chartjs'
import DoughChart2 from '@/components/DougChart2.vue'
import { plugin } from '@/components/js/douchart-plugin'
import { mapActions, mapGetters } from 'vuex'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement
)

export default {
  components: { Bar, DoughChart2 },
  data() {
    return {
      date: '',
      plugin,
      loading: true,
      color: '#36A1EA',
      size: '20px',
      loaded: false,
      caretClose: false,
      caretOpen: true,
      filter: {
        date: this.$moment().format("YYYY")
      },
      barChartOptions: {
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle'
            }
          }
        },
        responsive: true,
        borderRadius: 4,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            max: 30
          }
        }
      },
      tableData: [],
      chartData: []
    }
  },
  methods: {
    ...mapActions(['fetchEmpDouchartData']),
    resetDate() {
      this.date = new Date()
    },
    handleYear(modelData) {
      this.filter.date = modelData
      this.fetchEmpDouchartData(this.filter)
    }
  },

  computed: {
    ...mapGetters({
      DOUCHART_DATA: 'getDouchartData'
    }),
    barChartData() {
      return {
        labels: [...this.DOUCHART_DATA?.months],
        datasets: [
          {
            label: 'ล่วงเวลา',
            backgroundColor: 'rgba(156, 227, 81, 1)',
            data: [...this.DOUCHART_DATA.OT]
          },
          {
            label: 'มาสาย',
            backgroundColor: 'rgba(255, 199, 115, 1)',
            data: [...this.DOUCHART_DATA.late]
          },
          {
            label: 'ลางาน',
            backgroundColor: 'rgba(245, 102, 102, 1)',
            data: [...this.DOUCHART_DATA.leave]
          }
        ]
      }
    }
  },

  async created() {
    this.fetchEmpDouchartData()
    this.$paginateData.current_page = 1
    this.axios
      .post('emp-yearly-report')
      .then((res) => {
        this.tableData = res.data.employee
        this.loading = false
        this.loaded = true
        this.$refs.douchart.loaded = true
      })
      .catch(err => console.log(err))
  },

  mounted() {
    console.log(this.DOUCHART_DATA);
    console.log(this.$refs.douchart);
  }
}
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
