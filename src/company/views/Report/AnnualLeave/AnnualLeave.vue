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
    <div class="bg-white rounded-tr-3xl rounded-b-3xl px-5 md:p-16 p-10 pb-5">
      <div class="flex mb-10">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-3xl ml-3">การลาประจำปี</h1>
      </div>
      <div class="relative mb-7">
        <div class="grid md:flex gap-2 md:w-1/3 mb-2 md:mb-4">
          <VueDatePicker :format="$format" class="rounded-xl focus:ring-blue-500 focus:border-blue-500" v-model="date"
            :enable-time-picker="false" />
          <button @click="reset"
            class="hidden md:inline-block shadow border border-origin md:w-28 hover:bg-origin hover:text-white transition-all duration-300 text-origin font-normal py-2 rounded-xl">
            วันนี้
          </button>
        </div>

        <div class="md:flex justify-between">
          <div class="grid gap-2 md:flex md:gap-4">
            <select
              class="border md:w-56 border-slate-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="">
              <option value="">แสดง 10 แถว</option>
            </select>
            <select
              class="border border-slate-300 md:w-40 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="">
              <option value="">{{ $t('department') }}</option>
            </select>
            <select id="default"
              class="md:w-1/4 border border-gray-300 text-primary text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block">
              <option selected>เลือกตำแหน่ง</option>
              <option value="mr">{{ $t("mr") }}</option>
              <option value="mrs">{{ $t("mrs") }}</option>
              <option value="miss">{{ $t("miss") }}</option>
            </select>
            <div
              class="hidden md:flex justify-center items-center p-3 border border-slate-300 rounded-2xl hover:bg-gray-200 duration-300">
              <font-awesome-icon class="text-red-500" icon="fa-solid fa-rotate-left" />
            </div>
          </div>

          <div class="flex flex-col md:flex-row gap-2 items-center mt-2 md:mt-0">
            <div class="relative w-full md:w-auto">
              <input
                class="w-full border border-slate-300 md:w-52 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                type="text" placeholder="ค้นหา" />
              <font-awesome-icon class="absolute right-3 top-3 text-muted" icon="fa-solid fa-search" />
            </div>
            <div class="flex justify-between w-full md:w-auto">
              <button @click="reset"
                class="md:hidden inline shadow border border-origin w-28 hover:bg-origin hover:text-white transition-all duration-300 text-origin font-normal py-2 rounded-xl">
                วันนี้
              </button>
              <div class="flex gap-2">
                <div @click="$download('report/export-onleave', 'Annual Leave')"
                  class="flex justify-center items-center p-1 border border-slate-300 rounded-2xl hover:bg-gray-200 duration-300">
                  <img src="@/assets/images/excel.svg" alt="" />
                </div>
                <div
                  class="flex justify-center items-center p-2 border border-slate-300 rounded-2xl hover:bg-gray-200 duration-300">
                  <img src="@/assets/images/printer.svg" alt="" />
                </div>
                <div
                  class="flex md:hidden justify-center items-center p-3 border border-slate-300 rounded-2xl hover:bg-gray-200 duration-300">
                  <font-awesome-icon class="text-red-500" icon="fa-solid fa-rotate-left" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="overflow-auto">
        <table class="w-full text-sm text-left text-primary border-separate border-spacing-y-1">
          <thead class="text-base text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium text-start">
                พนักงาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium">วันที่</th>
              <th scope="col" class="px-2 py-2 font-medium">ประเภทการลา</th>
              <th scope="col" class="px-2 py-2 font-medium text-start">
                เหตุผล
              </th>
              <th scope="col" class="px-2 py-2 font-medium">เริ่ม</th>
              <th scope="col" class="px-2 py-2 font-medium">สิ้นสุด</th>
              <th scope="col" class="px-2 py-2 font-medium">รวม (วัน)</th>
              <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
                วันที่รับข้อมูล
              </th>
            </tr>
          </thead>
          <tbody class="text-center align-text-top">
            <tr v-for="(item, index) in tableData" :key="index" :class="index % 2 ? 'bg-calendarBg' : 'bg-teal-50'">
              <td scope="col" class="px-2 py-4 rounded-l-lg">{{ ++index }}</td>
              <td scope="col" class="px-2 py-2 font-medium text-start">
                {{ item.fullname }}
              </td>
              <td>
            <tr v-for="(leaveDay, index) in item.onleaves" :key="index">
              <td class="px-2 py-4">
                {{ this.$moment(leaveDay.start).format("DD/MM/YY") }}
              </td>
            </tr>
            </td>
            <td>
              <tr v-for="(leaveDay, index) in item.onleaves" :key="index">
                <td class="px-2 py-4 text-start">
                  {{ leaveDay.onleaveday.onleavetype.type }}
                </td>
              </tr>
            </td>
            <td>
              <tr v-for="(leaveDay, index) in item.onleaves" :key="index">
                <td class="px-2 py-4 text-start">
                  {{ leaveDay.reason }}
                </td>
              </tr>
            </td>
            <td>
              <tr v-for="(leaveDay, index) in item.onleaves" :key="index">
                <td class="px-2 py-4">
                  {{ this.$moment(leaveDay.start).format("DD/MM/YY") }}
                </td>
              </tr>
            </td>
            <td>
              <tr v-for="(leaveDay, index) in item.onleaves" :key="index">
                <td class="px-2 py-4">
                  {{ this.$moment(leaveDay.end).format("DD/MM/YY") }}
                </td>
              </tr>
            </td>
            <td>
              {{ item.onleaves.length }}
            </td>
            <td class="rounded-r-lg">
              <tr v-for="(leaveDay, index) in item.onleaves" :key="index">
                <td class="px-2 py-4">
                  {{ this.$moment(leaveDay.created_at).format("DD/MM/YY") }}
                </td>
              </tr>
            </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getPaginateReport('report/onleave')" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      tableData: [],
      loading: true,
      color: "#36A1EA",
      size: "20px",
    };
  },
  methods: {
    reset() {
      this.date = new Date();
    },
    // async getPaginateNo() {
    //   await this.axios
    //     .post("report/monthly-attendance")
    //     .then((response) => {
    //       this.last_page = response.data.employees.last_page;
    //       // this.filter.listNum = response.data.devices.per_page;
    //       this.page = response.data.employees.current_page;
    //       this.tableData = response.data.employees.data;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
  },
  mounted() {
    this.$paginateData.current_page = 1;
    this.$getPaginateReport("report/onleave");
  },
};
</script>

<style scoped>
input,
select {
  @apply p-2;
}
</style>
