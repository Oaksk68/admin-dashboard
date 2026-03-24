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
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-16 p-10 pb-5">
      <div class="flex mb-10">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-3xl ml-3">ออกงานก่อนเวลารายเดือน</h1>
      </div>
      <div class="relative mb-7">
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
            <div class="w-full flex justify-end gap-2">
              <div @click="
                $download(
                  'report/export-monthly-early-out',
                  'Monthly Early Leave'
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
        <div class="container grid gap-2 md:flex md:gap-4 mt-5">
          <div class="box-card py-5 md:w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">จำนวนพนักงานทั้งหมด (คน)</h1>
            <h1 class="text-3xl text-primary font-medium">100</h1>
          </div>
          <div class="box-card py-5 md:w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">เฉลี่ยการเข้างานตรงเวลา</h1>
            <h1 class="text-3xl text-primary font-medium">0 ชั่วโมง 0 นาที</h1>
          </div>
          <div class="box-card py-5 md:w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">จำนวนพนักงานทั้งหมด (คน)</h1>
            <h1 class="text-3xl text-primary font-medium">100</h1>
          </div>
        </div>
      </div>

      <div class="overflow-auto">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">{{ $t('name') }}</th>
              <th scope="col" class="px-2 py-2 font-medium">วันที่</th>
              <th scope="col" class="px-2 py-2 font-medium">เวลาออกงาน</th>
              <th scope="col" class="px-2 py-2 font-medium">ลง{{ $t('name') }}ออกงาน</th>
              <th scope="col" class="px-2 py-2 font-medium">สถานะ</th>
              <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
                คะแนน
              </th>
            </tr>
          </thead>
          <tbody class="text-center"></tbody>
        </table>
      </div>

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
  data() {
    return {
      loading: false,
      color: "#36A1EA",
      size: "20px",
    };
  },
};
</script>

<style scoped>
input,
select {
  padding: 0.5rem;
}

div.box-card {
  border-radius: 30px;
  background: var(--unnamed, #fff);
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25),
    0px 0px 4px 0px rgba(0, 0, 0, 0.1) inset;
}
</style>
