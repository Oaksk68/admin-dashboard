<template>
  <main class="px-4">
    <div class="py-3 ml-2">
      <h1 class="">
        <Router-Link :to="{ name: 'CompanyList' }" class="text-muted cursor-pointer">{{ $t("company") }} > {{
          $t("equipment") }}
        </Router-Link>
      </h1>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="tab bg-white px-10 py-3 inline-block text-origin font-medium">
        อุปกรณ์
      </h1>
      <div class="hidden md:block">
        <button
          class="shadow h-10 w-40 mr-3 bg-white transition-all duration-300 border border-origin text-origin font-normal rounded-xl hover:bg-origin hover:text-white"
          type="button">
          <router-link :to="{ name: 'CompanyList' }"> ย้อนกลับ </router-link>
        </button>
      </div>
    </div>
    <teleport to="body">
      <BaseModal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </BaseModal>
    </teleport>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center p-4 md:mb-3 md:p-0 pb-8">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-2xl md:text-3xl">หมวดหมู่อุปกรณ์</h1>
        </div>
      </div>
      <div class="relative grid md:flex md:justify-between gap-2 md:gap-0 items-center p-4 md:p-0 mb-7 px-14">
        <div class="md:mr-4 md:flex grid gap-2">
          <select
            class="border w-full md:w-36 border-slate-300 p-2.5 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" @change="$getPaginateNo('devices'), filter" v-model="filter.listNum">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
          <div class="grid gap-2 md:gap-0 md:flex items-center">
            <button class="p-2.5 border border-slate-300 rounded-l-xl duration-300 hover:bg-gray-100 hidden md:block">
              <font-awesome-icon icon="fa-solid fa-filter" />
            </button>
            <VueDatePicker :format="$format"
              input-class-name="dp-custom-input md:w-36 md:h-[46px] rounded-xl md:rounded-none" v-model="date"
              placeholder="วันที่" :teleport="true" :enable-time-picker="false" />
            <VueDatePicker :format="$format"
              input-class-name="dp-custom-input md:w-36 md:h-[46px] rounded-xl md:rounded-none" v-model="dateRange"
              placeholder="ช่วงวันที่" :teleport="true" :enable-time-picker="false" />
            <div class="p-2.5 border border-slate-300 rounded-r-xl duration-300 hover:bg-gray-100 hidden md:block">
              <font-awesome-icon icon="fa-solid fa-rotate-left" class="text-[#f56666]" />
            </div>
          </div>
          <button
            class="hidden md:flex items-center px-1.5 border border-slate-300 rounded-xl duration-300 hover:bg-gray-100">
            <img class="object-cover w-7 h-7" src="@/assets/images/excel.svg" alt="" />
          </button>
        </div>

        <div class="relative">
          <input class="rounded-xl border-slate-300 w-full" type="text" placeholder="ค้นหา" v-model.trim="filter.search"
            @keyup="$getPaginateNo('devices', filter)" />
          <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
        </div>

        <div class="flex justify-end gap-2 md:hidden">
          <div class="p-2.5 border border-slate-300 rounded-xl duration-300 hover:bg-gray-100">
            <font-awesome-icon icon="fa-solid fa-rotate-left" size="lg" class="text-[#f56666]" />
          </div>
          <button class="items-center px-1.5 border border-slate-300 rounded-xl duration-300 hover:bg-gray-100">
            <img class="object-cover w-7 h-7" src="@/assets/images/excel.svg" alt="" />
          </button>
        </div>
      </div>

      <!-- table -->
      <div class="overflow-x-auto w-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-4 py-2 font-medium rounded-l-full">
                {{ $t("no.") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("name") }}
              </th>
              <th scope="col" class="px-4 py-2 font-medium">Mac ID</th>
              <th scope="col" class="px-4 py-2 font-medium">
                {{ $t("created") }}
              </th>
              <th scope="col" class="px-4 py-2 font-medium">
                {{ $t("editTime") }}
              </th>
              <th scope="col" class="px-4 py-2 font-medium rounded-r-full">
                {{ $t("status") }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, index) in filteredList" :key="'device' + index">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </th>
              <td class="px-1 py-2 whitespace-nowrap capitalize">
                {{ data.device_name }}
              </td>
              <td class="px-1 py-2 whitespace-nowrap capitalize">
                {{ data.mac_id }}
              </td>
              <td class="px-1 py-2 whitespace-nowrap">
                {{ this.$moment(data.created_at).format("DD/MM/YYYY") }}
              </td>
              <td class="px-1 py-1 whitespace-nowrap">
                {{ this.$moment(data.updated_at).format("DD/MM/YYYY") }}
              </td>
              <td class="px-1 py-2 text-right flex justify-center">
                <Toggle class="toggle-blue" :value="data.is_notify" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- accordion -->
      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in filteredList" :key="'devices' + index" class="border-t py-2 pl-5 pr-3"
          id="accordion">
          <button @click="this.$toggleAccordion(index, 'devices')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`devices-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{
              data.device_name
            }}</span>
          </button>

          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden" id="content"
            :class="data.open ? 'h-auto' : 'h-0'">
            <div>
              <h1 class="font-medium mb-2">{{ $t("name") }}</h1>
              <span class="text-gray-400 capitalize">Warehouse</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">Mac ID</h1>
              <span class="text-gray-400">Linebot</span>
            </div>
            <div>
              <h1 class="font-medium">{{ $t("created") }}</h1>
              <span class="text-muted">01/01/23</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("editDate") }}</h1>
              <span>01/01/23</span>
            </div>
            <div>
              <h1>ใช้งาน</h1>
              <Toggle class="toggle-blue my-2" :value="deviceStatus" />
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4 md:pr-0">
        <v-pagination v-model="current_page" :pages="last_page" :range-size="1" active-color=""
          @update:modelValue="getPaginateNo" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import Toggle from "@/components/Toggle.vue";

export default {
  name: "employeeview",
  components: { Toggle },
  data() {
    return {
      popUp: false,
      loading: true,
      deviceStatus: true,
      color: "#36A1EA",
      size: "20px",
      current_page: 1,
      last_page: "",
      tableData: [],
      date: "",
      dateRange: "",
      decat: [],
      windowWidth: window.innerWidth,
      filter: {
        listNum: "",
        search: "",
      },
    };
  },

  methods: {
    closeModal() {
      this.popUp = false;
    },

    addDevice() {
      this.popUp = true;
    },

    getPaginateNo() {
      this.loading = true;
      this.axios
        .post(
          `company/devices/${this.$route.params.id}?page=${this.current_page}`,
          this.filter
        )
        .then((res) => {
          this.tableData = res.data.devices.data;
          this.current_page = res.data.devices.current_page;
          this.last_page = res.data.devices.last_page;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  computed: {
    filteredList() {
      return this.tableData.filter((list) => {
        return list?.device_name
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },

  mounted() {
    this.getPaginateNo();
  },
};
</script>


<style scoped></style>
