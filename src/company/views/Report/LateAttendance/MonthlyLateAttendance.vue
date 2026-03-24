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
    <div class="bg-white rounded-tr-3xl rounded-b-3xl p-10 md:p-16 pb-5">
      <div class="flex mb-10">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-3xl ml-3">การเข้างานตรงเวลารายเดือน</h1>
      </div>
      <div class="relative mb-7">
        <div class="md:flex justify-between">
          <div class="grid gap-2 md:flex md:gap-4">
            <select class="border md:w-56 border-slate-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="" v-model="filter.listNum" @change="
                this.$getPaginateReport(
                  'report/monthly-late-absence-onleave',
                  filter
                )
                " required>
              <option value="" selected hidden>แสดง 10 แถว</option>
              <option value="10">แสดง 10 แถว</option>
              <option value="20">แสดง 20 แถว</option>
              <option value="30">แสดง 30 แถว</option>
              <option value="50">แสดง 50 แถว</option>
            </select>
            <select class="border border-slate-300 md:w-40 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="" required>
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
            <div class="flex flex-row justify-end gap-2 w-full">
              <div @click="
                $download(
                  'report/monthly-late-absence-onleave',
                  'Monthly Late Absence Leave'
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
        <div class="container flex gap-4 mt-5">
          <div class="box-card py-5 w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">จำนวนพนักงานทั้งหมด (คน)</h1>
            <h1 class="text-3xl text-primary font-medium">100</h1>
          </div>
          <div class="box-card py-5 w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">เฉลี่ยการเข้างานตรงเวลา</h1>
            <h1 class="text-3xl text-primary font-medium">0 ชั่วโมง 0 นาที</h1>
          </div>
          <div class="box-card py-5 w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">จำนวนพนักงานทั้งหมด (คน)</h1>
            <h1 class="text-3xl text-primary font-medium">100</h1>
          </div>
        </div>
      </div>

      <!-- table -->
      <div class="overflow-auto">
        <table class="w-full text-sm text-left text-primary rounded border-separate border-spacing-y-1">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-1 py-2 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-1 py-2 font-medium text-start">{{ $t('name') }}</th>
              <th scope="col" class="px-2 py-2 font-medium">วันที่</th>
              <th scope="col" class="px-1 py-2 font-medium">เวลาเข้างาน</th>
              <th scope="col" class="px-2 py-2 font-medium">
                ลง{{ $t('name') }} <br />
                เข้างาน
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
                ลาไม่รับ ค่าจ้าง
              </th>
            </tr>
          </thead>
          <tbody class="text-center align-text-top my-4">
            <tr v-for="(data, index) in tableData" :key="index" :class="index % 2 ? 'bg-calendarBg' : 'bg-teal-50'">
              <td class="px-1 py-3 rounded-l-xl">{{ ++index }}</td>
              <td class="text-start">{{ data.fullname }}</td>
              <td class="">
            <tr v-for="(lao, index) in data.monthly_laos" :key="index" class="inner-tb-center">
              <td class="px-2 py-3">
                {{ this.$moment(lao.date).format("DD/MM/YY") }}
              </td>
            </tr>
            </td>
            <td class="">
              <tr v-for="(lao, index) in data.monthly_laos" :key="index" class="inner-tb-center">
                <td v-if="lao.attendance?.stamp_in" class="px-2 py-3">
                  {{ lao.attendance?.stamp_in }}
                </td>
                <td v-else class="px-2 py-3">--</td>
              </tr>
            </td>
            <td class="">
              <tr v-for="(lao, index) in data.monthly_laos" :key="index" class="inner-tb-center">
                <td class="px-2 py-3">
                  {{ this.$moment(lao.shift_start).format("HH:mm a") }}
                </td>
              </tr>
            </td>
            <td class="">
              <tr v-for="(lao, index) in data.monthly_laos" :key="index" class="inner-tb-center">
                <td class="px-2 py-3">
                  {{ lao.stamp_status }}
                </td>
              </tr>
            </td>
            <td class="">
              <tr v-for="(lao, index) in data.monthly_laos" :key="index" class="inner-tb-center">
                <td v-if="lao.point" class="px-2 py-3">
                  {{ lao.point }}
                </td>
                <td v-else class="px-2 py-3">--</td>
              </tr>
            </td>
            <td class="">
              {{ data.personalTotalPastLeft }}
            </td>
            <td class="">
              {{ data.sickTotalPastLeft }}
            </td>
            <td class="">
              {{ data.summerTotalPastLeft }}
            </td>
            <td class="">
              {{ data.specialTotalPastLeft }}
            </td>
            <td class="px-1 py-3 rounded-r-xl">
              {{ data.withoutpayTotalPastLeft }}
            </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="
            $getPaginateReport('report/monthly-late-absence-onleave', filter)
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
      filter: {
        per_page: "",
        listNum: "",
        searchQuery: "",
        date: new Date("2023-06-31T17:00:00.000Z"),
      },
    };
  },
  mounted() {
    this.$paginateData.current_page = 1;
    this.$getPaginateReport(
      "report/monthly-late-absence-onleave",
      this.filter,
      "loading"
    );
    this.loading = false
  },
};
</script>

<style>
div.box-card {
  border-radius: 30px;
  background: var(--unnamed, #fff);
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25),
    0px 0px 4px 0px rgba(0, 0, 0, 0.1) inset;
}
</style>
