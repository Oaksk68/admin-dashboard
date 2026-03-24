<template>
  <main class="md:px-4 mt-6 my-8">
    <CompanyProfileModal :companyProfileIsOpen="companyProfile" @closeModal="closeModal"
      :companyProfileInfo="companyProfileInfo"></CompanyProfileModal>

    <div>
      <div class="tab inline-block md:px-10 md:p-3 px-6 py-3 font-medium text-xs md:text-sm bg-white text-origin">
        อุปกรณ์
      </div>
    </div>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center p-4 md:p-0 md:mb-5">
        <div class="flex items-center gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-2xl md:text-3xl">อุปกรณ์ทั้งหมด</h1>
        </div>
      </div>
      <div class="relative grid md:flex flex-wrap gap-2 md:justify-between items-center md:p-0 mb-7 px-14">
        <div class="md:mr-4 grid md:flex flex-wrap gap-3">
          <select
            class="border w-full md:w-56 border-slate-300 p-2.5 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" @change="$getPagination('all-devices', 'alldevices', filter)" v-model="filter.listNum">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
          <div class="grid gap-3 md:gap-0 md:flex items-center">
            <div class="hidden md:block p-2.5 border border-slate-300 rounded-l-xl duration-300 hover:bg-gray-100">
              <font-awesome-icon icon="fa-solid fa-filter" />
            </div>
            <VueDatePicker :format="$format"
              input-class-name="dp-custom-input rounded-xl md:rounded-none md:w-32 md:h-[46px]" v-model="date"
              :teleport="true" :enable-time-picker="false" />
            <VueDatePicker :format="$format"
              input-class-name="dp-custom-input rounded-xl md:rounded-none  md:w-32 md:h-[46px]" v-model="dateRange"
              :teleport="true" :enable-time-picker="false" />
            <button class="hidden md:block p-2.5 border border-slate-300 rounded-r-xl duration-300 hover:bg-gray-100">
              <font-awesome-icon icon="fa-solid fa-rotate-left" class="text-[#f56666]" />
            </button>
          </div>
          <button
            class="hidden md:flex border border-slate-300 rounded-xl w-11 items-center justify-center duration-300 hover:bg-gray-100">
            <img class="m-auto w-8 h-8" src="@/assets/images/excel.svg" alt="" />
          </button>
        </div>

        <div class="relative md:w-1/4">
          <input class="rounded-xl border-slate-300 w-full" type="text" placeholder="ค้นหา" v-model.trim="filter.search"
            @keyup="$getPagination('all-devices', 'alldevices', filter)" />
          <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
        </div>

        <div class="flex md:hidden justify-end gap-3">
          <button class="px-3 py-2 md:p-2.5 border border-slate-300 rounded-xl duration-300 hover:bg-gray-100">
            <font-awesome-icon icon="fa-solid fa-rotate-left" class="text-[#f56666]" />
          </button>

          <button
            class="border border-slate-300 rounded-xl w-11 flex items-center justify-center duration-300 hover:bg-gray-100">
            <img class="m-auto w-8 h-8" src="@/assets/images/excel.svg" alt="" />
          </button>
        </div>
      </div>

      <!-- table -->
      <div class="overflow-x-auto w-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-6 py-2 font-medium rounded-l-full">
                {{ $t("no.") }}
              </th>
              <th scope="col" class="px-10 py-2 font-medium">
                {{ $t("company") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("deviceName") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("status") }}
              </th>
              <th scope="col" class="px-4 py-2 font-medium">Mac ID</th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("created") }}
              </th>
              <th scope="col" class="px-4 py-2 font-medium rounded-r-full">
                {{ $t("editTime") }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, index) in tableData" :key="index" class="bg-white text-primary">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </th>
              <td class="px-1 py-2 whitespace-nowrap">
                <div class="text-origin flex items-center gap-2 cursor-pointer"
                  @click="showCompanyProfile(data.company_id)">
                  <img class="object-fill h-6 w-6" src="@/assets/images/Gentech_logo.png" alt="" />
                  {{ data.company_name }}
                </div>
              </td>
              <td class="px-1 py-2 whitespace-nowrap">
                {{ data.device_name }}
              </td>
              <td class="px-1 py-4 whitespace-nowrap">
                <div v-if="data.is_notify" class="flex justify-center items-center gap-2">
                  <div class="bg-lime-400 w-4 h-4 rounded-full"></div>
                  <span class="text-origin">ใช้งาน</span>
                </div>
                <div v-else class="flex justify-center items-center gap-2">
                  <div class="bg-red-400 w-4 h-4 rounded-full"></div>
                  <span class="text-red-400">ใช้งาน</span>
                </div>
              </td>
              <td class="px-1 py-1">{{ data.mac_id }}</td>
              <td class="px-1 py-1">
                {{ this.$moment(data.created_at).format("DD/MM/YYYY") }}
              </td>
              <td class="px-1 py-1">
                {{ this.$moment(data.updated_at).format("DD/MM/YYYY") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in filteredList" :key="'equipment' + index" class="border-t py-2 pl-5 pr-3"
          id="accordion">
          <button @click="this.$toggleAccordion(index, 'equipment')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`equipment-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{
              data.company_name
            }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            id="content" :class="data.open ? 'h-auto ' : 'h-0'">
            <div>
              <h1 class="font-medium mb-2">{{ $t("companyName") }}</h1>
              <div @click="showCompanyProfile(data.company_id)" class="flex items-center">
                <img src="@/assets/images/Gentech_logo.png" class="w-7 h-7" alt="" />
                <span class="text-origin capitalize cursor-pointer">{{
                  data.company_name
                }}</span>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("deviceName") }}</h1>
              <span class="text-gray-400 capitalize">{{
                data.device_name
              }}</span>
            </div>
            <div>
              <h1 class="font-medium">สถานะ</h1>
              <div v-if="data.is_notify" class="flex items-center gap-2">
                <div class="bg-lime-400 w-4 h-4 rounded-full"></div>
                <span class="text-origin">ใช้งาน</span>
              </div>
              <div v-else class="flex items-center gap-2">
                <div class="bg-red-400 w-4 h-4 rounded-full"></div>
                <span class="text-red-400">ใช้งาน</span>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">Mac ID</h1>
              <span class="text-gray-400">
                {{ this.$moment(data.created_at).format("DD/MM/YYYY") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("created") }}</h1>
              <span class="text-gray-400">
                {{ this.$moment(data.updated_at).format("DD/MM/YYYY") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("editTime") }}</h1>
              <span class="text-gray-400">01/01/2023</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4 md:pr-0">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getPagination('all-devices', 'alldevices')" hideFirstButton
          hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import CompanyProfileModal from "@/components/CompanyProfileModal.vue";
