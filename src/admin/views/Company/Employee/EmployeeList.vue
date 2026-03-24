<template>
  <main class="px-4">
    <BaseModal v-if="screenLoading">
      <template v-slot:container>
        <div class="">
          <pulse-loader :loading="screenLoading" :color="color" :size="size"></pulse-loader>
        </div>
      </template>
    </BaseModal>

    <EmployeeProfileModal :employeeProfile="employeeProfile" :employeeData="employeeData" @closeModal="closeModal">
    </EmployeeProfileModal>

    <div class="py-3 ml-2">
      <h1 class="">
        <Router-Link :to="{ name: 'CompanyList' }" class="text-muted cursor-pointer">{{ $t("company") }} > {{
          $t("employee") }}
        </Router-Link>
      </h1>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="tab bg-white px-10 py-3 inline-block text-origin font-medium">
        พนักงาน
      </h1>
      <div class="hidden md:block">
        <button @click="$router.back()"
          class="shadow h-10 w-40 mr-3 bg-white transition-all duration-300 border border-origin text-origin font-normal rounded-xl hover:bg-origin hover:text-white"
          type="button">
          ย้อนกลับ
        </button>
      </div>
    </div>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex items-center md:p-0 md:mb-5 p-4 gap-4">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-[26px] text-3xl">พนักงานทั้งหมด</h1>
      </div>
      <div class="relative md:flex flex-wrap md:justify-between items-center gap-2 mb-7 px-14 md:p-5 md:py-1">
        <div class="grid md:flex flex-wrap gap-2">
          <select class="border border-slate-300 p-2.5 text-gray-700 text-sm rounded-xl" name="page" id=""
            @change="getPaginateNo" required>
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="30">แสดง 30 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
          <div class="grid gap-2 md:gap-0 md:flex items-center rounded-2xl">
            <button class="p-2.5 border border-slate-300 rounded-l-xl hidden md:block duration-300 hover:bg-gray-100">
              <font-awesome-icon icon="fa-solid fa-filter" />
            </button>
            <div>
              <VueDatePicker :format="$format"
                input-class-name="dp-custom-input md:w-36 md:h-[46px] rounded-xl md:rounded-none"
                v-model="filter.start_date" :teleport="true" :enable-time-picker="false" placeholder="วันที่" />
            </div>
            <div>
              <VueDatePicker :format="$format"
                input-class-name="dp-custom-input md:w-36 md:h-[46px] rounded-xl md:rounded-none"
                v-model="filter.end_date" :teleport="true" :enable-time-picker="false" placeholder="ช่วงวันที่" />
            </div>
            <select class="h-full w-full md:w-36 text-gray-700 text-sm rounded-xl md:rounded-none" name="page" id=""
              @change="getPaginateNo" v-model="filter.listNum" required>
              <option value="" selected hidden>ใช้งาน</option>
              <option value="10">แสดง 10 แถว</option>
              <option value="20">แสดง 20 แถว</option>
              <option value="50">แสดง 50 แถว</option>
              <option value="100">แสดง 100 แถว</option>
            </select>
            <button class="md:p-2.5 border border-slate-300 rounded-r-xl duration-300 hover:bg-gray-100 hidden md:block">
              <font-awesome-icon icon="fa-solid fa-rotate-left" class="text-[#f56666]" />
            </button>
          </div>
        </div>
        <div class="flex md:flex-row flex-col-reverse relative md:items-stretch mt-2 md:mt-0">
          <div class="flex justify-end items-stretch mt-2 md:mt-0 gap-3">
            <div
              class="block md:hidden border border-slate-300 p-3 rounded-lg text-gray-700 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="">
              <font-awesome-icon class="text-lg text-orange-400" icon="fa-solid fa-rotate-left" />
            </div>
            <button class="border border-slate-300 px-2 rounded-lg hover:bg-slate-200 duration-300">
              <img class="w-7 h-7" src="@/assets/images/excel.svg" alt="" />
            </button>
          </div>

          <div class="relative md:ml-4">
            <input class="w-full rounded-xl border-slate-300" type="text" placeholder="ค้นหา" v-model.trim="filter.search"
              @keyup="getPaginateNo" />
            <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
          </div>
        </div>
      </div>

      <!-- table -->
      <div class="overflow-x-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-20 py-2 font-medium">
                {{ $t("name") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("email") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("username") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("phone") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("birthdate") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">ใช้งาน</th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("employeecode") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("shifttime") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("position") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
                {{ $t("department") }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, index) in  filteredList " :key="index" class="bg-white">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </th>
              <td class="px-1 py-2">
                <button @click="showEmployeeProfile(data.id)" class="flex justify-center items-center gap-2">
                  <img class="h-5 w-5 rounded-full" :src="`${$img_path}${data.image}`" alt="" />
                  <span class="text-sky-400 capitalize">{{ data.title }} {{ data.firstname }} {{ data.lastname }}
                  </span>
                </button>
              </td>
              <td class="px-1 py-2 capitalize">{{ data.email }}</td>
              <td class="px-1 py-2 capitalize">
                <span v-if="data.username == null"> -- </span>
                <span v-else>{{ data.username }}</span>
              </td>
              <td class="px-6 py-4 capitalize">
                <span v-if="data.phone == null"> -- </span>
                <span v-else>{{ data.phone }}</span>
              </td>
              <td class="px-1 py-2 capitalize">
                <span v-if="data.birthdate == null"> -- </span>
                <span v-else>{{ data.birthdate }}</span>
              </td>
              <td class="px-6 py-4 text-right flex justify-center">
                <Toggle v-if="!this.loading" class="toggle-blue" :value="data.active" />
              </td>
              <td class="px-1 py-2 capitalize">
                <span v-if="data.employee_code == null"> -- </span>
                <span v-else>{{ data.employee_code }}</span>
              </td>
              <td class="px-1 py-2 capitalize">
                <span v-if="data.shift_name == null"> -- </span>
                <span v-else>{{ data.shift_name }}</span>
              </td>
              <td class="px-1 py-2 capitalize">
                <span v-if="data.position_name == null"> -- </span>
                <span v-else>{{ data.position_name }}</span>
              </td>
              <td class="px-1 py-2 capitalize">
                <span v-if="data.department_name == null"> -- </span>
                <span v-else>{{ data.department_name }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- accordion -->
      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="( data, index ) in  filteredList " :key="index" class="border-t py-2 px-5 pr-3 text-sm"
          id="accordion">
          <button @click="this.$toggleAccordion(index, 'employeeList')"
            class="flex justify-start items-center w-full gap-3">
            <font-awesome-icon :id="`employeeList-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="text-primary capitalize">
              {{ data.title }} {{ data.firstname }} {{ data.lastname }}
            </span>
          </button>
          <div class="grid gap-3  pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            id="content" :class="data.open ? 'h-auto' : 'h-0'">
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("fname") }}</h1>
              <button @click="showEmployeeProfile" class="flex items-center gap-2 text-origin">
                <img class="w-7 h-7 rounded-full" :src="'https://onela.yoursrecord.com/img/user/' + data.image" alt="" />
                {{ data.title }} {{ data.firstname }} {{ data.lastname }}
              </button>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("email") }}</h1>
              <span class="text-h1mute"> {{ data.email }} </span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("username") }}</h1>
              <span class="text-h1mute"> {{ data.username }} </span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("phone") }}</h1>
              <span class="text-h1mute"> {{ data.phone }} </span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("birthdate") }}</h1>
              <span class="text-h1mute">{{ data.birthdate }}</span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">ใช้งาน</h1>
              <Toggle class="toggle-blue" :value="data.active"> {{ data.active }} </Toggle>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("employeecode") }}</h1>
              <span class="text-h1mute"> {{ data.employee_code }} </span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("shifttime") }}</h1>
              <span class="text-h1mute"> {{ data.shift_name }} </span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("position") }}</h1>
              <span class="text-h1mute"> {{ data.position_name }} </span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("department") }}</h1>
              <span class="text-h1mute"> {{ data.department_name }} </span>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="w-full h-full flex justify-center mt-32 mb-32">
        <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4">
        <v-pagination v-model="current_page" :pages="last_page" :range-size="1" active-color=""
          @update:modelValue="getPaginateNo" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import Toggle from "@/components/Toggle.vue";
import EmployeeProfileModal from "@/components/EmployeeProfileModal.vue";

export default {
  name: "Employee List",
  components: {
    Toggle,
    EmployeeProfileModal
  },
  data() {
    return {
      loading: true,
      screenLoading: false,
      useWork: true,
      color: "#36A1EA",
      size: "20px",
      addEmployee: false,
      current_page: 1,
      last_page: null,
      employeeProfile: false,
      tableData: [],
      employeeData: {},
      filter: {
        start_date: "",
        end_date: "",
        search: "",
        listNum: "",
      },
    };
  },
  methods: {
    showEmployeeProfile(id) {
      this.screenLoading = true;
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
          this.screenLoading = false;
        });
    },
    closeModal() {
      this.employeeProfile = false;
    },
    getPaginateNo() {
      this.loading = true;
      this.axios
        .post(
          `company/employees/${this.$route.params.id}?page=${this.current_page}`,
          this.filter
        )
        .then((res) => {
          this.tableData = res.data.employees.data;
          this.current_page = res.data.employees.current_page;
          this.last_page = res.data.employees.last_page;
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
        const fullname = list.firstname + list.lastname;
        return fullname
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
