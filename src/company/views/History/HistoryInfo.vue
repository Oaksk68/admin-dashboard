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

    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center pb-2 md:pb-8">
        <div class="flex items-center gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-[30px] font-medium">{{ $t('attendance_history') }}</h1>
        </div>
      </div>
      <div class="relative items-center mb-7 px-8">
        <div class="flex md:flex-row flex-col-reverse gap-2 my-4 md:w-1/3">
          <VueDatePicker :format="this.$format" :teleport="true"
            class="rounded-xl focus:ring-blue-500 focus:border-blue-500" v-model="filter.date" :enable-time-picker="false"
            @update:model-value="$getPaginateNo('attendances', this.filter)" />
          <button @click="reset"
            class="shadow border border-origin md:w-28 hover:bg-origin hover:text-white transition-all duration-300 text-origin font-normal py-2 rounded-xl">
            วันนี้
          </button>
        </div>

        <div class="lg:flex md:block gap-3 lg:justify-center lg:items-center">
          <div class="flex md:flex-row flex-col gap-2 md:gap-3">
            <select
              class="border border-slate-300 w-full md:w-40 px-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="" v-model="filter.listNum" @change="$getPaginateNo('attendances', filter)">
              <option value="" selected hidden>แสดง 10 แถว</option>
              <option value="10">แสดง 10 แถว</option>
              <option value="20">แสดง 20 แถว</option>
              <option value="30">แสดง 30 แถว</option>
            </select>

            <select @change="$getPaginateNo('attendances', filter)"
              class="border capitalize border-slate-300 w-full md:w-40 px-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="" v-model="filter.department_id">
              <option value="" selected>{{ $t('department') }}</option>
              <option v-for="department in getAllDepartments" :key="department.id" :value="department.id"
                class="capitalize">
                {{ department.name }}
              </option>
            </select>
            <select
              class="border border-slate-300 w-auto px-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="" v-model="filter.att_status" @change="$getPaginateNo('attendances', filter)">
              <option value="" selected hidden>สถานะการเข้าออกงาน</option>
              <option v-for="attStatus in getAttStatus" :key="attStatus.id" :value="attStatus.id">
                {{ attStatus.name }}
              </option>
            </select>
          </div>
          <div
            class="flex md:flex-row flex-col md:justify-start md:mt-3 lg:mt-0 md:items-center w-full mt-2 gap-2 md:gap-0">
            <div class="relative">
              <input class="w-full rounded-xl border-slate-300" type="text" placeholder="ค้นหา"
                v-model.trim="filter.search" @keyup="getPaginateNo" />
              <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
            </div>
            <div class="flex justify-end">
              <div @click="
                $download('export-attendances', 'All Employee Attendance')
                " class="border border-slate-300 rounded-lg ml-4 p-1 hover:bg-slate-100 duration-300">
                <img src="@/assets/images/excel.svg" alt="" />
              </div>
              <div class="border border-slate-300 rounded-lg ml-4 p-2 hover:bg-slate-100 duration-300">
                <img src="@/assets/images/printer.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- table -->
      <div class="overflow-x-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary text-center">
            <tr>
              <th scope="col" class="px-2 py-2 font-medium bg-calendarBg rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-calendarBg">
                {{ $t('name') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-softTeal">
                {{ $t('shift_time') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-softTeal">
                ลง{{ $t('name') }}<br />
                เข้างาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-softTeal">
                {{ $t('status') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-softTeal">
                เข้างาน<br />
                เช้า/สาย
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-softTeal">
                อุปกรณ์<br />
                เข้างาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200">
                เวลา <br />ออกงาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200">
                ลง{{ $t('name') }}<br />
                ออกงาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200">
                สถานะ
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200">
                ออกงาน<br />
                เช้า/สาย
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-red-200">
                อุปกรณ์<br />
                ออกงาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-calendarBg">
                ระยะเวลา<br />
                ทำงาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-calendarBg rounded-r-full">
                ลักษณะ<br />
                เวลาทำงาน
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, i) in filteredList" :key="'table' + data.id" class="">
              <td scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++i }}
              </td>
              <td class="px-1 py-2">{{ data.fullname }}</td>
              <td class="px-2 py-2 bg-softTeal">
                {{ this.$moment(data.shift_start).format("HH:mm:ss") }}
              </td>
              <td class="px-2 py-2 bg-softTeal">
                {{ this.$moment(data.stamp_in).format("HH:mm:ss") }}
              </td>
              <td class="px-6 py-4 bg-softTeal">
                <div>
                  <p v-if="attConfirm(data.manual_checkout_status, data.stamp_out) ==
                    '--'
                    ">
                    --
                  </p>
                  <font-awesome-icon v-else class="fa-solid w-6 h-6" :icon="attConfirm(data.manual_checkin_status, data.stamp_in)
                    " :class="attConfirm(data.manual_checkin_status, data.stamp_in) ==
    'fa-circle-check'
    ? 'text-lime-400'
    : 'text-red-500'
    "></font-awesome-icon>
                </div>
              </td>
              <td class="px-6 py-4 bg-softTeal">
                <span v-if="data.in_time" class="text-lime-500">{{
                  this.$moment(data.in_time).format("hh:mm:ss")
                }}</span>
                <span v-else-if="data.late_time" class="text-red-500">
                  {{ data.late_time }}
                </span>
              </td>
              <td class="px-6 py-4 capitalize bg-softTeal">
                {{ data.device_in_type }}
              </td>
              <td class="px-6 py-4 bg-red-200">
                {{ this.$moment(data.shift_end).format("hh:mm:ss") }}
              </td>
              <td class="px-6 py-4 bg-red-200">
                <p v-if="data.stamp_out == null">--</p>
                <p v-else>
                  {{ this.$moment(data.stamp_out).format("hh:mm:ss") }}
                </p>
              </td>
              <td class="px-6 py-4 bg-red-200">
                <div>
                  <p v-if="attConfirm(data.manual_checkout_status, data.stamp_out) ==
                    '--'
                    ">
                    --
                  </p>
                  <font-awesome-icon v-else class="fa-solid w-6 h-6" :icon="attConfirm(data.manual_checkout_status, data.stamp_out)
                    " :class="attConfirm(data.manual_checkout_status, data.stamp_out) ==
    'fa-circle-check'
    ? 'text-lime-400'
    : 'text-red-500'
    "></font-awesome-icon>
                </div>
              </td>
              <td class="px-6 py-4 bg-red-200">
                <span v-if="data.before_time" class="text-red-500">{{
                  data.before_time
                }}</span>
                <span v-else-if="data.late_time" class="text-lime-500">{{
                  data.late_time
                }}</span>
              </td>
              <td class="px-6 py-4 bg-red-200 capitalize">
                <p v-if="data.device_out_type == null">--</p>
                <p v-else>{{ data.device_out_type }}</p>
              </td>
              <td class="px-6 py-4">
                <p v-if="data.duration == null">--</p>
                <p v-else>{{ data.duration }}</p>
              </td>
              <td class="px-4 py-4 text-right flex justify-center">
                {{ data.reason }}
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
              <h1 class="font-medium mb-2">{{ $t('name') }}</h1>
              <span class="text-gray-400 capitalize">
                {{ this.$moment(data.shift_start).format("HH:mm:ss") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">เวลาเข้างาน</h1>
              <span class="text-gray-400">
                {{ this.$moment(data.stamp_in).format("HH:mm:ss") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium">ลง{{ $t('name') }}เข้างาน</h1>
              <div>
                <p v-if="attConfirm(data.manual_checkout_status, data.stamp_out) ==
                  '--'
                  ">
                  --
                </p>
                <font-awesome-icon v-else class="fa-solid w-6 h-6"
                  :icon="attConfirm(data.manual_checkin_status, data.stamp_in)" :class="attConfirm(data.manual_checkin_status, data.stamp_in) ==
                    'fa-circle-check'
                    ? 'text-lime-400'
                    : 'text-red-500'
                    "></font-awesome-icon>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">สถานะ</h1>
              <span v-if="data.in_time" class="text-lime-500">{{
                this.$moment(data.in_time).format("hh:mm:ss")
              }}</span>
              <span v-else-if="data.late_time" class="text-red-500">
                {{ data.late_time }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">เข้างานเช้า/สาย</h1>
              <span>{{ data.device_in_type }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">อุปกรณ์เข้างาน</h1>
              <span>
                {{ this.$moment(data.shift_end).format("hh:mm:ss") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">เวลาออกงาน</h1>
              <div>
                <p v-if="data.stamp_out == null">--</p>
                <p v-else>
                  {{ this.$moment(data.stamp_out).format("hh:mm:ss") }}
                </p>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">ลง{{ $t('name') }}ออกงาน</h1>
              <div>
                <p v-if="attConfirm(data.manual_checkout_status, data.stamp_out) ==
                  '--'
                  ">
                  --
                </p>
                <font-awesome-icon v-else class="fa-solid w-6 h-6" :icon="attConfirm(data.manual_checkout_status, data.stamp_out)
                  " :class="attConfirm(data.manual_checkout_status, data.stamp_out) ==
    'fa-circle-check'
    ? 'text-lime-400'
    : 'text-red-500'
    "></font-awesome-icon>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">สถานะ</h1>
              <span v-if="data.before_time" class="text-red-500">{{
                data.before_time
              }}</span>
              <span v-else-if="data.late_time" class="text-lime-500">{{
                data.late_time
              }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">ออกงานเช้า/สาย</h1>
              <p v-if="data.device_out_type == null">--</p>
              <p v-else>{{ data.device_out_type }}</p>
            </div>
            <div>
              <h1 class="font-medium mb-2">อุปกรณ์ออกงาน</h1>
              <p v-if="data.duration == null">--</p>
              <p v-else>{{ data.duration }}</p>
            </div>
            <div>
              <h1 class="font-medium mb-2">ระยะเวลาทำงาน</h1>
              <span>{{ data.reason }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">ลักษณะเวลาทำงาน</h1>
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

var data = {};

export default {
  name: "Employment History",
  data() {
    return {
      popUp: false,
      loading: true,
      color: "#36A1EA",
      size: "20px",
      form: { ...data },
      tableData: [],
      dp: this.$store.getters.getAllDepartments,
      format: "dd-MM-yyyy",
      filter: {
        department_id: "",
        att_status: "",
        date: new Date("07-03-2023"),
        search: "",
        listNum: "",
      },
    };
  },
  methods: {
    ...mapActions(["fetchDepartments", "fetchAttStatus"]),

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
