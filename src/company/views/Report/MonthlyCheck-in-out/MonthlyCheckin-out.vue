<template>
  <main class="md:pl-4 pl-0">
    <teleport to="body">
      <BaseModal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </BaseModal>
    </teleport>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-16 p-10 pb-5">
      <div class="flex mb-10">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-3xl ml-3">การเข้า-ออกงานรายเดือน</h1>
      </div>
      <div class="relative mb-7">
        <div class="md:flex flex-wrap justify-between">
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
          <div class="grid md:flex gap-2 md:items-stretched mt-2 md:mt-0">
            <div class="w-full md:w-auto relative">
              <input
                class="w-full h-full md:w-auto border border-slate-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                type="text" placeholder="ค้นหา" />
              <font-awesome-icon class="absolute right-3 top-3 text-muted" icon="fa-solid fa-search" />
            </div>
            <div class="flex w-full justify-end gap-2">
              <div @click="
                $download('report/export-monthly-intime', 'Monthly in time')
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

      <div class="overflow-auto">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary text-center">
            <tr>
              <th scope="col" class="px-2 py-5 font-medium bg-calendarBg rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-calendarBg">
                {{ $t('name') }}
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-calendarBg">
                วันที่
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-softTeal">
                เวลา <br />
                เข้างาน
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-softTeal">
                ลง{{ $t('name') }} <br />เข้างาน
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-softTeal">
                สถานะ
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-softTeal">
                เข้างาน <br />เช้า/สาย
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-softTeal">
                อุปกรณ์ <br />เข้างาน
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-red-200">
                เวลา <br />ออกงาน
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-red-200">
                ลง{{ $t('name') }} <br />ออกงาน
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-red-200">
                สถานะ
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-red-200">
                ออกงาน <br />เช้า/สาย
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-red-200">
                อุปกรณ์<br />
                ออกงาน
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-calendarBg">
                ระยะเวลา <br />ทำงาน
              </th>
              <th scope="col" class="px-2 py-5 font-medium bg-calendarBg rounded-r-full">
                ลักษณะ <br />เวลา <br />ทำงาน
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(item, index) in tableData" :key="index">
              <td class="px-2 py-5 font-medium bg-red-200">
                {{ item }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getPaginateReport('report/monthly-intime')" hideFirstButton
          hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "Monthly-intime",
  data() {
    return {
      loading: true,
      color: "#36A1EA",
      size: "20px",
      tableData: [],
    };
  },
  mounted() {
    this.$getPaginateReport("report/monthly-intime");
  },
};
</script>

<style scoped>
input,
select {
  padding: 0.5rem;
}
</style>
