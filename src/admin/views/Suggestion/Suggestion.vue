<template>
  <main class="md:px-4 mt-6">
    <teleport to="body">
      <BaseModal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </BaseModal>
    </teleport>

    <CompanyProfileModal :companyProfileIsOpen="companyProfile" :companyProfileInfo="companyProfileInfo"
      @closeModal="closeModal"></CompanyProfileModal>

    <EmployeeProfileModal :isOpen="employeeProfile" :employeeData="employeeData" @closeModal="closeModal">
    </EmployeeProfileModal>

    <div>
      <div class="tab inline-block md:px-10 px-6 py-3 font-medium text-sm bg-white text-origin">
        คำแนะนำ
      </div>
    </div>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center p-4 md:p-0 md:pb-8 mb-5">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-2xl md:text-3xl">คำแนะนำ</h1>
        </div>
      </div>

      <div class="relative grid md:flex flex-wrap md:justify-between gap-2 items-stretched md:p-0 mb-7 px-14">
        <div class="grid md:mr-4 md:flex flex-wrap gap-2">
          <select
            class="border w-full md:w-56 border-slate-300 p-2.5 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" @change="$getPaginateNo('devices'), filter" v-model="filter.listNum">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>

          <div class="grid md:flex flex-wrap gap-2">
            <div class="flex">
              <div
                class="hidden md:inlinep-2.5 border-r-0 border border-slate-300 rounded-l-xl duration-300 hover:bg-gray-100">
                <font-awesome-icon icon="fa-solid fa-filter" />
              </div>
              <VueDatePicker :format="$format"
                input-class-name="dp-custom-input  md:w-36 h-[46px] rounded-xl md:rounded-r-xl" placeholder="วันที่"
                v-model="date" :teleport="true" :enable-time-picker="false" />
            </div>
            <div class="flex gap-2 items-stretch">
              <button
                class="w-full md:w-auto text-origin border py-2 border-origin px-5 rounded-xl duration-300 hover:bg-origin hover:text-white">
                วันนี้
              </button>
              <button class="hidden md:inline text-origin border border-slate-300 px-2 rounded-xl hover:bg-gray-100">
                <img class="w-6 h-6" src="@/assets/images/excel.svg" alt="" />
              </button>
            </div>
          </div>
        </div>

        <div class="relative md:w-1/4">
          <input class="rounded-xl border-slate-300 w-full" type="text" placeholder="ค้นหา" v-model.trim="filter.search"
            @keyup="$getPaginateNo('feedbacks', filter)" />
          <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
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
                {{ $t("feedback") }}
              </th>
              <th scope="col" class="px-10 py-2 font-medium">
                {{ $t("company") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("employee") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">วันที่ส่ง</th>
              <th scope="col" class="px-4 py-2 font-medium rounded-r-full">
                ลบ
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, index) in filteredList" :key="'feedback' + index" class="bg-white text-primary">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </th>
              <td class="px-1 py-2 whitespace-nowrap">
                {{ data.feedback }}
              </td>
              <td class="px-1 py-2 whitespace-nowrap capitalize">
                <span @click="showCompanyProfile(data.company_id)" class="text-origin cursor-pointer">{{
                  data.company.company_name
                }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span @click="showEmployeeProfile(data.employee_id)" class="text-origin cursor-pointer">{{
                  data.employee.user.username
                }}</span>
              </td>
              <td class="px-1 py-1">
                {{ data.created_at }}
              </td>
              <td class="px-1 py-1 flex justify-center">
                <div @click="$deleteData('feedback', data.id)"
                  class="w-8 h-8 flex justify-center items-center rounded-full bg-white shadow duration-300 cursor-pointer">
                  <svg width="20" height="25" viewBox="0 0 20 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.5 3.33334H18C18.9 3.33334 19.5 3.93334 19.5 4.83334V6.33334H0V4.83334C0 3.93334 0.75 3.33334 1.5 3.33334H6C6.3 1.68334 7.95 0.333344 9.75 0.333344C11.55 0.333344 13.2 1.68334 13.5 3.33334ZM7.5 3.33334H12C11.7 2.43334 10.65 1.83334 9.75 1.83334C8.85 1.83334 7.8 2.43334 7.5 3.33334ZM1.5 7.83334H18L16.65 22.9833C16.65 23.7333 15.9 24.3333 15.15 24.3333H4.35C3.6 24.3333 3 23.7333 2.85 22.9833L1.5 7.83334Z"
                      fill="#F56666" />
                    <rect x="5.11426" y="10.2751" width="1.47906" height="10.3534" rx="0.739528" fill="#D9D9D9" />
                    <rect x="9.18164" y="10.2751" width="1.47906" height="10.3534" rx="0.739528" fill="#D9D9D9" />
                    <rect x="13.248" y="10.2751" width="1.47906" height="10.3534" rx="0.739528" fill="#D9D9D9" />
                  </svg>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in filteredList" :key="'feedback' + index" class="border-t py-2 pl-5 pr-3"
          id="accordion">
          <button @click="this.$toggleAccordion(index, 'feedback')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`feedback-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{
              data.feedback
            }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            id="content" :class="data.open ? 'h-auto ' : 'h-0'">
            <div>
              <h1 class="font-medium mb-2">คำแนะนำ</h1>
              <span class="text-gray-400 capitalize">{{ data.feedback }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("company") }}</h1>
              <span @click="showCompanyProfile" class="text-origin cursor-pointer capitalize">{{ data.company.company_name
              }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("employee") }}</h1>
              <span @click="showEmployeeProfile" class="text-origin cursor-pointer">{{ data.employee.user.username
              }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">วันที่ส่ง</h1>
              <span class="text-gray-400 cursor-pointer capitalize">{{
                data.created_at
              }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">ลบ</h1>
              <div @click="deleteData('feedback', data.id)"
                class="w-8 h-8 flex justify-center items-center rounded-full bg-red-400 shadow-xl duration-300 hover:bg-red-400/70">
                <font-awesome-icon icon="fa-solid fa-trash" class="text-white hover:text-white/90" size="xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4 md:pr-0">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getPaginateNo('feedbacks')" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import CompanyProfileModal from "@/components/CompanyProfileModal.vue";
import EmployeeProfileModal from "@/components/EmployeeProfileModal.vue";
import $ from 'jquery';

export default {
  name: "employeeview",
  components: { CompanyProfileModal, EmployeeProfileModal },
  data() {
    return {
      popUp: false,
      loading: true,
      date: "",
      color: "#36A1EA",
      size: "20px",
      page: null,
      last_page: null,
      companyProfile: false,
      employeeProfile: false,
      tableData: [],
      decat: [],
      windowWidth: window.innerWidth,
      companyProfileInfo: {},
      employeeData: {},
      filter: {
        listNum: "",
        search: "",
      },
    };
  },
  methods: {
    showCompanyProfile(id) {
      this.loading = true
      this.axios.get('company/profile/' + id).then((res) => {
        this.companyProfileInfo = res.data.data;
        console.log(res);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        this.loading = false;
        this.companyProfile = true;
      })
    },
    showEmployeeProfile(id) {
      $('#loader').show()
      this.axios
        .get("company/employee/" + id)
        .then((res) => {
          this.employeeData = res.data.employee;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.employeeProfile = true;
          // $('#loader').hide()
        });
    },
    closeModal() {
      this.companyProfile = false;
      this.employeeProfile = false;
    },
  },
  computed: {
    filteredList() {
      return this.tableData.filter((list) => {
        return list.company.company_name
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },
  mounted() {
    this.loading = false;
    this.$paginateData.current_page = 1;
    this.$getPaginateNo("feedbacks", this.filter, true);
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
