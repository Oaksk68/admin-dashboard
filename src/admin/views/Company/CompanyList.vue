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

    <AccOwnerModal :accOwnerIsOpen="accOwner" :userProfileInfo="userProfileInfo" @showCompanyProfile="showCompanyProfile"
      @closeModal="closeModal">
    </AccOwnerModal>

    <CompanyProfileModal :companyProfileIsOpen="companyProfilePopup" :companyProfileInfo="companyProfileInfo"
      @closeModal="closeModal"></CompanyProfileModal>

    <BaseModal :isOpen="editCompanyPopup" @closeModal="closeModal">
      <template #title>แก้ไขกลุ่มบริษัท</template>
      <template #content>
        <div class="">
          <div>
            <img class="object-fit h-40 w-40 mx-auto" src="@/assets/images/profile.png" alt="" />
          </div>
          <div class="my-10 w-full md:px-8 grid gap-4 text-primary text-sm">
            <form class="">
              <div class="grid gap-3">
                <label for="companyGroup" class="md:w-40 font-medium">{{ $t("companyGroup") }}</label>
                <select class="rounded-lg" name="companyGroup" id="companyGroup" required>
                  <option value="" hidden>เลือกกลุ่มบริษัท</option>
                  <option value="1">Gentech Farm</option>
                  <option value="2">Gentech Soft</option>
                  <option value="3">Gentech Home</option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </template>
    </BaseModal>

    <div>
      <div class="tab inline-block md:px-10 px-8 py-3 font-medium text-sm bg-white text-origin">
        บริษัท
      </div>
    </div>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex items-center gap-4 md:p-0 md:mb-5 p-4">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-2xl md:text-3xl">{{ $t('company_list') }}</h1>
      </div>
      <div
        class="relative grid md:flex flex-wrap gap-2 md:gap-2 md:justify-between items-center p-4 px-14 md:p-0 md:px-0 mb-7">
        <div class="grid items-center gap-3 md:mr-4 md:flex flex-wrap">
          <select class="border w-full md:w-40 p-2.5 text-gray-700 text-sm rounded-xl" name="page" id=""
            @change="$getPaginateNo('companies', filter)" v-model="filter.listNum" required>
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
          <div class="grid gap-3 md:gap-0 md:flex flex-wrap items-center rounded-2xl">
            <button class="p-2.5 border border-[#acafb6] rounded-l-xl hidden md:block duration-300 hover:bg-gray-100">
              <font-awesome-icon icon="fa-solid fa-filter" />
            </button>
            <div>
              <VueDatePicker :format="$format"
                input-class-name="dp-custom-input md:w-36 md:h-[46px] rounded-xl md:rounded-none" v-model="date"
                placeholder="วันที่" :teleport="true" :enable-time-picker="false" />
            </div>
            <div>
              <VueDatePicker :format="$format"
                input-class-name="dp-custom-input md:w-36 md:h-[46px] rounded-xl md:rounded-none" v-model="dateRange"
                placeholder="ช่วงวันที่" :teleport="true" :enable-time-picker="false" />
            </div>
            <!-- @change="$getPaginateNo('devices'). filter"-->
            <select class="h-full w-full md:w-36 md:h-[46px] text-gray-700 text-sm rounded-xl md:rounded-none" name="page"
              id="" v-model="filter.active" required>
              <option value="" selected hidden>ใช้งาน</option>
              <option :value="1">{{ $t('active') }}</option>
              <option :value="2">{{ $t('inactive') }}</option>
            </select>
            <select class="h-full w-full md:w-36 md:h-[46px] text-gray-700 text-sm rounded-xl md:rounded-none" name="page"
              id="open_register_status" v-model.number="filter.open_register_status"
              @change="$getPaginateNo('companies', filter)" required>
              <option value="" selected hidden>{{ $t('open_register') }}</option>
              <option :value="1">{{ $t('open') }}</option>
              <option :value="0">{{ $t('close') }}</option>
            </select>
            <button class="p-2.5 border border-[#acafb6] rounded-r-xl duration-300 hover:bg-gray-100 hidden md:block">
              <font-awesome-icon icon="fa-solid fa-rotate-left" class="text-[#f56666]" />
            </button>
          </div>
          <div class="border p-2.5 rounded-xl duration-300 hover:bg-gray-100 px-2 hidden md:block">
            <img class="w-6 h-6" src="@/assets/images/excel.svg" alt="" />
          </div>
        </div>
        <div class="flex flex-col-reverse gap-2 md:inline-block md:w-1/4">
          <div class="flex justify-end md:hidden gap-2">
            <button class="p-2.5 border rounded-xl px-3 duration-300 hover:bg-gray-100">
              <font-awesome-icon icon="fa-solid fa-rotate-left" class="text-[#f56666]" />
            </button>
            <button class="border rounded-xl duration-300 hover:bg-gray-100 px-2">
              <img class="w-6 h-6" src="@/assets/images/excel.svg" alt="" />
            </button>
          </div>
          <div class="relative">
            <input class="rounded-xl w-full placeholder-muted" type="text" placeholder="ค้นหา"
              v-model.trim="filter.search" @keyup="$getPaginateNo('companies', filter)" />
            <font-awesome-icon class="absolute top-3 right-4 text-muted" icon="fa-solid fa-search" />
          </div>
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
                {{ $t("companyName") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("employee") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("equipment") }}
              </th>
              <th scope="col" class="px-4 py-2 font-medium w-4">
                {{ $t("accountOwner") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium w-4">
                เปิดลงทะเบียน
              </th>
              <th scope="col" class="px-6 py-2 font-medium w-4">ใช้งาน</th>
              <th scope="col" class="px-6 py-2 font-medium w-4">รายงาน</th>
              <th scope="col" class="px-7 py-2 font-medium w-4">
                {{ $t("companyGroup") }}
              </th>
              <th scope="col" class="px-5 py-2 font-medium w-4">
                {{ $t("emailConfirm") }}
              </th>
              <th scope="col" class="py-2 font-medium rounded-r-full">ลบ</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, index) in  filteredList " :key="'company' + index" class="bg-white align-middle">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </th>
              <td class="px-1 py-2 whitespace-nowrap cursor-pointer">
                <div class="flex items-center gap-2">
                  <img class="object-fill h-6 w-6" src="@/assets/images/Gentech_logo.png" alt="" />
                  <router-link :to="{ name: 'CompanyInfo', params: { id: data.id } }" class="text-origin capitalize">
                    {{ data.company_name }}
                  </router-link>
                </div>
              </td>
              <td class="px-1 py-1 whitespace-nowrap cursor-pointer">
                <div @click="viewEmployeeList(data.id)" class="flex justify-center items-center gap-2">
                  <font-awesome-icon icon="fa-solid fa-user-group" />
                  <span class="text-origin">{{ data.employees_count }}</span>
                </div>
              </td>
              <td class="px-1 py-1 whitespace-nowrap cursor-pointer">
                <div class="flex justify-center items-center gap-2">
                  <font-awesome-icon icon="fa-solid fa-mobile-screen-button" size="lg" />
                  <span @click="viewDeviceList(data.id)" class="text-origin">{{
                    data.devices_count
                  }}</span>
                </div>
              </td>
              <td class="px-1 py-1 whitespace-nowrap cursor-pointer">
                <span @click="showAccOwner(data.user_id)" class="text-origin cursor-pointer">{{ data.title }} {{
                  data.firstname }}
                  {{ data.lastname }}</span>
              </td>
              <td>
                <Toggle id="toggle" class="cursor-not-allowed" :value="data.open_register_status" disabled />
              </td>
              <td>
                <Toggle id="toggle" class="toggle-blue" @click="toggleStatus(data.id, data.active)"
                  :value="data.active" />
              </td>
              <td>
                <div class="flex justify-center">
                  <router-link :to="{ name: 'Attendance' }">
                    <div
                      class="shadow-lg border rounded-full p-2 cursor-pointer transition-all duration-200 hover:bg-slate-100">
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path
                          d="M0.936371 11.65H4.45713C4.49767 11.65 4.53054 11.6829 4.53054 11.7234V20.6377C4.53054 20.6782 4.49767 20.7111 4.45713 20.7111H0.936371C0.895829 20.7111 0.862963 20.6782 0.862963 20.6377V11.7234C0.862963 11.6829 0.895829 11.65 0.936371 11.65Z"
                          fill="#028EE6" stroke="#028EE6" stroke-width="1.72593" />
                        <path
                          d="M9.02664 0.862952H12.5474C12.5879 0.862952 12.6208 0.895817 12.6208 0.93636V20.6376C12.6208 20.6782 12.5879 20.711 12.5474 20.711H9.02664C8.9861 20.711 8.95323 20.6782 8.95323 20.6376V0.93636C8.95323 0.895819 8.9861 0.862952 9.02664 0.862952Z"
                          fill="#028EE6" stroke="#028EE6" stroke-width="1.72593" />
                        <path
                          d="M17.1169 8.05424H20.6377C20.6782 8.05424 20.7111 8.0871 20.7111 8.12765V20.6376C20.7111 20.6781 20.6782 20.711 20.6377 20.711H17.1169C17.0764 20.711 17.0435 20.6781 17.0435 20.6376V8.12765C17.0435 8.0871 17.0764 8.05424 17.1169 8.05424Z"
                          fill="#028EE6" stroke="#028EE6" stroke-width="1.72593" />
                      </svg>
                    </div>
                  </router-link>
                </div>
              </td>
              <td>
                <span v-if="!data.companygroup_name == null" @click="companyGroupDetail"
                  class="text-origin cursor-pointer">
                  {{ data.companygroup_name }}
                </span>
                <span class="text-muted" v-else>--</span>
              </td>
              <td>
                <span v-if="!!data.email_verified_at" class="text-[#4caf50]">
                  ยืนยันแล้ว
                </span>
                <span v-else class="text-red-400">ยังไม่ได้ยืนยัน</span>
              </td>
              <td class="px-2 py-4 text-right flex justify-center">
                <div @click="$deleteCompanyList('company', 'companies', data.id)"
                  class="border shadow-lg rounded-full transition-all duration-200 hover:bg-slate-200 cursor-pointer">
                  <img class="w-5 h-5 m-2 object-fit" src="@/assets/images/bin.svg" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- accordion -->
      <div id="accordion" class="block md:hidden">
        <div v-for="( data, index ) in  filteredList " :key="index" class="border-t border-b py-2 pl-8 pr-3">
          <button @click="this.$toggleAccordion(index, 'companies')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`companies-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{ data.company_name }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden" id="content"
            :class="data.open ? 'h-auto ' : 'h-0'">
            <div>
              <h1 class="font-medium">{{ $t("companyName") }}</h1>
              <div class="flex items-center gap-2">
                <div class="w-6">
                  <img class="w-6 h-6" src="@/assets/images/Gentech_logo.png" alt="" srcset="" />
                </div>
                <router-link :to="{ name: 'CompanyInfo', params: { id: data.id } }">
                  <span class="text-origin">{{
                    data.company_name
                  }}</span></router-link>
              </div>
            </div>
            <div>
              <h1 class="">{{ $t("employee") }}</h1>
              <div class="flex items-center gap-2">
                <div class="w-6">
                  <font-awesome-icon icon="fa-solid fa-user-group" size="lg" />
                </div>
                <span @click="viewEmployeeList(data.id)" class="text-origin">{{
                  data.employees_count
                }}</span>
              </div>
            </div>
            <div>
              <h1 class="">{{ $t("equipment") }}</h1>
              <div class="flex items-center gap-2">
                <div class="w-6">
                  <font-awesome-icon icon="fa-solid fa-mobile-screen-button" size="xl" />
                </div>
                <span @click="viewDeviceList(data.id)" class="text-origin">{{
                  data.devices_count
                }}</span>
              </div>
            </div>
            <div>
              <h1 class="">{{ $t("accountOwner") }}</h1>
              <button @click="showAccOwner(data.user_id)" class="text-origin">
                {{ data.title }} {{ data.firstname }} {{ data.lastname }}
              </button>
            </div>
            <div>
              <h1 class="font-medium">เปิดลงทะเบียน</h1>
              <Toggle :value="data.open_register_status"></Toggle>
            </div>
            <div>
              <h1 class="font-medium">สถานะการใช้งาน</h1>
              <Toggle @click="toggleStatus(data.id, data.active)" :value="data.active" />
            </div>
            <div>
              <h1 class="font-medium">สถานะการใช้งาน</h1>
              <router-link :to="{ name: 'Attendance' }">
                <button
                  class="p-2 shadow-lg border rounded-full cursor-pointer transition-all bg-[#F0F8FE] duration-300 hover:bg-slate-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path
                      d="M0.936371 11.65H4.45713C4.49767 11.65 4.53054 11.6829 4.53054 11.7234V20.6377C4.53054 20.6782 4.49767 20.7111 4.45713 20.7111H0.936371C0.895829 20.7111 0.862963 20.6782 0.862963 20.6377V11.7234C0.862963 11.6829 0.895829 11.65 0.936371 11.65Z"
                      fill="#028EE6" stroke="#028EE6" stroke-width="1.72593" />
                    <path
                      d="M9.02664 0.862952H12.5474C12.5879 0.862952 12.6208 0.895817 12.6208 0.93636V20.6376C12.6208 20.6782 12.5879 20.711 12.5474 20.711H9.02664C8.9861 20.711 8.95323 20.6782 8.95323 20.6376V0.93636C8.95323 0.895819 8.9861 0.862952 9.02664 0.862952Z"
                      fill="#028EE6" stroke="#028EE6" stroke-width="1.72593" />
                    <path
                      d="M17.1169 8.05424H20.6377C20.6782 8.05424 20.7111 8.0871 20.7111 8.12765V20.6376C20.7111 20.6781 20.6782 20.711 20.6377 20.711H17.1169C17.0764 20.711 17.0435 20.6781 17.0435 20.6376V8.12765C17.0435 8.0871 17.0764 8.05424 17.1169 8.05424Z"
                      fill="#028EE6" stroke="#028EE6" stroke-width="1.72593" />
                  </svg>
                </button>
              </router-link>
            </div>
            <div>
              <h1 class="font-medium">กลุ่มบริษัท</h1>
              <span @click="companyGroupDetail" class="text-origin">Gentech</span>
            </div>
            <div>
              <h1 class="font-medium">อีเมลยืนยัน</h1>
              <span class="text-[#4caf50]">ยืนยันแล้ว</span>
            </div>
            <div>
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-5">
                <button @click="$deleteCompanyList('company', 'companies', data.id)"
                  class="bg-red-400 shadow-lg p-3 rounded-full">
                  <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4 md:pr-0">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getPaginateNo('devices')" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import Toggle from "@/components/Toggle.vue";
import AccOwnerModal from "@/components/AccOwnerModal.vue";
import CompanyProfileModal from "@/components/CompanyProfileModal.vue";
import BaseModal from "@/components/CustomModal/BaseModal.vue";

export default {
  name: "employeeview",
  components: {
    AccOwnerModal,
    CompanyProfileModal,
    BaseModal,
    Toggle,
  },
  data() {
    return {
      accOwner: false,
      companyProfilePopup: false,
      editCompanyPopup: false,
      loading: true,
      regStatus: true,
      workStatus: true,
      color: "#36A1EA",
      size: "20px",
      page: null,
      last_page: null,
      tableData: [],
      decat: [],
      date: "",
      dateRange: "",
      windowWidth: window.innerWidth,
      userProfileInfo: {},
      companyProfileInfo: {},
      filter: {
        listNum: "",
        search: "",
        open_register_status: "",
        active: "",
      },
      toggleState: {
        status: Boolean,
      }
    };
  },

  methods: {
    companyDetail() {
      this.$emit("CompDetail");
    },

    toggleStatus(id, status) {
      this.loading = true;
      this.toggleState.status = !status;
      this.axios.post("company/update-status/" + id, this.toggleState).then((res) => {
        if (res.data.success) {
          this.$getPaginateNo("companies")
        }
      }).catch(err => {
        console.log(err);
      })
    },

    showCompanyProfile(id) {
      console.log(id);
      this.loading = true;
      this.axios
        .get("company/profile/" + id)
        .then((res) => {
          this.companyProfileInfo = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.companyProfilePopup = true;
          this.accOwner = false;
          this.editCompanyPopup = false;
          this.loading = false
        });

    },

    showAccOwner(id) {
      this.loading = true
      this.axios
        .get("profile/user/" + id)
        .then((res) => {
          this.userProfileInfo = res.data.user;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.accOwner = true;
          this.loading = false;
        });
    },

    companyGroupDetail() {
      this.editCompanyPopup = true;
    },

    closeModal() {
      this.accOwner = false;
      this.editCompanyPopup = false;
      this.companyProfilePopup = false;
    },

    viewEmployeeList(id) {
      this.$router.push({ name: "EmployeeList", params: { id: id } });
    },

    viewDeviceList(id) {
      this.$router.push({ name: "DeviceList", params: { id: id } });
    },
  },

  computed: {
    filteredList() {
      return this.tableData.filter((list) => {
        return list.company_name
          ?.toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },

  mounted() {
    this.$getPaginateNo("companies", this.filter, true);
  },
};
</script>


<style>
.tab {
  border-radius: 17% 46% 0% 10% / 41% 100% 10% 0%;
  transition: all 0.3s ease;
}

.customDatePicker {
  border-radius: 0% !important;
}
</style>
