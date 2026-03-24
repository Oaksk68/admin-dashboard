<template>
  <main class="bg-calendarBg">
    <teleport to="body">
      <Modal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </Modal>
    </teleport>
    <div class="relative w-full h-auto bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center mb-5 p-5 pb-0 md:pb-8">
        <div class="flex items-center gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-xl"></div>
          <h1 class="text-primary text-[26px] md:text-3xl">{{ $t('work_shift') }}</h1>
        </div>
        <div @click="createTime"
          class="p-2 rounded-full border mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div>
      <div class="grid gap-2 md:flex md:gap-4 w-full px-4 pb-8">
        <div class="relative">
          <select
            class="border w-full border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
        </div>

        <div class="relative md:w-64">
          <input
            class="border w-full border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            type="text" placeholder="ค้นหา" />
          <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
        </div>
      </div>

      <!-- add/edit shift popup -->
      <BaseModal :isOpen="popUp" @close-modal="closePopup" @submit="submit" :classList="'w-full md:w-[50vw]'">
        <template #title>
          <h1 class="text-center text-2xl text-primary py-5 font-semibold">
            {{ $t('add_enterprise_level') }}
          </h1>
        </template>
        <template #container>
          <div class="">
            <form class="flex flex-col w-auto justify-center items-center gap-5 text-primary">
              <div class="w-75">
                <label class="pb-1" for="departmentName">{{ $t('name') }}<span
                    class="text-red-600 font-bold">*</span></label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  :class="$errorBorder('shift_name')" type="text" v-model="form.shift_name" :placeholder="$t('name')"
                  required />
                <small>{{ errors.shift_name }}</small>
              </div>
              <div class="w-75">
                <label class="pb-1" for="timeInOut">เวลา เข้างาน - ออกงาน (00.00 - 23.59 น.)</label>
                <div class="flex items-center gap-4">
                  <div>
                    <!-- <input
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text" v-model="form.start" placeholder="เวลาเข้างาน" /> -->
                    <VueDatePicker time-picker :start-time="startTime" v-model="form.start" format="HH:mm"
                      :input-class-name="$errorBorder('start')" model-type="HH:mm:ss" placeholder="เวลาเข้างาน">
                    </VueDatePicker>
                    <small>{{ errors.start }}</small>
                  </div>
                  -
                  <div>
                    <!-- <input
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      type="text" v-model="form.end" placeholder="เวลาออกงาน" /> -->
                    <VueDatePicker time-picker :start-time="startTime" v-model="form.end" format="HH:mm"
                      model-type="HH:mm:ss" :input-class-name="$errorBorder('end')" placeholder="เวลาออกงาน">
                    </VueDatePicker>
                    <small>{{ errors.end }}</small>
                  </div>
                </div>
              </div>
              <div class="w-75">
                <label class="pb-1 block" for="restHour">ชั่วโมงพัก (ใน 1 วัน)</label>
                <select id="restHour"
                  class="w-full border border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  v-model="form.breaks" required>
                  <option value="" selected hidden>กรุณาเลือกชั่วโมงพัก</option>
                  <option value="00:30:00">00:30</option>
                  <option value="01:00:00">01:00</option>
                  <option value="01:30:00">01:30</option>
                  <option value="02:00:00">02:00</option>
                  <option value="02:30:00">02:30</option>
                </select>
              </div>
              <div class="w-75">
                <label for="type" class="md:block">{{ $t('userType') }}</label>
                <select name="type" id="type" v-model="form.regular_shift"
                  class="w-full border border-slate-300 p-2.5 rounded-lg text-gray-700 text-sm" required>
                  <option value="" selected hidden>{{ $t('userType') }}</option>
                  <option value="1">{{ $t('regular') }}</option>
                  <option value="0">{{ $t('irregular') }}</option>
                </select>
              </div>
              <div v-if="form.regular_shift == 1" class="w-75">
                <div class="flex justify-between items-center mb-3">
                  <label for="workday" class="pb-1">วันทำงาน (ใน 1 สัปดาห์)</label>
                  <span>
                    <input type="checkbox" v-model="everyday"
                      class="w-6 h-6 text-lightGreen bg-gray-100 rounded-lg everyday" @click="onClickEveryDayCheckbox" />
                    ทุกวัน
                  </span>
                </div>
                <div class="flex gap-2 items-center">
                  <ul class="">
                    <li v-for=" day  in  getAllWeekdays " :key="day.id">
                      <!-- <input class="weekday" type="checkbox" :id="'weekday' + day.id" :name="day.id" :value="day.id"
                        :checked="everyday" @click="handleSelectDate" />
                      <label :for="'weekday' + day.id" class="capitalize">{{
                        `${day.short_name}`
                      }}</label> -->
                      <div class="weekday" :class="`${day.short_name} ${day.id}`"
                        @click="onSelectDay($event, day.id, day.short_name)">
                        {{ day.short_name }} Test</div>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-else class="w-full">
                <Calendar ref="calendar" :errors="errors"></Calendar>
                <small class="ml-[70px]">{{ errors.selectedDates }}</small>
              </div>
            </form>
          </div>
        </template>
      </BaseModal>

      <!-- table -->
      <div class="overflow-x-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-3 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-20 py-3 font-medium">{{ $t('name') }}</th>
              <th scope="col" class="px-2 py-3 font-medium">เวลาเข้างาน</th>
              <th scope="col" class="px-2 py-3 font-medium">เวลาออกงาน</th>
              <th scope="col" class="px-2 py-3 font-medium">เวลาพัก</th>
              <th scope="col" class="px-2 py-3 font-medium">เวลาทำงาน</th>
              <th scope="col" class="px-2 py-3 font-medium">เงื่อนไข</th>
              <th scope="col" class="px-2 py-3 font-medium">วันทำงาน</th>
              <th scope="col" class="px-2 py-3 font-medium rounded-r-full">
                {{ $t('edit') }}/{{ $t('delete') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="( data, i ) in  tableData " :key="data.id" class="bg-white">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ i + 1 }}
              </th>
              <td class="px-1 py-2">{{ data.shift_name }}</td>
              <td class="px-1 py-2">{{ data.start }}</td>
              <td class="px-1 py-2">{{ data.end }}</td>
              <td class="px-6 py-4">{{ data.breaks }}</td>
              <td class="px-6 py-4">{{ data.work_hour }}</td>
              <td class="px-1 py-2">
                <div class="flex justify-center items-center gap-2">
                  <img src="@/assets/images/tick.svg" alt="" />
                  <div @click="signUpWork(data.id)"
                    class="relative border-2 w-8 h-8 rounded-full shadow-lg bg-sky-100 hover:bg-slate-200 duration-200">
                    <img class="absolute top-1/2 left-[54%] -translate-x-1/2 -translate-y-1/2"
                      src="@/assets/images/signupwork.svg" alt="" />
                  </div>
                </div>
              </td>

              <td class="px-6 py-4">
                <span class="capitalize" v-for=" weekday  in  data.weekdays " :key="weekday.id">{{ weekday.short_name +
                  " "
                }}</span>
              </td>
              <td class="px-6 py-4 text-right flex">
                <div @click="editForm(data.id)"
                  class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/editblack.svg" alt="" />
                </div>
                <div @click="$deleteData('shifttime', data.id)"
                  class="flex items-center border-2 shadow-lg rounded-r-large px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/bin.svg" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- accordion -->
      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="( data, index ) in  tableData " :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="$toggleAccordion(index, 'checkin')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`checkin-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize">{{ data.shift_name }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium">{{ $t('name') }}</h1>
              <span class="text-gray-400 capitalize">{{
                data.shift_name
              }}</span>
            </div>
            <div>
              <h1 class="font-medium">เวลาเข้างานอ</h1>
              <span class="text-gray-400">{{ data.start }}</span>
            </div>
            <div>
              <h1 class="font-medium">เวลาออกงาน</h1>
              <span class="text-gray-400">{{ data.end }}</span>
            </div>
            <div>
              <h1 class="font-medium">เวลาพัก</h1>
              <span class="text-gray-400">
                {{ data.breaks }}
              </span>
            </div>
            <div>
              <h1 class="font-medium">เวลาทำงาน</h1>
              <span class="text-gray-400">
                {{ data.work_hour }}
              </span>
            </div>
            <div>
              <h1 class="font-medium">เงื่อนไข</h1>
              <div class="flex items-center gap-2">
                <img class="w-8 h-8" src="@/assets/images/tick.svg" alt="" />
                <div @click="signUpWork(data.id)"
                  class="relative border-2 w-10 h-10 rounded-full shadow-lg bg-sky-100 hover:bg-slate-200 duration-200">
                  <img class="absolute top-1/2 left-[54%] -translate-x-1/2 -translate-y-1/2 w-7 h-7"
                    src="@/assets/images/signupwork.svg" alt="" />
                </div>
              </div>
            </div>
            <div>
              <h1 class="font-medium">วันทำงาน</h1>
              <span class="capitalize text-gray-400" v-for=" weekday  in  data.weekdays " :key="weekday.id">{{
                weekday.short_name + " " }}</span>
            </div>
            <div>
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-3 mt-2">
                <button @click="editForm(data.id)" class="bg-sky-100 p-3 rounded-full hover:bg-sky-200 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/edit.svg" alt="" />
                </button>
                <button @click="$deleteData('shifttime', data.id)"
                  class="bg-red-500 p-3 rounded-full hover:bg-red-600 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center mt-5 gap-2 text-sm text-h1mute pr-4 md:pr-0">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="this.$getPaginateNo('shifttimes')" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import Calendar from '../../../components/Calendar.vue'

let data = {
  shift_name: "",
  regular_shift: '',
  start: '',
  end: '',
  breaks: "",
  weekdays: [],
};

export default {
  name: "CheckInTime",
  components: { Calendar },
  data() {
    return {
      loading: true,
      color: "#36A1EA",
      everyday: false,
      size: "20px",
      page: null,
      pageCount: null,
      pagi: null,
      last_page: null,
      popUp: false,
      signUp: false,
      tableData: [],
      id: [],
      form: { ...data },
      errors: {},
      startTime: {
        hours: 0,
        minutes: 0
      }
    };
  },

  methods: {
    ...mapActions(["fetchBreakTimes", "fetchWeekdays", "fetchCheckIn"]),

    checkHighlight(checkAll) {
      if (checkAll) {
        for (let a of this.getAllWeekdays) {
          let div = document.querySelector(`.${a.short_name}`)
          div.classList.add('checked')
          this.form.weekdays = this.getAllWeekdays
        }
      } else {
        for (let a of this.form.weekdays) {
          let div = document.querySelector(`.${a.short_name}`)
          div.classList.add('checked')
        }
      }
    },

    removeHighlight() {
      for (let a of this.form.weekdays) {
        let div = document.querySelector(`.${a.short_name}`)
        div.classList.remove('checked')
        this.form.weekdays = []
      }
    },

    onClickEveryDayCheckbox() {
      console.log(this.form.weekdays);
      if (this.form.weekdays.length === 7) {
        this.removeHighlight()
      } else {
        this.checkHighlight(true)
      }
    },

    onSelectDay(arg, id, short_name) {
      let target = arg.target.classList
      if (target.contains('checked')) {
        target.remove('checked')
        if (this.form.weekdays.length === 7) {
          this.everyday = false
        }
        this.form.weekdays = this.form.weekdays.filter(day => {
          return day.short_name != short_name
        })
        console.log(this.form.weekdays);
      } else {
        target.add('checked')
        this.form.weekdays.push({
          weekday_id: id,
          short_name: short_name
        })
        console.log(this.form.weekdays);
      }
      if (this.form.weekdays.length === 7) {
        this.everyday = true
      }
    },

    signUpWork(id) {
      this.signUp = !this.signUp;
      this.$emit("condSignUp", this.signUp, id);
    },

    async editForm(id) {
      this.loading = true;
      this.popUp = true;
      await this.fetchCheckIn(id).finally(() => {
        this.form = this.shiftTimeData
        this.loading = false
      })
      if (this.form.weekdays.length === 7) {
        this.everyday = true
      }
      this.checkHighlight();
    },

    closePopup() {
      this.form = [];
      this.errors = [];
      this.popUp = false;
    },

    submit() {
      if (this.form.regular_shift == 0) {
        this.form = {
          ...this.form,
          showYear: this.$refs.calendar.showYear,
          showMonth: this.$refs.calendar.showMonth,
          selectedDates: [...this.$refs.calendar.selectedDates],
          month: this.$refs.calendar.date.month,
          year: this.$refs.calendar.date.year,
        }
      }

      if (this.form.id) {
        console.log(this.form);
        this.axios
          .post("shifttime/update/" + this.form.id, this.form)
          .then((response) => {
            console.log(response);
            if (response.data.success) {
              this.$swal({
                icon: "success",
                html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
                confirmButtonText: "ตกลง",
              })
                .then(() => {
                  this.popUp = false;
                })
                .finally(() => {
                  this.$getPaginateNo("shifttimes");
                });
            } else {
              this.$validateMsg(response.data.message)
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.axios
          .post("shifttime/create", this.form)
          .then((response) => {
            if (response.data.success) {
              this.$swal({
                icon: "success",
                html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
                confirmButtonText: "ตกลง",
              })
                .then(() => {
                  this.popUp = false;
                })
                .finally(() => {
                  this.$getPaginateNo("shifttimes");
                });
            } else {
              this.$validateMsg(response.data.message)
              console.log(this.errors);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

    },
    async createTime() {
      this.popUp = true;
    },
  },

  computed: {
    ...mapGetters(["getAllBreakTimes", "getAllWeekdays"]),
    ...mapState({
      shiftTimeData: state => state.checkin.shiftTimeData,
    })
  },

  mounted() {
    this.fetchBreakTimes();
    this.fetchWeekdays();
    this.$paginateData.current_page = 1;
    this.$getPaginateNo("shifttimes");
  },
};
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  clear: both;
}

li {
  list-style-type: none;
  list-style-position: outside;
  padding: 3px;
  float: left;
}

/*
input[type="checkbox"].weekday:not(:checked),
input[type="checkbox"].weekday:checked {
  position: absolute;
  left: -9999%;
}
*/

div.weekday {
  display: inline-block;
  width: 45px;
  height: 30px;
  text-align: center;
  cursor: pointer;
  color: white;
  background-color: #c6c6c6;
  border-radius: 8px;
  padding: 2.5px;
}

div.weekday.checked {
  border: 1px solid white;
  color: white;
  background-color: #36a1ea;
}
</style>
