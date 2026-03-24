<template>
  <main class="mb-8 md:pl-4 pl-0">
    <teleport to='body'>
      <BaseModal :isOpen="addAttendanceModal" @closeModal="closeModal" :classList="'w-full md:w-[60vw] z-[1035]'">
        <template #title>เพิ่มเวลาเข้าออกงาน</template>
        <template #container>
          <form @submit.prevent="">
            <div class="grid gap-3 md:px-14 px-5 py-8 md:py-0">
              <span>เวลา : {{ this.$moment().format("DD/MM/YYYY hh:mm A") }}</span>
              <div class="grid gap-2">
                <label for="reason">เหตุผล</label>
                <textarea
                  class="border-gray-200 rounded-xl placeholder-gray-400/80 focus:outline-none focus:bg-white focus:border-sky-500"
                  name="reason" id="reason" cols="30" rows="10" placeholder="ใส่เหตุผล"></textarea>
              </div>
            </div>
            <div class="flex flex-col md:flex-row justify-center md:items-center gap-5 my-10">
              <button type="button" @click="closeModal"
                class="border border-red-500 px-10 py-2 rounded-xl text-red-500 md:w-1/4 hover:bg-red-500 hover:text-white duration-300 ease-out">{{
                  $t('cancel') }}</button>
              <button type="submit"
                class="border bg-origin px-10 py-2 rounded-xl text-white md:w-1/4 hover:bg-origin/60 duration-300">{{
                  $t('save') }}</button>
            </div>
          </form>
        </template>
        <template #footer>
          <div>
          </div>
        </template>
      </BaseModal>
    </teleport>

    <div class="relative bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex items-center gap-3 p-8 md:p-0 md:mb-10">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-3xl">ประวัติการเข้างาน</h1>
        <div @click="addAttendance"
          class="absolute right-10 rounded-full border border-gray-200 bg-chooser p-1.5 cursor-pointer duration-200 hover:bg-calendarBg/90">
          <img src="@/assets/images/add.svg" alt="">
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
            <select class="w-full md:w-36 border border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg" name="page"
              id="" v-model="filter.listNum" @change="$getPaginateNo('emp-attendances', 'attendances', filter)" required>
              <option value="" selected hidden>แสดง 10 แถว</option>
              <option value="10">แสดง 10 แถว</option>
              <option value="20">แสดง 20 แถว</option>
              <option value="30">แสดง 30 แถว</option>
              <option value="50">แสดง 50 แถว</option>
            </select>
          </div>
          <div
            class="grid md:flex gap-2 text-primary md:flex-row flex-col md:justify-start md:mt-3 lg:mt-0 md:items-center md:gap-0">
            <div class="relative">
              <input class="w-full rounded-xl border-slate-300 placeholder-muted" type="text" placeholder="ค้นหา"
                v-model.trim="filter.search" @keyup="$getPaginateNo('emp-attendances', 'attendances', filter)" />
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
          <select
            class="border capitalize border-slate-300 w-full md:w-40 px-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" required>
            <option value="" selected hidden>ทั้งหมด</option>
            <option value="1">ทั้งหมด</option>
            <option value="2">เข้างาน เช้า</option>
            <option value="3">เข้างาน ตรงเวลา</option>
            <option value="4">เข้างาน สาย</option>
            <option value="5">ออกงาน เร็ว</option>
            <option value="6">ออกงาน ช้า</option>
            <option value="7">ออกงาน ตรงเวลา</option>
          </select>
          <div class="hidden md:flex items-center gap-4">
            <button @click="prev" class="hover:bg-gray-100 py-1 px-3">
              <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </button>
            <div>
              <VueDatePicker v-model="showDate" model-type="MMMM-yyyy" @update:modelValue="datePicked" month-picker
                :enable-time-picker="false">
                <template #trigger>
                  <span class="text-primary font-medium text-xl">
                    {{ this.$moment(showDate).format("MMMM YYYY") }}
                  </span>
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
            <tr>
              <th scope="col" class="px-2 py-2 font-medium bg-calendarBg rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-calendarBg">
                เวลา <br />
                เข้างาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-calendarBg">
                ลง{{ $t('name') }}<br />
                เข้างาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-calendarBg">
                สถานะ
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-calendarBg">
                เข้างาน<br />
                เช้า/สาย
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-calendarBg">
                อุปกรณ์<br />
                เข้างาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-[#FCF1E7]">
                เวลา <br />ออกงาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-[#FCF1E7]">
                ลง{{ $t('name') }}<br />
                ออกงาน
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-[#FCF1E7]">
                สถานะ
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-[#FCF1E7]">
                ออกงาน<br />
                เช้า/สาย
              </th>
              <th scope="col" class="px-2 py-2 font-medium bg-[#FCF1E7]">
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
            <tr v-for="(data, i) in tableData" :key="'table' + data.id" class="">
              <td scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++i }}
              </td>
              <td class="px-2 py-2 ">
                {{ this.$moment(data.shift_start).format('HH:mm:ss') }}
              </td>
              <td class="px-2 py-2 ">
                {{ this.$moment(data.stamp_in).format('HH:mm:ss') }}
              </td>
              <td class="px-6 py-4 ">
                <div>
                  <p v-if="attConfirm(data.manual_checkout_status, data.stamp_out) ==
                    '--'
                    ">
                    --
                  </p>
                  <font-awesome-icon v-else class="fa-solid w-6 h-6" :icon="attConfirm(data.manual_checkin_status, data.stamp_in)
                    " :class="attConfirm(data.manual_checkin_status, data.stamp_in) ==
    'fa-circle-check'
    ? 'text-[#4CAF77]'
    : 'text-red-500'
    "></font-awesome-icon>
                </div>
              </td>
              <td class="px-6 py-4 ">
                <span v-if="data.in_time" class="text-[#4CAF77]">{{
                  this.$moment(data.in_time).format('hh:mm:ss')
                }}</span>
                <span v-else-if="data.late_time" class="text-red-500">
                  {{ data.late_time }}
                </span>
              </td>
              <td class="px-6 py-4 capitalize ">
                {{ data.device_in_type }}
              </td>
              <td class="px-6 py-4 bg-[#FCF1E7]">
                {{ this.$moment(data.shift_end).format('hh:mm:ss') }}
              </td>
              <td class="px-6 py-4 bg-[#FCF1E7]">
                <p v-if="data.stamp_out == null">--</p>
                <p v-else>
                  {{ this.$moment(data.stamp_out).format('hh:mm:ss') }}
                </p>
              </td>
              <td class="px-6 py-4 bg-[#FCF1E7]">
                <div>
                  <p v-if="attConfirm(data.manual_checkout_status, data.stamp_out) ==
                    '--'
                    ">
                    --
                  </p>
                  <font-awesome-icon v-else class="fa-solid w-6 h-6" :icon="attConfirm(data.manual_checkout_status, data.stamp_out)
                    " :class="attConfirm(data.manual_checkout_status, data.stamp_out) ==
    'fa-circle-check'
    ? 'text-[#4CAF77]'
    : 'text-red-500'
    "></font-awesome-icon>
                </div>
              </td>
              <td class="px-6 py-4 bg-[#FCF1E7]">
                <span v-if="data.before_time" class="text-red-500">{{
                  data.before_time
                }}</span>
                <span v-else-if="data.late_time" class="text-[#4CAF77]">{{
                  data.late_time
                }}</span>
              </td>
              <td class="px-6 py-4 bg-[#FCF1E7] capitalize">
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
        <div v-for="(data, index) in tableData" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="this.$toggleAccordion(index, 'empAttendance')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`empAttendance-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{
              this.$moment(data.shift_start).format('DD/MM/YYYY')
            }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium mb-2">{{ $t('name') }}</h1>
              <span class="text-gray-400 capitalize">
                {{ this.$moment(data.shift_start).format('HH:mm:ss') }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">เวลาเข้างาน</h1>
              <span class="text-gray-400">
                {{ this.$moment(data.stamp_in).format('HH:mm:ss') }}
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
                <font-awesome-icon v-else class="fa-solid w-6 h-6" :icon="attConfirm(data.manual_checkin_status, data.stamp_in)
                  " :class="attConfirm(data.manual_checkin_status, data.stamp_in) ==
    'fa-circle-check'
    ? 'text-[#4CAF77]'
    : 'text-red-500'
    "></font-awesome-icon>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">สถานะ</h1>
              <span v-if="data.in_time" class="text-[#4CAF77]">{{
                this.$moment(data.in_time).format('hh:mm:ss')
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
                {{ this.$moment(data.shift_end).format('hh:mm:ss') }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">เวลาออกงาน</h1>
              <div>
                <p v-if="data.stamp_out == null">--</p>
                <p v-else>
                  {{ this.$moment(data.stamp_out).format('hh:mm:ss') }}
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
              <span v-else-if="data.late_time" class="text-[#4CAF77]">{{
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
          @update:modelValue="$getPaginateNo('emp-attendances', 'attendances', filter, true)" hideFirstButton
          hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
var data = {}

export default {
  name: 'Employment History',
  data() {
    return {
      popUp: false,
      loading: true,
      color: '#36A1EA',
      size: '20px',
      form: { ...data },
      tableData: [],
      showDate: new Date(),
      addAttendanceModal: false,
      filter: {
        att_status: '',
        date: '2023-07',
        search: '',
        listNum: '',
      }
    }
  },
  methods: {
    attConfirm(manual_check_status, stamp) {
      if (manual_check_status === 999) {
        return '--'
      } else if (manual_check_status === 0) {
        return 'fa-circle-xmark'
      } else if (stamp) {
        return 'fa-circle-check'
      } else {
        return '--'
      }
    },

    addAttendance() {
      this.addAttendanceModal = true;
    },
    closeModal() {
      this.addAttendanceModal = false;
    },
    today() {
      this.showDate = this.$moment().format("MMMM YYYY")
      this.filter.date = this.$moment(this.showDate).format("MMMM YYYY")
      this.$getPaginateNo('emp-attendances', 'attendances', this.filter)
    },
    prev() {
      this.showDate = this.$moment(this.showDate).subtract(1, 'months').format('MMMM YYYY')
      this.filter.date = this.$moment(this.showDate).format("YYYY-MM")
      this.$getPaginateNo('emp-attendances', 'attendances', this.filter)
    },
    next() {
      this.showDate = this.$moment(this.showDate).add(1, 'months').format('MMMM YYYY')
      this.filter.date = this.$moment(this.showDate).format("YYYY-MM")
      this.$getPaginateNo('emp-attendances', 'attendances', this.filter)
    },
    datePicked(date) {
      this.showDate = this.$moment(date).format("MMMM YYYY")
      this.filter.date = this.$moment(date).format("YYYY-MM")
      this.$getPaginateNo('emp-attendances', 'attendances', this.filter)
    },
  },

  computed: {
    filteredList() {
      return this.tableData.filter(list => {
        return list.fullname
          ?.toLowerCase()
          .includes(this.filter.search.toLowerCase())
      })
    },

  },

  beforeMount() {
    this.$paginateData.current_page = 1
    this.$paginateData.last_page = null
    this.$filter.listNum = ''
    this.$filter.searchQuery = ''
  },

  mounted() {
    this.$paginateData.current_page = 1
    this.$getEmployeePaginateNo('emp-attendances', 'attendances', this.filter, true)
    console.log(this.showDate)
  }
}
</script>

<style scoped>
tbody::before {
  content: '';
  display: block;
  height: 1px;
}
</style>
