<template>
  <main class="bg-calendarBg" v-click-away="clickAway">
    <teleport to="body">
      <Modal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </Modal>
    </teleport>

    <div class="relative bg-white rounded-tr-3xl rounded-b-3xl p-3 md:p-10 pb-5 mb-10" v-click-away="clickAway">
      <div class="flex mb-10">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-3xl ml-3">{{ $t("calendar") }}</h1>
      </div>
      <div class="md:flex w-full mb-8 items-center px-4"
        :class="this.$store.state.userInfo.role != 1 ? 'justify-end' : 'justify-between'">
        <div v-if="this.$store.state.userInfo.role == 1" class="md:w-2/3 gap-3 flex flex-wrap">
          <select
            class="border border-slate-300 w-full md:w-[20%] p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" required>
            <option value="" hidden>ชนิดปฎิทิน</option>
            <option value="1">Google Calendar</option>
            <option value="2">Outlook Calendar</option>
          </select>
          <input
            class="border border-slate-300 w-full md:w-[45%] p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            type="email" placeholder="ระบุอีเมลที่ใช้เชื่อมต่อ" />
          <div class="flex justify-center items-center w-full md:w-auto gap-5 mb-5 md:mb-0">
            <button
              class="shadow w-20 bg-origin hover:bg-sky-700 transition-all duration-400 text-white font-normal py-2 rounded-xl"
              type="button">
              บันทึก
            </button>
            <button
              class="shadow w-20 border border-red-400 text-red-400 font-normal py-2 rounded-xl hover:bg-red-400 hover:text-white transition-all duration-400"
              type="button">
              {{ $t("cancel") }}
            </button>
          </div>
        </div>

        <div class="flex md:justify-normal justify-center" role="group">
          <button @click="clickDay" type="button"
            class="day_btn border border-r-0 border-origin px-5 py-1.5 rounded-l-lg text-origin"
            :disabled="buttons.dayBtn">
            {{ $t("day") }}
          </button>
          <button @click="clickWeek" type="button" class="week_btn border border-origin px-5 py-1.5 text-origin"
            :disabled="buttons.weekBtn">
            {{ $t("week") }}
          </button>
          <button @click="clickMonth" type="button"
            class="month_btn border border-l-0 border-origin px-5 py-1.5 rounded-r-lg text-origin"
            :disabled="buttons.monthBtn">
            {{ $t("month") }}
          </button>
        </div>
      </div>

      <div class="flex flex-col-reverse md:flex-row gap-10 justify-between">
        <!-- left div -->
        <div class="box card w-full md:w-1/2 pb-14" v-click-away="clickAway">
          <div class="relative flex items-center justify-between mb-4 mt-7 mx-10">
            <h1 class="text-2xl">{{ $t('holiday') }}เดือน {{ displayMonth }}</h1>
            <div @click="filterPopUp = !filterPopUp"
              class="relative border group border-origin rounded-2xl w-12 h-12 hover:bg-origin duration-300">
              <font-awesome-icon
                class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-origin group-hover:text-white duration-300 text-xl"
                icon="fa-solid fa-filter" />
            </div>
            <!-- filterPopUp  -->
            <div v-if="filterPopUp"
              class="absolute right-14 top-0 bg-slate-100 shadow-lg rounded-lg w-[90%] border border-slate-200">
              <div class="flex justify-between p-5 items-center">
                <h1 class="text-primary text-2xl font-medium">ตัวกรอง</h1>
                <div class="border border-muted px-3 pt-2 pb-1 rounded-xl hover:bg-white duration-300">
                  <font-awesome-icon class="text-xl text-red-400" icon="fa-solid fa-rotate-left" />
                </div>
              </div>
              <div class="p-5">
                <div class="mb-4">
                  <input type="checkbox" class="w-6 h-6 text-origin bg-gray-100 rounded-lg" />
                  <span class="ml-2 text-md">แสดงทุกประเภท</span>
                </div>
                <div class="mb-4">
                  <input type="checkbox" class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                    v-model="filterData.holiday" />
                  <span class="ml-2 text-md">{{ $t('holiday') }}</span>
                </div>
                <div class="mb-4">
                  <input type="checkbox" class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                    v-model="filterData.sick_leave" />
                  <span class="ml-2 text-md">{{ $t('sickLeave') }}</span>
                </div>
                <div class="mb-4">
                  <input type="checkbox" class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                    v-model="filterData.business_leave" />
                  <span class="ml-2 text-md">{{ $t('personalLeave') }}</span>
                </div>
                <div class="mb-4">
                  <input type="checkbox" class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                    v-model="filterData.summer_leave" />
                  <span class="ml-2 text-md">{{ $t('summerLeave') }}</span>
                </div>
                <div class="mb-4">
                  <input type="checkbox" class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                    v-model="filterData.special_leave" />
                  <span class="ml-2 text-md">{{ $t('specialLeave') }}</span>
                </div>
                <div class="mb-4">
                  <input type="checkbox" class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                    v-model="filterData.withoutpay_leave" />
                  <span class="ml-2 text-md">ลาโดยไม่รับค่าจ้าง</span>
                </div>
                <div class="flex justify-center items-center mt-5">
                  <button
                    class="shadow w-32 bg-origin hover:bg-sky-700 transition-all duration-400 text-white font-normal py-2 rounded-xl"
                    type="button">
                    บันทึก
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- leave infos card -->
          <div class="overflow-y-auto max-h-[26rem] border border-slate-200 shadow-sm">
            <div v-for="(item, index) in holidays" :key="index">
              <div v-for="(holiday, index) in item" :key="index" class="text-primary rounded-r-3xl max-h-[566px] px-6">
                <div id="dashboardContainer" class="card-small font-semibold mb-2">
                  <div class="flex bg-white rounded-3xl pl-2 h-20 mt-1">
                    <div class="text-origin text-xl text-center flex flex-col pl-2">
                      <span class="text-xl pl-2 pt-2 font-medium">
                        {{ holiday.month }}
                      </span>
                      <span class="text-4xl">{{ holiday.dateNum }}</span>
                    </div>
                    <div class="ml-6 text-sm my-auto">
                      <h1>{{ holiday.dateshow }}</h1>
                      <h1 class="font-medium">
                        <span>{{ holiday.firstname }} {{ holiday.eventtype }}
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- calendar -->
        <div
          class="calendar box card max-h-[35rem] w-full md:w-1/2 bg-white border border-gray-200 rounded-3xl grid content-evenly">
          <div class="w-full mt-1 flex justify-center items-center">
            <!-- <calendarComp
              @updateHoliday="handleLeaves"
              :holidays="holidays"
              class="max-h-[30rem] overflow-auto"
            /> -->
            <FullCalendar ref="cc" class="px-5 py-5 text-primary w-full" :options="calendarOptions">
            </FullCalendar>
          </div>
          <div class="flex items-baseline flex-wrap gap-3 justify-end pr-3 md:pr-10 pb-5 mt-4 text-[12px] text-primary">
            <div class="flex items-center gap-1 w-1/5">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8.5" cy="8.5" r="7.5" stroke="#1A3C54" stroke-width="2" />
              </svg>
              <span>วันนี้</span>
            </div>
            <div class="flex items-center gap-1 w-1/5">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(245, 102, 102, 1)"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(245, 102, 102, 1)" stroke-width="2" />
              </svg>
              <span>{{ $t('holiday') }}</span>
            </div>
            <div class="flex items-center gap-1 w-1/5">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(156, 228, 82, 1)"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(156, 228, 82, 1)" stroke-width="2" />
              </svg>
              <span>{{ $t('summerLeave') }}</span>
            </div>
            <div class="flex items-center gap-1 w-1/5">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(182, 213, 255, 1)"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(182, 213, 255, 1)" stroke-width="2" />
              </svg>
              <span>{{ $t('personalLeave') }}</span>
            </div>
            <div class="flex items-center gap-1 w-1/5">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(255, 168, 87, 1)"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(255, 168, 87, 1)" stroke-width="2" />
              </svg>
              <span>{{ $t('specialLeave') }}</span>
            </div>
            <div class="flex items-center gap-1 w-1/5">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(255, 199, 115, 1)"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(255, 199, 115, 1)" stroke-width="2" />
              </svg>
              <span>{{ $t('sickLeave') }}</span>
            </div>
            <div class="flex items-center gap-1 w-1/5">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(172, 175, 182, 1)"
                xmlns="http://www.w3.org/2000/svg">
                <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(172, 175, 182, 1)" stroke-width="2" />
              </svg>
              <span>ไม่รับเงิน</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- hide on employee role -->
    <div v-if="this.$store.state.userInfo.role == 1" class="bg-white rounded-3xl md:p-10 my-5">
      <div class="flex justify-between p-5 md:p-0">
        <div class="flex items-start gap-2">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-[26px] md:text-3xl inline text-primary">{{ $t('holiday') }}</h1>
        </div>
        <div @click="popUp = true"
          class="inline border border-slate-100 p-2 rounded-full bg-calendarBg hover:bg-slate-200 duration-500 float-right">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div>
      <div class="grid md:flex gap-2 md:gap-4 w-full pb-8 mt-5 px-4 md:px-0">
        <div class="flex flex-col-reverse md:flex-row gap-2 md:gap-4 w-full">
          <div class="relative md:w-1/3">
            <select
              class="border border-slate-300 w-full p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="" v-model="this.$filter.listNum" @change="$getPaginateNo('holidays')">
              <option value="" selected hidden>แสดง 5 แถว</option>
              <option value="5">แสดง 5 แถว</option>
              <option value="10">แสดง 10 แถว</option>
              <option value="20">แสดง 20 แถว</option>
              <option value="50">แสดง 50 แถว</option>
              <option value="100">แสดง 100 แถว</option>
            </select>
          </div>
          <div class="relative">
            <VueDatePicker class="text-muted rounded-xl focus:ring-blue-500 focus:border-blue-500"
              @update:model-value="$getPaginateNo('holidays', page)" :placeholder="$t('selectDate')"
              :enable-time-picker="false" :format="$format" />
          </div>
        </div>

        <div class="relative flex justify-end md:w-2/4">
          <input class="rounded-xl w-full" type="text" placeholder="ค้นหา" />
          <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
        </div>

        <!-- popup -->
        <BaseModal :isOpen="popUp" @close-modal="closeModal" @submit="submit" :classList="'w-full md:w-[50vw]'">
          <template #title>
            <h1 class="text-primary font-medium text-2xl text-center">
              {{ $t('add_holiday') }}
            </h1>
          </template>
          <template #container>
            <div class="">
              <div class="w-full px-10">
                <form>
                  <div class="grid md:flex gap-3 mt-5">
                    <div class="md:w-1/2">
                      <label for="holiday" class="text-primary text-sm md:text-lg font-medium">{{ $t('name')
                      }}{{ $t('holiday') }}<span class="text-red-600">*</span></label>
                      <input id="holiday" class="rounded-xl w-full mt-1 p-[8px]" type="text" :class="$errorBorder('name')"
                        :placeholder="$t('department_name')" v-model="form.name" />
                      <small>{{ errors.name }}</small>
                    </div>
                    <div class="md:w-1/2">
                      <label for="calendar" class="text-primary text-lg font-medium">วันที่</label>
                      <VueDatePicker id="calendar" v-model="form.date" :format="$format" :enable-time-picker="false"
                        :teleport="true" class="mt-1" placeholder="กรุณาเลือกวันที่" />
                    </div>
                  </div>
                  <!-- <div class="mt-5"> -->
                  <!-- <h1 class="text-primary font-medium mt-3 text-lg">
                    ประเภท{{$t('holiday')}} (เลือกได้ 1 ตัวเลือก เท่านั้น)<span
                      class="text-red-500"
                      >*</span
                    >
                  </h1> -->
                  <!-- <div class="flex justify-around mt-4">
                    <div class="flex gap-1">
                      <input
                        type="checkbox"
                        class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                        v-model="filter.holiday"
                      />
                      <h1>{{$t('holiday')}}</h1>
                    </div>
                    <div class="flex gap-2">
                      <input
                        type="checkbox"
                        class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                        v-model="filter.business_leave"
                      />
                      <h1>{{$t('personalLeave')}}</h1>
                    </div>
                    <div class="flex gap-2">
                      <input
                        type="checkbox"
                        class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                        v-model="filter.sick_leave"
                      />
                      <h1>{{$t('sickLeave')}}</h1>
                    </div>
                    <div class="flex gap-2">
                      <input
                        type="checkbox"
                        class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                        v-model="filter.summer_leave"
                      />
                      <h1>{{$t('summerLeave')}}</h1>
                    </div>
                    <div class="flex gap-2">
                      <input
                        type="checkbox"
                        class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                        v-model="filter.special_leave"
                      />
                      <h1>{{$t('specialLeave')}}</h1>
                    </div>
                    <div class="flex gap-2">
                      <input
                        type="checkbox"
                        class="w-6 h-6 text-origin bg-gray-100 rounded-lg"
                        v-model="filter.withoutpay_leave"
                      />
                      <h1>ไม่รับเงิน</h1>
                    </div>
                  </div> -->
                  <!-- </div> -->
                </form>
                <div class="w-full">
                  <h1 class="text-red-500 text-sm font-normal p-2 my-4">
                    พรบ. คุ้มครองแรงงาน พ.ศ. 2541 มาตรา 29
                    “ให้นายจ้างประกาศกำหนด{{ $t('holiday') }}ตามประเพณี
                    ให้ลูกจ้างทราบเป็นการล่วงหน้าปีหนึ่งไม่น้อยกว่าสิบสามวันโดยรวมวันแรงงานแห่งชาติตามที่
                    รัฐมนตรีประกาศกำหนด’’
                  </h1>
                </div>
              </div>
            </div>
          </template>
        </BaseModal>
      </div>

      <!-- table -->
      <div class="overflow-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-3 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-2 py-3 font-medium">{{ $t('name') }}</th>
              <th scope="col" class="px-2 py-3 font-medium">{{ $t('date') }}</th>
              <th scope="col" class="px-2 py-3 font-medium">{{ $t('holiday_types') }}</th>
              <th scope="col" class="px-2 py-3 font-medium rounded-r-full">
                {{ $t('edit') }}/{{ $t('delete') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(item, index) in tableData" :key="'holidayKey' + index" class="bg-white">
              <td scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </td>
              <td class="px-1 py-2">{{ item.name }}</td>
              <td class="px-1 py-2">
                {{ this.$moment(item.date).format("DD/MM/YYYY") }}
              </td>
              <td class="px-1 py-2">
                <div class="text-center bg-red-500 text-white rounded-full py-1 px-4 text-nowrap">
                  {{ $t('holiday') }}นักขัตฤกษ์
                </div>
              </td>
              <td class="px-6 py-4 flex justify-center">
                <div @click="editForm(item.id)"
                  class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/editblack.svg" alt="" />
                </div>
                <div @click="deleteHoliday(item.id)"
                  class="flex items-center border-2 shadow-lg rounded-r-large px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/bin.svg" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- accordion for mobile view -->
      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in tableData" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="this.$toggleAccordion(index, 'department')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`department-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{ data.name }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium mb-2">{{ $t('name') }}</h1>
              <span class="text-gray-400 capitalize">{{ data.name }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">วันที่</h1>
              <span class="text-gray-400">
                {{ this.$moment(data.date).format("DD/MM/YYYY") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium">ปรเะภท{{ $t('holiday') }}</h1>
              <div class="text-center bg-red-500 text-white rounded-full py-1">
                {{ $t('holiday') }}นักขัตฤกษ์
              </div>
            </div>
            <div>
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-3 mt-2">
                <button @click="editForm(data.id)" class="bg-sky-100 p-3 rounded-full hover:bg-sky-200 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/edit.svg" alt="" />
                </button>
                <button @click="deleteHoliday(data.id)" class="bg-red-500 p-3 rounded-full hover:bg-red-600 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-2 text-sm text-h1mute mt-5 p-4 md:p-0">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          @update:modelValue="$getPaginateNo('holidays')" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import { collapsed } from "@/components/js/state";
import '@fullcalendar/core/vdom';
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Popover } from "flowbite";
import { debounce } from 'lodash';
import { mapState } from 'vuex';

let data = {
  date: null,
  company_id: null,
  name: "",
};

export default {
  name: "calender info",
  components: {
    FullCalendar,
  },
  data() {
    return {
      collapsed,
      popUp: false,
      checked: false,
      loading: true,
      color: "#36A1EA",
      size: "20px",
      filterPopUp: false,
      addHoliday: false,
      showNoData: false,
      filter: { date: new Date() },
      errors: { ...data },
      navDisable: false,
      buttons: {
        dayBtn: false,
        weekBtn: false,
        monthBtn: true,
      },
      month: {
        date: this.$moment().format("YYYY-MM-DD"),
      },
      filterData: {
        personal_leave: Boolean,
        sick_leave: Boolean,
        business_leave: Boolean,
        special_leave: Boolean,
        withoutpay_leave: Boolean,
        summer_leave: Boolean,
        holiday: Boolean,
      },
      form: { ...data },
      holidays: [],
      tableData: [],
      date: new Date(),
      eventIsMounted: false,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        locale: this.$store.getters.getAppLanguage,
        showNonCurrentDates: false,
        handleWindowResize: true,
        initialView: "dayGridMonth",
        weekends: true,
        aspectRatio: 2,
        contentHeight: 300,
        customButtons: {
          custPrev: {
            icon: "chevron-left",
            click: this.custPrev,
          },
          custNext: {
            icon: "chevron-right",
            click: this.custNext,
          },
        },
        headerToolbar: {
          start: "custPrev", // will normally be on the left. if RTL, will be on the right
          center: "title",
          end: "custNext",
        },
        events: [
          {
            id: "e12",
            title: "วันนี่",
            start: this.$moment().format("YYYY-MM-DD"),
            end: this.$moment().format("YYYY-MM-DD"),
            className: "today",
            class: "today",
            eventType: "today",
          },
        ],
        eventDisplay: "auto",
        selectable: false,
        views: {
          timeGrid: {
            allDayContent: 'ทั้งวัน',
            slotDuration: '01:00',
            slotLabelInterval: '01:00',
            slotLabelFormat: function (date) {
              let time = date.start.hour
              if (time > 12) {
                return time - 12 + 'pm'
              } else if (time === 12) {
                return 12 + 'pm'
              } else if (time == 0) {
                return '12am'
              } else {
                return time + 'am'
              }
            }
          }
        }
      },
    };
  },
  methods: {
    custPrev() {
      this.$refs.cc.calendar.prev();
      this.onNavClick();
    },
    custNext() {
      this.$refs.cc.calendar.next();
      this.onNavClick();
    },

    onNavClick: debounce(function () {
      this.calendarOptions.events = [
        {
          id: "e12",
          title: "วันนี่",
          start: this.$moment().format("YYYY-MM-DD"),
          end: this.$moment().format("YYYY-MM-DD"),
          className: "today",
          class: "today",
        },
      ];
      this.getDays(this.$moment(this.$refs.cc.calendar.getDate()).format("YYYY-MM-DD"));
      this.checkView();
    }, 1000),

    async getDays(dataDate) {
      let payload = {
        date: dataDate ? dataDate : this.month
      }
      console.log('getday payload', payload);
      await this.axios
        .post("holidays-leaves", payload)
        .then((response) => {
          this.holidays = response.data;
          for (let dayType in this.holidays) {
            for (let day of this.holidays[dayType]) {
              let obj = {
                id: day.id,
                company_id: day.company_id,
                name: day.name ? day.name : day.fullname,
                outlook_uid: day.outlook_uid,
                dateShow: day.dateshow,
                month: day.month,
                dateNum: day.dateNum,
                eventType: day.eventtype,
                type: day.type,
                title: "",
                e_name: day.e_name,
                start: this.$moment(day.date).format("YYYY-MM-DD"),
                end: day.end,
                class: day.className,
                className: day.className,
                positionName: day.position_name,
                departmentName: day.department_name,
                leaveName_th: day.leave_name_th,
                leaveName_en: day.leave_name_en,
                period_th: day.period_th,
                period_en: day.period_en,
              };
              if (day.eventtype == "Holiday") {
                obj.title = day.title;
              } else {
                obj.title = day.fullname;
              }
              this.calendarOptions.events.push(obj);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          if (this.$refs.cc.calendar.view.type == "dayGridMonth") {
            this.dayRender();
          } else {
            this.eventsRender();
          }
          document.querySelector(".fc-custPrev-button").disabled = false;
          document.querySelector(".fc-custNext-button").disabled = false;
        });
    },

    dayRender() {
      let viewType = this.$refs.cc.calendar.view;
      if (viewType.type == "dayGridMonth") {
        const div = document.createElement("div");
        div.className = "connector";
        for (let a of this.calendarOptions.events) {
          let date = this.$moment(a.start).format("YYYY-MM-DD");
          let highlightDate = document.querySelector(
            '[data-date="' + date + '"] div div a'
          );
          let popover = document.querySelector(
            '[data-date="' + date + '"] div '
          );
          let targetDiv = document.querySelector(
            '[data-date="' + date + '"] div div'
          );
          targetDiv?.setAttribute("id", `${a.id}trigger`);
          this.addPopover(popover, a);
          if (this.$moment(a.start).isSameOrAfter(a.end, "day")) {
            highlightDate?.classList.add(a.class, "myEvent");
          } else {
            let endDate = this.$moment(a.end).format("YYYY-MM-DD");
            let hightlightEndDate = document.querySelector(
              '[data-date="' + endDate + '"] div div a'
            );
            let divStart = document.createElement("div");
            divStart.classList.add(
              "connector",
              "start",
              this.checkConnectorColor(a.class)
            );
            let halfStart = document.querySelector(
              '[data-date="' + a.start + '"]'
            );
            halfStart?.append(divStart);
            let divEnd = document.createElement("div");
            divEnd.classList.add(
              "connector",
              "end",
              this.checkConnectorColor(a.class)
            );
            let halfEnd = document.querySelector(
              '[data-date="' + endDate + '"]'
            );
            halfEnd?.append(divEnd);
            hightlightEndDate?.classList.add(a.class, "myEvent");
            highlightDate?.classList.add(a.class, "myEvent");
            const date1 = new Date(a.start);
            const date2 = new Date(a.end);
            let dateArray = [];
            for (let b = date1; b < date2; b.setDate(b.getDate() + 1)) {
              let checkDate = this.$moment(b).format("YYYY-MM-DD");
              if (checkDate !== a.start) {
                dateArray.push(checkDate);
              }
            }
            for (let i of dateArray) {
              let betweenDate = this.$moment(i).format("YYYY-MM-DD");
              let hightlightBetweenDate = document.querySelector(
                '[data-date="' + betweenDate + '"]'
              );
              let divBetween = document.createElement("div");
              divBetween.classList.add(
                "connector",
                "between",
                this.checkConnectorColor(a.class)
              );
              hightlightBetweenDate?.append(divBetween);
            }
          }
        }
        this.appendPopOver(viewType.type);
      }
    },

    addPopover(el, a) {
      // let startDate = this.$moment(a.start).format("DD/MM/YYYY");
      // let endDate = this.$moment(a.end).format("DD/MM/YYYY");
      const date = el?.querySelector(`[date="${a.start}"]`);
      if (date) {
        if (a.eventType == "Onleave") {
          date.innerHTML += `<div class="p-2 text-xs w-60 flex flex-col"><h1 class="pb-1 ${this.checkTextColor(
            a.class
          )} border-b border-dotted ${this.checkBorderColor(
            a.class
          )} capitalize">ลางาน</h1>
          <span class="text-primary mt-2 w-full">${a.name}</span>
          <span class="text-primary mt-2 w-full capitalize">แผนก : ${a.departmentName
            }</span>
          <span class="text-primary mt-2 w-full capitalize">ตำแหน่ง : ${a.positionName
            }</span>
          <span class="text-primary mt-2 w-full capitalize">รายละเอียด :
            ${this.$store.getters.getAppLanguage == "th"
              ? a.leaveName_th
              : a.leaveName_en
            }
          </span>
          </div>`;
        } else {
          date.innerHTML += `<div class="p-2 text-xs !w-60 flex flex-col"><h1 class="pb-1 text-red-500 border-b border-dotted ${this.checkBorderColor(
            a.class
          )}">{{$t('holiday')}}นักขัตฤกษ์</h1>
          <span class="text-primary mt-2 w-full capitalize">รายละเอียด :
            ${a.title}
          </span></div>`;
        }
      } else {
        const div = document.createElement("div");
        div.setAttribute(
          "class",
          "popoverTrigger p-1 absolute !z-[1035] invisible inline-block max-h-[22rem] overflow-auto transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0"
        );
        div.setAttribute("data-popover", "");
        div.setAttribute("date", a.start);
        div.setAttribute("role", "tooltip");
        if (a.eventType == "Onleave") {
          div.innerHTML = `<div class="p-2 text-xs w-60 flex flex-col"><h1 class="pb-1 ${this.checkTextColor(
            a.class
          )} border-b border-dotted ${this.checkBorderColor(
            a.class
          )} capitalize">ลางาน</h1>
          <span class="text-primary mt-2 w-full">${a.name}</span>
          <span class="text-primary mt-2 w-full capitalize">แผนก : ${a.departmentName
            }</span>
          <span class="text-primary mt-2 w-full capitalize">ตำแหน่ง : ${a.positionName
            }</span>
          <span class="text-primary mt-2 w-full capitalize">รายละเอียด :
            ${this.$store.getters.getAppLanguage == "th"
              ? a.leaveName_th
              : a.leaveName_en
            }
          </span>
          </div>`;
          el?.appendChild(div);
        } else {
          div.innerHTML = `<div class="p-2 text-xs !w-60 flex flex-col"><h1 class="pb-1 text-red-500 border-b border-dotted ${this.checkBorderColor(
            a.class
          )}">{{$t('holiday')}}นักขัตฤกษ์</h1>
          <span class="text-primary mt-2 w-full capitalize">รายละเอียด :
            ${a.title}
          </span></div>`;
          el?.appendChild(div);
        }
        if (a.eventType == "today") {
          div.innerHTML = `<div class="p-2 text-xs text-center"><h3 class="${this.checkTextColor(
            a.class
          )}">วนนี้</h3></div>`;
          el?.appendChild(div);
        }
      }
    },

    eventsRender() {
      for (let a of this.calendarOptions.events) {
        const divMain = document.createElement("div");
        const divLeftColor = document.createElement("div");
        let date = this.$moment(a.start).format("YYYY-MM-DD");
        let event = document.querySelector(
          `[data-date="${date}"] div.fc-daygrid-day-frame.fc-scrollgrid-sync-inner`
        );
        divMain.setAttribute(
          "class",
          `popup text-sm rounded-l overflow-hidden h-[1.7rem] sticky flex align-top gap-0.5 cursor-pointer`
        );
        divMain.setAttribute("id", a.id);
        event?.append(divMain);
        divLeftColor.setAttribute(
          "class",
          `${this.checkBgColor(
            a.class
          )} w-[0.4rem] h-[1.7rem] absolute left-0 top-0`
        );

        let span = document.createElement("span");
        span.setAttribute(
          "class",
          `relative whitespace-nowrap flex items-center w-full pl-[8px] ${this.checkConnectorColor(
            a.className
          )}`
        );
        var eventArray = [];
        if (!eventArray.includes(a.className)) {
          eventArray.push(a.className);
        }
        if (a.eventType == "Holiday") {
          span.innerHTML = a.e_name;
        } else if (a.className == "today") {
          span.innerHTML = "วันนี่";
        } else {
          span.innerHTML = a.name;
        }
        divMain.appendChild(span);
        span.appendChild(divLeftColor);
        this.eventPopover(event, a);
      }
      this.appendPopOver(this.$refs.cc.calendar.view.type);
    },

    eventPopover(el, a) {
      let div = document.createElement("div");
      div.setAttribute(
        "class",
        `popoverTrigger p-1 absolute !z-[1035] invisible inline-block max-h-[22rem] overflow-auto transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0`
      );
      div.setAttribute("data-popover", "");
      div.setAttribute("id", `popover${a.id}`);
      div.setAttribute("role", "tooltip");
      if (a.eventType == "Onleave") {
        div.innerHTML = `<div class="p-2 text-xs w-60 flex flex-col"><h1 class="pb-1 ${this.checkTextColor(
          a.class
        )} border-b border-dotted ${this.checkBorderColor(
          a.class
        )} capitalize">ลางาน</h1>
          <span class="text-primary mt-2 w-full">${a.name}</span>
          <span class="text-primary mt-2 w-full capitalize">แผนก : ${a.departmentName
          }</span>
          <span class="text-primary mt-2 w-full capitalize">ตำแหน่ง : ${a.positionName
          }</span>
          <span class="text-primary mt-2 w-full capitalize">รายละเอียด :
            ${this.$store.getters.getAppLanguage == "th"
            ? a.leaveName_th
            : a.leaveName_en
          }
          </span>
          </div>`;
        el?.appendChild(div);
      } else {
        div.innerHTML = `<div class="p-2 text-xs !w-60 flex flex-col"><h1 class="pb-1 text-red-500 border-b border-dotted ${this.checkBorderColor(
          a.class
        )}">{{$t('holiday')}}นักขัตฤกษ์</h1>
          <span class="text-primary mt-2 w-full capitalize">รายละเอียด :
            ${a.title}
          </span></div>`;
        el?.appendChild(div);
      }
      if (a.eventType == "today") {
        div.innerHTML = `<div class="p-2 text-xs text-center"><h3 class="${this.checkTextColor(
          a.class
        )}">วนนี้</h3></div>`;
        el?.appendChild(div);
      }
      el?.appendChild(div);
    },

    appendPopOver(viewType) {
      for (let a of this.calendarOptions.events) {
        typeof a.id == "number" ? (a.id = a.id.toString()) : "";
        const options = {
          placement: "bottom",
          triggerType: "hover",
          offset: 5,
        };
        let $targetEl = "";
        let $triggerEl = "";
        if (viewType == "dayGridMonth") {
          $targetEl = document.querySelector(
            `[data-date="${a.start}"] div div.popoverTrigger`
          );
          // set the element that trigger the popover using hover or click
          $triggerEl = document.querySelector(
            `[data-date="${a.start}"] div div`
          );
        } else if (viewType == "timeGridWeek") {
          $targetEl = document.getElementById("popover" + a.id);
          // set the element that trigger the popover using hover or click
          $triggerEl = document.getElementById(a.id);
        } else if (viewType == "timeGridDay") {
          $targetEl = document.getElementById("popover" + a.id);
          // set the element that trigger the popover using hover or click
          $triggerEl = document.getElementById(a.id);
        }
        if (($targetEl, $triggerEl)) {
          const popover = new Popover($targetEl, $triggerEl, options);
          popover.hide();
        }
      }
    },

    checkConnectorColor(className) {
      switch (className) {
        case "sick_leave":
          return "bg-[#ffc77360]";
        case "summer_leave":
          return "bg-[#9ce45260]";
        case "special_leave":
          return "bg-[#ffa85760]";
        case "holiday":
          return "bg-[#f99]";
        case "personal_leave":
          return "bg-[#b6d5ff60]";
        case "withoutpay_leave":
          return "bg-[#acafb660]";
      }
    },

    checkTextColor(className) {
      switch (className) {
        case "sick_leave":
          return "text-[#ffc773]";
        case "summer_leave":
          return "text-[#9ce452]";
        case "special_leave":
          return "text-[#ffa857]";
        case "holiday":
          return "text-[#f99]";
        case "personal_leave":
          return "text-[#b6d5ff]";
        case "withoutpay_leave":
          return "text-[#acafb6]";
      }
    },

    checkBorderColor(className) {
      switch (className) {
        case "sick_leave":
          return "border-[#ffc773]";
        case "summer_leave":
          return "border-[#9ce452]";
        case "special_leave":
          return "border-[#ffa857]";
        case "holiday":
          return "border-[#f99]";
        case "personal_leave":
          return "border-[#b6d5ff]";
        case "withoutpay_leave":
          return "border-[#acafb6]";
      }
    },

    checkBgColor(className) {
      switch (className) {
        case "sick_leave":
          return "bg-[#ffc773]";
        case "summer_leave":
          return "bg-[#9ce452]";
        case "special_leave":
          return "bg-[#ffa857]";
        case "holiday":
          return "bg-[#ff5a5a]";
        case "personal_leave":
          return "bg-[#b6d5ff]";
        case "withoutpay_leave":
          return "bg-[#acafb6]";
      }
    },

    checkGap(startDate, endDate) {
      if (endDate <= startDate) {
        return false;
      } else {
        return true;
      }
    },

    clickDay() {
      // this.calendarOptions.events = []
      this.$refs.cc.getApi().changeView("timeGridDay");
      this.title = this.$refs.cc.getApi().view.title;
      let dayBtn = document.querySelector('.day_btn').classList
      let date = this.$refs.cc.calendar.getDate()
      this.activeButton("timeGridDay");
      if (!dayBtn.contains('active')) {
        this.getDays(date)
      }
      this.dayRender();
    },
    clickWeek() {
      // this.calendarOptions.events = []
      console.log(this.$refs.cc.calendar);
      this.$refs.cc.getApi().changeView("timeGridWeek");
      this.title = this.$refs.cc.getApi().view.title;
      let weekBtn = document.querySelector('.week_btn').classList

      this.activeButton("timeGridWeek");
      if (!weekBtn.contains('active')) {
        this.getDays(date)
      }
      this.eventsRender();
    },
    clickMonth() {
      this.calendarOptions.events = []
      this.$refs.cc.getApi().changeView("dayGridMonth");
      this.title = this.$refs.cc.getApi().view.title;
      let monthBtn = document.querySelector('.month_btn').classList
      let date = this.$refs.cc.calendar.getDate()
      if (!monthBtn.contains('active')) {
        this.getDays(date)
      }
      this.activeButton("dayGridMonth");
      this.dayRender();
    },
    activeButton(type) {
      this.checkView();
      if (type == "timeGridDay") {
        document.querySelector(".day_btn").classList.add("active");
        document.querySelector(".week_btn").classList.remove("active");
        document.querySelector(".month_btn").classList.remove("active");
        this.buttons.dayBtn = true;
        this.buttons.weekBtn = false;
        this.buttons.monthBtn = false;
      } else if (type == "timeGridWeek") {
        document.querySelector(".day_btn").classList.remove("active");
        document.querySelector(".week_btn").classList.add("active");
        document.querySelector(".month_btn").classList.remove("active");
        this.buttons.dayBtn = false;
        this.buttons.weekBtn = true;
        this.buttons.monthBtn = false;
      } else if (type == "dayGridMonth") {
        document.querySelector(".day_btn").classList.remove("active");
        document.querySelector(".week_btn").classList.remove("active");
        document.querySelector(".month_btn").classList.add("active");
        this.buttons.dayBtn = false;
        this.buttons.weekBtn = false;
        this.buttons.monthBtn = true;
      }
    },

    checkView() {
      let viewType = this.$refs.cc.calendar.view.type;
      if (viewType == "dayGridMonth") {
        let events = document.querySelectorAll(".fc-daygrid-day-events");
        for (let event of events) {
          event.style.display = "none";
        }
        document.querySelector(
          `.fc .fc-scroller-liquid-absolute`
        ).style.overflow = "visible";
      } else if (viewType == "timeGridWeek") {
        document
          .querySelector(`.fc-timegrid.fc-timeGridWeek-view.fc-view`)
          .classList.add("fc-k");
        let scrollers = document.querySelectorAll(".fc-scroller");
        scrollers[1].style.overflow = "visible";
      } else if (viewType == "timeGridWeek" || viewType == "timeGridDay") {
        let scrollers = document.querySelectorAll(".fc-scroller");
        for (let scroller of scrollers) {
          scroller.style.overflow = "visible";
        }
        document.querySelector(
          `.fc .fc-scroller-liquid-absolute`
        ).style.overflow = "scroll";
        document.querySelector(
          ".fc-scrollgrid-section.fc-scrollgrid-section-body"
        ).style.maxHeight = "8rem";
      }
    },

    closeModal() {
      this.popUp = false;
      this.form = { ...data };
      this.errors = { ...data };
    },

    handleLeaves(a) {
      this.containerLoading = false;
      this.filter.date = a;
      this.axios
        .post("holidays-leaves", this.filter)
        .then((response) => {
          this.holidays = response.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.containerLoading = false;
        });
    },

    async submit() {
      this.filterData = [];
      if (this.form.id) {
        await this.axios
          .post("holiday/update/" + this.form.id, this.form)
          .then((response) => {
            if (response.data.success) {
              this.$swal({
                icon: "success",
                html: "<h1 class='text-[25px] md:text-[3xl]'>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
                confirmButtonText: "ตกลง",
              })
                .then(() => {
                  this.closeModal();
                })
                .finally(() => {
                  this.$getPaginateNo("holidays");
                });
            } else {
              this.$swal({
                icon: "error",
                title: "Error",
                text: response.data.message,
              }).then(() => {
                this.popUp = false;
              });
            }
          });
      } else {
        await this.axios.post("holiday/create", this.form).then((response) => {
          if (response.data.success) {
            this.$swal({
              icon: "success",
              html: "<h1 class='text-[25px] md:text-[3xl]'>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
              confirmButtonText: "ตกลง",
            })
              .then(() => {
                this.popUp = false;
              })
              .finally(() => {
                this.$getPaginateNo("holidays", this.page);
              });
          } else {
            this.$validateMsg(response.data.message)
          }
        });
      }
    },

    async editForm(id) {
      this.loading = true;
      this.axios
        .get("holiday/edit/" + id)
        .then((response) => {
          this.form = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
          this.popUp = true;
        });
    },
    async deleteHoliday(id) {
      this.$deleteData("holiday", id);
    },

    resetDate() {
      this.date = new Date();
    },
    clickAway() {
      this.filterPopUp = false;
    },
  },

  computed: {
    displayMonth() {
      return this.$moment(this.filter.date).format("MMMM YYYY");
    },
    ...mapState({
      lang: state => state.authentication.appLanguage
    })
  },

  watch: {
    collapsed() {
      setTimeout(() => {
        if (window.innerWidth <= 768) {
          return;
        } else {
          this.$refs.cc?.calendar.updateSize();
        }
      }, 310);
    },
    lang(newLang) {
      this.calendarOptions.locale = this.$store.getters.getAppLanguage;
    }
  },

  mounted() {
    this.$paginateData.current_page = 1;
    this.$getPaginateNo("holidays");
    this.getDays(this.$moment().format("YYYY-MM-DD"));
    document.querySelector(".month_btn").classList.add("active");
    this.checkView();
  },
};
</script>

<style scope>
* {
  font-family: "Prompt", sans-serif;
}

main {
  color: #1a3c54;
}

div.box.card {
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25),
    0px 0px 4px 0px rgba(0, 0, 0, 0.1) inset;
  border-radius: 50px;
  background-color: #fff;
}

div.card-small {
  border-radius: 29px;
  background: var(--unnamed, #fff);
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.25),
    0px 0px 4px 0px rgba(0, 0, 0, 0.1) inset;
}

.active {
  background-color: #36a1ea;
  color: white;
}
</style>
