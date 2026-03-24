<template>
  <main class="px-4 mb-8">
    <teleport to="body">
      <BaseModal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </BaseModal>
    </teleport>

    <EmployeeProfileModal :employeeProfile="employeeProfile" :employeeData="employeeData" @closeModal="closeModal">
    </EmployeeProfileModal>

    <div class="py-3 ml-2">
      <h1 class="">
        <Router-Link :to="{ name: 'CompanyList' }" class="text-muted cursor-pointer">พนักงาน > แก้ไขข้อมูล
        </Router-Link>
      </h1>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="tab bg-white px-10 py-3 inline-block text-origin font-medium">
        ข้อมูลพนักงาน
      </h1>
      <div class="hidden md:block">
        <button
          class="shadow h-10 w-40 mr-3 bg-white transition-all duration-300 border border-origin text-origin font-normal rounded-xl hover:bg-origin hover:text-white"
          type="button">
          <router-link :to="{ name: 'CompanyList' }"> ย้อนกลับ </router-link>
        </button>
      </div>
    </div>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center pb-2 md:pb-8">
        <div class="flex items-center gap-4 px-4 py-2">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-2xl md:text-3xl">
            ประวัติ เข้า-ออก งาน
          </h1>
        </div>
      </div>
      <div class="flex flex-col-reverse gap-2 md:block relative items-center mb-7 px-16 md:px-8">
        <div class="grid gap-3 md:flex md:justify-between items-center w-full mb-3">
          <select
            class="md:hidden w-full border border-slate-300 px-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            name="month" id="month" required>
            <option value="" selected hidden>เลือกเดือน</option>
            <option value="1">January</option>
          </select>
          <div class="flex md:flex-row flex-col gap-2 md:gap-3">
            <select
              class="border capitalize border-slate-300 w-full md:w-40 px-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="" required>
              <option value="" selected hidden>ทั้งหมด</option>
              <option value="1">Something</option>
            </select>
            <select @change="$getPaginateNo('attendances', filter)"
              class="border capitalize border-slate-300 w-auto px-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="" v-model="filter.department_id" required>
              <option value="" selected hidden>เลือกแผนก</option>
              <option value="">All</option>
              <option v-for="(item, index) in getAllDepartments" :key="index" :value="item.id">{{
                item.name }}</option>
            </select>
          </div>
          <div
            class="grid md:flex gap-2 text-primary md:flex-row flex-col md:justify-start md:mt-3 lg:mt-0 md:items-center md:gap-0">
            <div class="relative">
              <input class="w-full rounded-xl border-slate-300 placeholder-muted" type="text" placeholder="ค้นหา"
                v-model.trim="filter.search" @keyup="getPaginateNo" />
              <font-awesome-icon class="absolute top-3 right-4 text-muted" icon="fa-solid fa-search" />
            </div>
            <div class="flex md:hidden justify-between gap-3">
              <button @click="today"
                class="w-1/3 shadow border border-origin md:w-20 hover:bg-origin hover:text-white transition-all duration-300 text-origin font-normal py-2 rounded-xl">
                วันนี้
              </button>
              <div class="flex gap-2 items-center">
                <button @click="
                  $download('export-attendances', 'All Employee Attendance')
                  " class="border border-slate-300 rounded-lg p-1 hover:bg-slate-100 duration-300">
                  <img src="@/assets/images/excel.svg" alt="" />
                </button>
                <button class="border border-slate-300 rounded-lg p-2 hover:bg-slate-100 duration-300">
                  <img src="@/assets/images/printer.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:flex justify-between gap-2">
          <select class="w-full md:w-36 border border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg" name="page" id=""
            @change="$getPaginateNo('attendances', filter)" v-model="filter.listNum" required>
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="30">แสดง 30 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>

          <div class="hidden md:flex items-center gap-4">
            <button @click="prev" class="hover:bg-gray-100 py-1 px-3">
              <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </button>
            <div>
              <VueDatePicker v-model="showDate" :enable-time-picker="false" @update:model-value="selectDate">
                <template #trigger>
                  <p class="text-2xl text-primary cursor-pointer"> {{ this.$moment(showDate).format("YYYY MMMM DD") }}</p>
                </template>
              </VueDatePicker>

            </div>
            <button @click="next" class="hover:bg-gray-100 py-1 px-3">
              <font-awesome-icon icon="fa-solid fa-chevron-right" />
            </button>
          </div>
          <div class="hidden md:flex justify-around gap-3">
            <button @click="today"
              class="shadow border border-origin md:w-20 hover:bg-origin hover:text-white transition-all duration-300 text-origin font-normal py-2 rounded-xl">
              วันนี้
            </button>
            <button @click="
              $download('export-attendances', 'All Employee Attendance')
              " class="border border-slate-300 rounded-lg p-1 hover:bg-slate-100 duration-300">
              <img src="@/assets/images/excel.svg" alt="" />
            </button>
            <button class="border border-slate-300 rounded-lg p-2 hover:bg-slate-100 duration-300">
              <img src="@/assets/images/printer.svg" alt="" />
            </button>
          </div>
        </div>
      </div>

      <!-- table -->
      <div class="overflow-x-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary text-center">
            <tr class="bg-calendarBg">
              <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
                {{ $t("no.") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("name") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("shiftInTime") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("stampInTime") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("temperature") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("stampIn") }}<br />
                {{ $t("early") }}/{{ $t("late") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("shiftOutTime") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("stampOutTime") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("temperature") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("stampOut") }}<br />
                {{ $t("early1") }}/{{ $t("late1") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("workDuration") }}
              </th>
              <th เข้างาน scope="col" class="px-2 py-2 font-medium">
                {{ $t("stampInDevice") }}
              </th>
              <th เข้างาน scope="col" class="px-2 py-2 font-medium">
                {{ $t("stampOutDevice") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                ลักษณะ<br />
                เวลาทำงาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
                {{ $t("delete") }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, i) in filteredList" :key="'table' + data.id" class="">
              <td scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++i }}
              </td>
              <td class="px-1 py-2">
                <span @click="showEmployeeProfile(data.employee_id)" class="text-origin cursor-pointer">{{ data.fullname
                }}</span>
              </td>
              <td class="px-2 py-2">
                {{
                  this.$moment(data.shift_start).format("DD/MM/YYYY HH:mm:ss")
                }}
              </td>
              <td class="px-2 py-2">
                {{ this.$moment(data.stamp_in).format("HH:mm:ss") }}
              </td>
              <td class="px-6 py-4">--</td>
              <td class="px-6 py-4">
                <span v-if="data.in_time" class="text-lime-500">{{
                  this.$moment(data.in_time).format("hh:mm:ss")
                }}</span>
                <span v-else-if="data.late_time" class="text-red-500">
                  {{ data.late_time }}
                </span>
              </td>
              <td class="px-6 py-4 capitalize">
                {{ this.$moment(data.shift_end).format("DD/MM/YYYY hh:mm:ss") }}
              </td>
              <td class="px-6 py-4">
                {{ this.$moment(data.stamp_out).format("hh:mm:ss") }}
              </td>
              <td class="px-6 py-4">--</td>
              <td class="px-6 py-4">
                <span v-if="data.before_time" class="text-red-500">{{
                  data.before_time
                }}</span>
                <span v-else-if="data.late_time" class="text-lime-500">{{
                  data.late_time
                }}</span>
              </td>
              <td class="px-6 py-4">
                <p v-if="data.duration == null">--</p>
                <p v-else>{{ data.duration }}</p>
              </td>
              <td class="px-6 py-4 capitalize">
                <p v-if="data.device_in_type == null">--</p>
                <p v-else>{{ data.device_in_type }}</p>
              </td>
              <td class="px-6 py-4 capitalize">
                <p v-if="data.device_out_type == null">--</p>
                <p v-else>{{ data.device_out_type }}</p>
              </td>
              <td class="px-4 py-4 text-center">
                {{ data.shift_name }}
              </td>
              <td class="px-2 py-4 text-center">
                <div
                  class="flex items-center border shadow-lg rounded-full p-2 transition-all duration-200 hover:bg-slate-200 cursor-pointer">
                  <img class="w-5 h-5" src="@/assets/images/bin.svg" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in filteredList" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="this.$toggleAccordion(index, 'department')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`department-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{
              data.fullname
            }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium mb-2">{{ $t("name") }}</h1>
              <span @click="showEmployeeProfile(data.employee_id)" class="text-origin capitalize">
                {{ data.fullname }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("shiftInTime") }}</h1>
              <span class="text-gray-400">
                {{
                  this.$moment(data.shift_start).format("DD/MM/YYYY HH:mm:ss")
                }}
              </span>
            </div>
            <div>
              <h1 class="font-medium">{{ $t("stampInTime") }}</h1>
              <div class="text-gray-400">
                {{ this.$moment(data.stamp_in).format("HH:mm:ss") }}
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("temperature") }}</h1>
              <span v-if="data.in_time" class="">--</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">
                {{ $t("stampIn") }} {{ $t("early") }}/{{ $t("late") }}
              </h1>
              <span v-if="data.in_time" class="text-lime-500">{{
                this.$moment(data.in_time).format("hh:mm:ss")
              }}</span>
              <span v-else-if="data.late_time" class="text-red-500">
                {{ data.late_time }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("shiftOutTime") }}</h1>
              <div class="text-gray-400">
                {{ this.$moment(data.shift_end).format("DD/MM/YYYY hh:mm:ss") }}
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">
                {{ $t("stampOutTime") }}
              </h1>
              <div class="text-gray-400">
                {{ this.$moment(data.stamp_out).format("hh:mm:ss") }}
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">
                {{ $t("temperature") }}
              </h1>
              <div>--</div>
            </div>
            <div>
              <h1 class="font-medium mb-2">
                {{ $t("stampOut") }} {{ $t("early1") }}/{{ $t("late1") }}
              </h1>
              <span v-if="data.before_time" class="text-red-500">{{
                data.before_time
              }}</span>
              <span v-else-if="data.late_time" class="text-lime-500">{{
                data.late_time
              }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">
                {{ $t("workDuration") }}
              </h1>
              <p v-if="data.duration == null">--</p>
              <p v-else class="text-gray-400">{{ data.duration }}</p>
            </div>
            <div>
              <h1 class="font-medium mb-2">
                {{ $t("stampInDevice") }}
              </h1>
              <p v-if="data.device_in_type == null">--</p>
              <p v-else class="text-gray-400">{{ data.device_in_type }}</p>
            </div>
            <div>
              <h1 class="font-medium mb-2">
                {{ $t("stampOutDevice") }}
              </h1>
              <p v-if="data.device_out_type == null">--</p>
              <p v-else class="text-gray-400">{{ data.device_out_type }}</p>
            </div>
            <div>
              <h1 class="font-medium mb-2">ลักษณะ เวลาทำงาน</h1>
              <div class="text-gray-400">{{ data.shift_name }}</div>
            </div>
            <div>
              <h1 class="font-medium mb-2">
                {{ $t("delete") }}
              </h1>
              <div
                class="w-8 h-8 flex justify-center items-center rounded-full bg-red-400 shadow-xl duration-300 hover:bg-red-400/70">
                <font-awesome-icon icon="fa-solid fa-trash" class="text-white hover:text-white/90" size="xl" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4 md:pr-0">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          @update:modelValue="$getPaginateNo('attendances', filter, true)" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EmployeeProfileModal from "@/components/EmployeeProfileModal.vue";


var data = {};

export default {
  name: "Employee Attendance",
  components: {
    EmployeeProfileModal
  },
  data() {
    return {
      popUp: false,
      loading: true,
      color: "#36A1EA",
      size: "20px",
      form: { ...data },
      employeeProfile: false,
      tableData: [],
      dp: this.$store.getters.getAllDepartments,
      showDate: this.$moment().format("MMMM YYYY DD"),
      employeeData: {},
      filter: {
        department_id: "",
        att_status: "",
        date: "",
        search: "",
        listNum: "",
      },
    };
  },
  methods: {
    ...mapActions(["fetchDepartments", "fetchAttStatus"]),

    showEmployeeProfile(id) {
      this.loading = true;
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
          this.loading = false;
        });
    },

    closeModal() {
      this.employeeProfile = false;
    },

    today() {
      this.showDate = this.$moment().format("YYYY MMMM DD");
      this.filter.date = this.$moment(this.showDate).format("YYYY-MM-DD");
      this.$getPaginateNo("attendances", this.filter);
    },

    prev() {
      this.showDate = this.$moment(this.showDate)
        .subtract(1, "days")
        .format("YYYY MMMM DD");
      this.filter.date = this.$moment(this.showDate).format("YYYY-MM-DD")
      this.$getPaginateNo("attendances", this.filter);
    },

    next() {
      this.showDate = this.$moment(this.showDate)
        .add(1, "days")
        .format("YYYY MMMM DD");
      this.filter.date = this.$moment(this.showDate).format("YYYY-MM-DD")
      this.$getPaginateNo("attendances", this.filter);
    },

    selectDate(date) {
      this.filter.date = this.$moment(date).format("YYYY-MM-DD")
      this.$getPaginateNo("attendances", this.filter)
    },

    attConfirm(manual_check_status, stamp) {
      if (manual_check_status === 999) {
        return "--";
      } else if (manual_check_status === 0) {
        return "fa-circle-xmark";
      } else if (stamp) {
        return "fa-circle-check";
      } else {
        return "--";
      }
    },
  },

  computed: {
    ...mapGetters(["getAllDepartments", "getAttStatus"]),
    filteredList() {
      return this.tableData.filter((list) => {
        return list.fullname
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },

  beforeMount() {
    this.$paginateData.current_page = 1;
    this.$paginateData.last_page = null;
    this.$filter.listNum = "";
    this.$filter.searchQuery = "";
  },

  mounted() {
    this.$paginateData.current_page = 1;
    this.$getPaginateNo("attendances", this.filter, true);
    this.fetchDepartments();
    this.fetchAttStatus();
  },
};
</script>

<style scoped>
tbody::before {
  content: "";
  display: block;
  height: 1px;
}
</style>
