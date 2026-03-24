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
    <div class="bg-white rounded-tr-3xl rounded-b-3xl px-5 md:p-10 pb-5">
      <div class="flex items-center gap-3 py-8">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-3xl">การลาประจำปี</h1>
        <VueDatePicker class="w-20" v-model="showYear" @open="caretOpen" @closed="caretClose" year-picker>
          <template #trigger>
            <button class="flex items-center gap-3">
              <span class="text-3xl text-primary">{{
                this.$moment(showYear).format("YYYY")
              }}</span>
              <font-awesome-icon id="caret" icon="fa-solid fa-caret-down" class="text-primary" />
            </button>
          </template>
        </VueDatePicker>
      </div>
      <div class="grid md:flex md:justify-between md:items-center mb-5 px-10 md:px-0">
        <div class="grid md:flex flex-wrap gap-3">
          <select class="md:w-48 rounded-xl" name="" id="" required v-model="filter.listNum"
            @change="$getPaginateReport('emp-onleave-reports', this.filter, '', 'leaves')">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="30">แสดง 30 แถว</option>
            <option value="50">แสดง 50 แถว</option>
          </select>

          <div class="flex mb-3 md:mb-0">
            <div
              class="hidden md:flex items-center justify-center border border-slate-300 rounded-l-xl px-2 duration-200 hover:bg-gray-100">
              <font-awesome-icon icon="fa-solid fa-filter" class="text-primary"></font-awesome-icon>
            </div>
            <VueDatePicker class="md:w-48" input-class-name="rounded-xl md:rounded-l-none" v-model="filter.date"
              @update:modelValue="$getPaginateReport('emp-onleave-reports', this.filter, true, 'leaves')"
              placeholder="วันที่"></VueDatePicker>
          </div>
          <div
            class="hidden md:flex items-center justify-center border border-slate-300 rounded-xl w-11 duration-200 hover:bg-gray-100">
            <img src="@/assets/images/excel.svg" alt="" />
          </div>
          <div
            class="hidden md:flex items-center justify-center border border-slate-300 rounded-xl w-11 duration-200 hover:bg-gray-100">
            <img src="@/assets/images/printer.svg" alt="" />
          </div>
        </div>
        <div class="relative mb-3">
          <input class="w-full md:w-56 rounded-xl placeholder:text-slate-300" type="text" placeholder="ค้นหา" />
          <font-awesome-icon class="text-slate-300 absolute right-3 top-3" icon="fa-solid fa-search" />
        </div>
        <div class="flex justify-end items-stretched gap-3 md:hidden">
          <div
            class="flex items-center justify-center border h-11 border-slate-300 rounded-xl w-11 duration-200 hover:bg-gray-100">
            <img src="@/assets/images/excel.svg" alt="" />
          </div>
          <div
            class="flex items-center justify-center border h-11 border-slate-300 rounded-xl w-11 duration-200 hover:bg-gray-100">
            <img src="@/assets/images/printer.svg" alt="" />
          </div>
        </div>
      </div>

      <div class="overflow-auto hidden md:block">
        <table class="w-full text-left text-primary border-separate border-spacing-y-1">
          <thead class="text-base text-primary bg-calendarBg text-center">
            <tr class="text-sm font-semibold">
              <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
                {{ $t("no.") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("date") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("leavetype") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("reason") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("start") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("end") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                รวม (วัน)
              </th>
              <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
                วันที่รับข้อมูล
              </th>
            </tr>
          </thead>
          <tbody class="text-center align-text-top">
            <tr v-for="(data, index) in tableData" :key="index" class="text-sm">
              <td scope="col" class="px-2 py-4 rounded-l-lg font-medium">{{ ++index }}</td>
              <td scope="col" class="px-2 py-2">
                {{ this.$moment(data.start).format("DD/MM/YYYY") }}
              </td>
              <td class="px-2 py-2">
                {{ leaveType(data.onleaveday.onleavetype.name) }}
              </td>
              <td class="px-2 py-2">
                {{ data.reason }}
              </td>
              <td class="px-2 py-2">
                {{ this.$moment(data.start).format("HH:mm") }}
              </td>
              <td class="px-2 py-2">
                {{ this.$moment(data.end).format("HH:mm") }}
              </td>
              <td class="px-2 py-2">
                {{ data.time }}
              </td>
              <td class="rounded-r-lg">
                {{ this.$moment(data.updated_at).format("DD/MM/YYYY") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in tableData" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="this.$toggleAccordion(index, 'reqLeave')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`reqLeave-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">
              {{ this.$moment(data.start).format("DD/MM/YYYY") }}
            </span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ this.$moment(data.start).format("DD/MM/YYYY") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("date") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ leaveType(data.onleaveday.onleavetype.name) }}

              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("leavename") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ data.reason }}

              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("reason") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ this.$moment(data.start).format("HH:mm") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("start") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ this.$moment(data.end).format("HH:mm") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("end") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ data.time }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("totalDay") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ this.$moment(data.updated_at).format("DD/MM/YYYY") }}
              </span>
            </div>

          </div>
        </div>
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
      showYear: this.$moment().format("YYYY"),
      filter: {
        listNum: '',
        search: '',
        date: '',
      }
    };
  },
  methods: {
    reset() {
      this.date = new Date();
    },

    leaveType(leaveName) {
      const words = leaveName.split(' ');
      const filteredWords = words.filter(word => !word.includes("requests"));
      let newString = filteredWords.join(' ');
      return newString.charAt(0).toUpperCase() + newString.slice(1);
    },


    caretOpen() {
      const caret = document.getElementById("caret");
      caret.classList.add("caretOpen");
    },

    caretClose() {
      const caret = document.getElementById("caret");
      caret.classList.remove("caretOpen");
    },
  },
  mounted() {
    this.$paginateData.current_page = 1;
    this.$getEmployeePaginateReport("emp-onleave-reports", this.filter, true, "leaves");
  },
};
</script>

<style scoped>
input,
select {
  @apply p-2;
}

.caretOpen {
  transform: rotate(180deg);
}
</style>
