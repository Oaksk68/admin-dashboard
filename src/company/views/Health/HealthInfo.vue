<template>
  <main>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl p-10 pb-5">
      <div class="flex justify-between items-center pb-8">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1 bg-origin"></div>
          <h1 class="text-primary text-3xl">ประวัติการเข้างาน</h1>
        </div>
      </div>
      <div class="relative items-center mb-7">
        <div class="flex gap-5 items-center my-4">
          <div class="flex gap-2">
            <VueDatePicker :format="$format" class="rounded-xl focus:ring-blue-500 focus:border-blue-500" v-model="date"
              :enable-time-picker="false" />
            <button @click="reset"
              class="shadow border border-origin w-28 hover:bg-origin hover:text-white transition-all duration-300 text-origin font-normal py-2 rounded-xl">
              วันนี้
            </button>
          </div>

          <h3 class="text-lg">อุณหภูมิที่จะแจ้งเตือน เท่ากับหรือมากกว่า</h3>
          <h1 class="text-4xl">0℃</h1>
          <div class="p-3 shadow-xl border border-slate-300 rounded-full hover:bg-gray-100 duration-300">
            <img src="@/assets/images/editblack.svg" alt="" />
          </div>
        </div>

        <div class="flex gap-3">
          <select
            class="border border-slate-300 w-40 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            name="page" id="">
            <option value="">แสดง 5 แถว</option>
          </select>
          <select
            class="border border-slate-300 w-40 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            name="page" id="">
            <option value="">{{ $t('department') }}</option>
          </select>

          <div class="flex justify-end w-full">
            <div class="border border-slate-300 rounded-lg ml-4 p-1 hover:bg-slate-100 duration-300">
              <img src="@/assets/images/excel.svg" alt="" />
            </div>
            <div class="border border-slate-300 rounded-lg ml-4 p-2 hover:bg-slate-100 duration-300">
              <img src="@/assets/images/printer.svg" alt="" />
            </div>
          </div>
        </div>
      </div>

      <table class="w-full text-sm text-left text-primary">
        <thead class="text-md text-primary text-center bg-calendarBg">
          <tr>
            <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
              {{ $t('no.') }}
            </th>
            <th scope="col" class="px-10 py-2 font-medium">{{ $t('name') }}</th>
            <th scope="col" class="px-2 py-2 font-medium">ลง{{ $t('name') }}เข้างาน</th>
            <th scope="col" class="px-2 py-2 font-medium">
              อุณหภูมิขณะเข้างาน (℃)
            </th>
            <th scope="col" class="px-2 py-2 font-medium">ลง{{ $t('name') }}อกงาน</th>
            <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
              อุณหภูมิขณะออกงาน (℃)
            </th>
          </tr>
        </thead>
        <tbody class="text-center">
          <!-- <tr class="bg-white">
            <th
              scope="row"
              class="px-1 py-2 font-medium text-primary whitespace-nowrap"
            >
              1
            </th>
            <td class="px-1 py-2">สแกนใบหน้า</td>
            <td class="px-1 py-2">000001</td>
            <td class="px-6 py-4">
              <div class="flex justify-center">
                <div class="bg-red-500 rounded-full h-4 w-4"></div>
                <div class="bg-lime-400 rounded-full hidden h-4 w-4"></div>
              </div>
            </td>
            <td class="px-6 py-4">
              <img src="@/assets/images/tick.svg" alt="" />
            </td>
            <td class="px-6 py-4">
              <img src="@/assets/images/tick.svg" alt="" />
            </td>
            <td class="px-6 py-4">
              <img src="@/assets/images/tick.svg" alt="" />
            </td>
            <td class="px-6 py-4">
              <img src="@/assets/images/tick.svg" alt="" />
            </td>
            <td class="px-6 py-4">
              <img src="@/assets/images/tick.svg" alt="" />
            </td>
            <td class="px-6 py-4">
              <img src="@/assets/images/tick.svg" alt="" />
            </td>
            <td class="px-6 py-4">
              <img src="@/assets/images/tick.svg" alt="" />
            </td>
            <td class="px-4 py-4 text-right flex justify-center">
              <div
                @click="editDepartment = true"
                class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200"
              >
                <img src="@/assets/images/editblack.svg" alt="" />
              </div>
              <div
                class="flex items-center border-2 shadow-lg rounded-r-large px-3 py-1 transition-all duration-200 hover:bg-slate-200"
              >
                <img src="@/assets/images/bin.svg" alt="" />
              </div>
            </td>
          </tr> -->
        </tbody>
      </table>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5">
        <div class="inline-flex items-center bg-calendarBg rounded-3xl px-1 py-0.5">
          <img src="@/assets/images/left.svg" alt="" />
          <span class="px-4">1</span>
          <img src="@/assets/images/right.svg" alt="" />
        </div>
        หน้า 1 จาก 10
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "employeeview",
  data() {
    return {
      date: new Date(),
    };
  },
  methods: {
    reset() {
      this.date = new Date();
    },
  },
};
</script>

<style scoped></style>
