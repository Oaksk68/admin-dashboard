<template>
  <main class="md:pl-4 pl-0">
    <teleport to="body">
      <Modal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </Modal>
    </teleport>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl  md:p-16 p-10 pb-5">
      <div class="flex mb-10">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-3xl ml-3">การเข้า-ออกงานรายเดือน</h1>
      </div>
      <div class="relative mb-7 py-4">
        <div class="md:flex md:justify-between grid gap-2 md:gap-0">
          <div class="grid gap-2 md:flex md:gap-4">
            <select class="border md:w-56 border-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="" v-model="filter.listNum" @change="
                this.$getPaginateReport('report/monthly-attendance', filter)
                ">
              <option value="" selected hidden>แสดง 10 แถว</option>
              <option value="10">แสดง 10 แถว</option>
              <option value="20">แสดง 20 แถว</option>
              <option value="30">แสดง 30 แถว</option>
              <option value="50">แสดง 50 แถว</option>
              <option value="100">แสดง 100 แถว</option>
            </select>
            <VueDatePicker class="rounded-xl focus:ring-blue-500 focus:border-blue-500" v-model="filter.month"
              month-picker :enable-time-picker="false" @update:model-value="handleDate" />
            <!--  @update:model-value="
                $getPaginateReport('report/monthly-attendance', this.filter)
              " -->
          </div>
          <div class="flex flex-col md:flex-row gap-2 items-center">
            <div class="relative w-full">
              <input
                class="w-full border p-2.5 border-slate-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                type="text" placeholder="ค้นหา" />
              <font-awesome-icon class="absolute right-3 top-3 text-muted" icon="fa-solid fa-search" />
            </div>
            <div class="flex justify-end gap-2 md:w-auto w-full">
              <div @click="
                $download(
                  'report/export-monthly-attendance',
                  'Monthly Attendance'
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
        <div class="container grid md:flex gap-4 mt-5">
          <div class="box-card py-5 md:w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">จำนวนพนักงานทั้งหมด (คน)</h1>
            <h1 class="text-3xl text-primary font-medium">{{ data.total }}</h1>
          </div>
          <div class="box-card py-5 md:w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">เฉลี่ยการเข้างานตรงเวลา</h1>
            <h1 class="text-3xl text-primary font-medium">0 ชั่วโมง 0 นาที</h1>
          </div>
          <div class="box-card py-5 md:w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">คะแนนรวม</h1>
            <h1 class="text-3xl text-primary font-medium">100</h1>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto overflow-y-hidden hidden md:block">
        <table class="w-full text-sm text-left text-primary border-separate border-spacing-y-1">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">{{ $t('name') }}</th>
              <th scope="col" class="px-2 py-2 font-medium">วันที่</th>
              <th scope="col" class="px-2 py-2 font-medium">
                เวลา <br />เข้างาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                ลง{{ $t('name') }} <br />เข้างาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200">
                สถานะ
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200">
                คะแนน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200">
                {{ $t('personalLeave') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200">
                {{ $t('sickLeave') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200">
                {{ $t('summerLeave') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200">
                {{ $t('specialLeave') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200 rounded-r-full">
                ลาไม่รับ <br />
                ค่าจ้าง
              </th>
            </tr>
          </thead>
          <tbody class="text-center align-text-top my-4">
            <tr v-for="(item, index) in tableData" :key="index" :class="index % 2 == 0 ? 'bg-teal-50' : 'bg-calendarBg'">
              <td scope="col" class="px-2 py-4 rounded-l-lg">{{ ++index }}</td>
              <td scope="col" class="px-2 py-4 text-start whitespace-nowrap">
                {{ item.fullname }}
              </td>
              <td>
            <tr class="inner-tb-center" v-for="(atten, index) in item.monthly_attend" :key="index">
              <td class="px-2 py-3">
                {{ this.$moment(atten.date).format("DD/MM/YY") }}
              </td>
            </tr>
            </td>
            <td>
              <tr class="inner-tb-center" v-for="(atten, index) in item.monthly_attend" :key="index">
                <td class="px-2 py-3">
                  {{ this.$moment(atten.shift_start).format("DD/MM/YY") }}
                </td>
              </tr>
            </td>
            <td>
              <tr class="inner-tb-center" v-for="(atten, index) in item.monthly_attend" :key="index">
                <td class="px-2 py-3">
                  {{ this.$moment(atten.stamp_in).format("HH:mm") }}
                </td>
              </tr>
            </td>
            <td class="">
              <tr class="inner-tb-center h-[3.15em]" v-for="(atten, index) in item.monthly_attend" :key="index">
                <td class="px-2 py-5">
                  <font-awesome-icon :class="atten.is_stamp_out == 1
                    ? 'text-lime-400'
                    : 'text-red-500'
                    " :icon="atten.is_stamp_out == 1
    ? 'fa-solid fa-square-check'
    : 'fa-solid fa-square-xmark'
    " class="text-[2em]" />
                </td>
              </tr>
            </td>
            <td>
              <tr v-for="(atten, index) in item.monthly_attend" :key="index" class="inner-tb-center">
                <td v-if="atten.point" class="px-2 py-3">
                  {{ atten.point }}
                </td>
                <td v-else class="px-2 py-3">--</td>
              </tr>
            </td>
            <td class="px-2 py-3">
              {{ Math.ceil(item.personal_leave) }}
            </td>
            <td class="px-2 py-3">
              {{ Math.ceil(item.sick_leave) }}
            </td>
            <td class="px-2 py-3">
              {{ Math.ceil(item.summer_leave) }}
            </td>
            <td class="px-2 py-3">
              {{ Math.ceil(item.special_leave) }}
            </td>
            <td class="px-2 py-3 rounded-r-lg">
              {{ Math.ceil(item.withoutpay_leave) }}
            </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(item, index) in tableData" :key="index" class="border-t py-2 pl-5 pr-3 text-sm" id="accordion">
          <button @click="this.$toggleAccordion(index, 'department')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`department-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{
              item.fullname
            }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="item.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium mb-2">{{ $t('name') }}</h1>
              <span class="text-gray-400 capitalize">
                {{ item.fullname }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">วันที่</h1>
              <div class="my-3" v-for="(atten, index) in item.monthly_attend" :key="index">
                <span class="text-gray-400">
                  {{ this.$moment(atten.date).format("DD/MM/YY") }}
                </span>
              </div>
            </div>
            <div>
              <h1 class="font-medium">เวลาเข้างาน</h1>
              <div class="my-3" v-for="(atten, index) in item.monthly_attend" :key="index">
                <span class="text-gray-400">
                  {{ this.$moment(atten.shift_start).format("DD/MM/YY") }}
                </span>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">ลง{{ $t('name') }}เข้างาน</h1>
              <div class="my-3" v-for="(atten, index) in item.monthly_attend" :key="index">
                <span class="text-gray-400">
                  {{ this.$moment(atten.stamp_in).format("HH:mm") }}
                </span>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">สถานะ</h1>
              <div class="h-[3.15em]" v-for="(atten, index) in item.monthly_attend" :key="index">
                <span class="">
                  <font-awesome-icon :class="atten.is_stamp_out == 1 ? 'text-lime-400' : 'text-red-500'
                    " :icon="atten.is_stamp_out == 1
    ? 'fa-solid fa-square-check'
    : 'fa-solid fa-square-xmark'
    " class="text-[2em]" />
                </span>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">คะแนน</h1>
              <tr v-for="(atten, index) in item.monthly_attend" :key="index" class="">
                <td v-if="atten.point" class="">
                  {{ atten.point }}
                </td>
                <td v-else class="">--</td>
              </tr>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t('personalLeave') }}</h1>
              <div>
                <p v-if="data.stamp_out == null">--</p>
                <p v-else>
                  {{ this.$moment(data.stamp_out).format("hh:mm:ss") }}
                </p>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t('sickLeave') }}</h1>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t('summerLeave') }}</h1>
              <span v-if="data.before_time" class="text-red-500">{{
                data.before_time
              }}</span>
              <span v-else-if="data.late_time" class="text-lime-500">{{
                data.late_time
              }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t('specialLeave') }}</h1>
              <p v-if="data.device_out_type == null">--</p>
              <p v-else>{{ data.device_out_type }}</p>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t('withoutpayLeave') }}</h1>
              <p v-if="data.duration == null">--</p>
              <p v-else>{{ data.duration }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4 md:pr-0">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="
            $getPaginateReport('report/monthly-attendance', filter)
            " hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      color: "#36A1EA",
      size: "20px",
      tableData: [],
      data: [],
      monthly_attend: null,
      filter: {
        date: {
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        },
        month: {
          month: new Date().getMonth(),
          year: new Date().getFullYear(),
        },
        listNum: "",
      },
    };
  },

  methods: {
    handleDate() {
      // this.filter.date = modelData;
      this.$getPaginateReport("report/monthly-attendance", this.filter);
    },
  },

  mounted() {
    this.$paginateData.current_page = 1;
    this.$getPaginateReport("report/monthly-attendance", this.filter, true);
  },
};
</script>

<style scoped>
svg {
  vertical-align: -0.3em;
}

div.box-card {
  border-radius: 30px;
  background: var(--unnamed, #fff);
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25),
    0px 0px 4px 0px rgba(0, 0, 0, 0.1) inset;
}
</style>
