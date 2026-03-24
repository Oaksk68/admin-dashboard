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
    <div class="bg-white rounded-tr-3xl rounded-b-3xl p-10 pb-5">
      <div class="flex justify-between items-center pb-8">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-3xl">ออกงานก่อนเวลารายเดือน</h1>
        </div>
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
        <div class="grid gap-2 md:flex md:gap-4 mt-5">
          <div class="box-card py-5 md:w-1/2 text-center">
            <h1 class="text-primary text-lg mb-2">เฉลี่ยการเข้างานตรงเวลา</h1>
            <h1 class="text-3xl text-primary font-medium">{{ avgEO }}</h1>
          </div>
          <div class="box-card py-5 md:w-1/2 text-center">
            <h1 class="text-primary text-lg mb-2">คะแนนรวม</h1>
            <h1 class="text-3xl text-primary font-medium">{{ cal_point.totalLeftPoint }}</h1>
          </div>
        </div>
      </div>

      <div class="overflow-auto">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-1 py-2 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-1 py-2 font-medium">
                {{ $t('date') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t('stampoutTime') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t('shiftOut') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t('status') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
                {{ $t('point') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center"></tbody>
        </table>
      </div>


      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getEmployeePaginateNo('emp-leaves', 'leaves')" hideFirstButton
          hideLastButton />
        <h1> หน้า 1 จาก 10</h1>
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
      tableData: "",
      avgEO: '',
      cal_point: '',
    };
  },

  methods: {
  },

  mounted() {
    this.$getEmployeePaginateReport('emp-monthly-early-out-report', this.filter, "loading", 'monthly_EOs')
  }
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