import $ from 'jquery';

export default {
  name: "employeeview",
  components: { CompanyProfileModal },
  data() {
    return {
      popUp: false,
      color: "#36A1EA",
      size: "20px",
      page: null,
      last_page: null,
      companyProfile: false,
      allowEmployeeReg: false,
      date: "",
      dateRange: "",
      companyProfileInfo: {},
      tableData: [],
      decat: [],
      windowWidth: window.innerWidth,
      filter: {
        listNum: "",
        search: "",
      },
    };
  },

  methods: {
    showCompanyProfile(id) {
      $('#loader').show();
      this.axios
        .get("company/profile/" + id)
        .then((res) => {
          this.companyProfileInfo = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.companyProfile = true;
          $('#loader').hide();
        });
    },

    closeModal() {
      this.companyProfile = false;
    },
  },

  computed: {
    filteredList() {
      return this.tableData.filter((list) => {
        return list.device_name
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },

  mounted() {
    this.loading = false;
    this.$paginateData.current_page = 1;
    this.$getPagination("all-devices", "alldevices", this.filter, true);
  },
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
.box {
  box-shadow: 3.30726px 3.30726px 12.40223px 0px rgba(0, 0, 0, 0.25),
    0px 0px 3.30726px 0px rgba(0, 0, 0, 0.1) inset;
}
</style>
