<template>
  <main>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl p-10 pb-5">
      <div class="flex justify-between items-center pb-8">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1 bg-origin"></div>
          <h1 class="text-primary text-3xl">รายงานสุขภาพประจำเดือน</h1>
        </div>
      </div>
      <div class="relative mb-7">
        <div class="flex justify-between">
          <div class="flex gap-4">
            <select
              class="border w-56 border-slate-300 text-muted text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="">
              <option value="">แสดง 10 แถว</option>
            </select>
            <select
              class="border border-slate-300 w-40 text-muted text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="">
              <option value="">มกราคม 2023</option>
            </select>
          </div>
        </div>
        <div class="container flex gap-4 mt-5">
          <div class="box-card py-5 w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">จำนวนพนักงานทั้งหมด (คน)</h1>
            <h1 class="text-3xl text-primary font-medium">100</h1>
          </div>
          <div class="box-card py-5 w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">
              ค่าเฉลี่ยอุณหภูมิของการเข้างาน
            </h1>
            <h1 class="text-3xl text-primary font-medium">0 °C</h1>
          </div>
          <div class="box-card py-5 w-1/3 text-center">
            <h1 class="text-primary text-lg mb-2">
              ค่าเฉลี่ยอุณหภูมิของการออกงาน
            </h1>
            <h1 class="text-3xl text-primary font-medium">0 °C</h1>
          </div>
        </div>
      </div>
      <table class="w-full text-sm text-left text-primary">
        <thead class="text-md text-primary bg-calendarBg text-center">
          <tr>
            <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
              {{ $t('no.') }}
            </th>
            <th scope="col" class="px-20 py-2 font-medium">{{ $t('name') }}</th>
            <th scope="col" class="px-20 py-2 font-medium">วันที่</th>
            <th scope="col" class="px-2 py-2 font-medium">ลง{{ $t('name') }}เข้างาน</th>
            <th scope="col" class="px-2 py-2 font-medium">
              อุณหภูมิขณะเข้างาน (°C)
            </th>
            <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
              อุณหภูมิขณะออกงาน (°C)
            </th>
          </tr>
        </thead>
        <tbody class="text-center"></tbody>
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
export default {};
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
