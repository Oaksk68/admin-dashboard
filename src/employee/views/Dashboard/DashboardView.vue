<template>
  <main class="mb-8">
    <teleport to="body">
      <BaseModal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </BaseModal>
    </teleport>
    <div class="md:m-3 md:px-0">
      <!-- start your work section -->
      <div
        class="text-primary box w-[95%] mx-auto md:w-full md:min-h-60 flex flex-wrap md:flex-row flex-col justify-around items-center bg-origin rounded-[75px] mt-3 start-work-section overflow-hidden">
        <div class="flex flex-col flex-0 items-baseline gap-2">
          <h1 class="text-white text-[30px] lg:text-[40px] font-semibold text-nowrap">
            เริ่มต้น
          </h1>
          <h3 class="text-white text-xl lg:text-[30px] font-medium text-nowrap">
            การทำงานของคุณ
          </h3>
        </div>

        <!-- right section of start work -->
        <div class="flex flex-wrap h-full right-section pb-6 justify-around w-full md:w-[60%]">
          <div @click="this.$router.push({ name: 'Calendar' })"
            class="w-1/2 lg:w-1/4 md:hover:bg-white md:hover:bg-opacity-20 active:bg-white active:bg-opacity-20 rounded-[2.5rem] my-5 lg:my-0 lg:rounded-t-none md:rounded-b-[2.5rem] cursor-pointer">
            <div class="flex flex-col justify-center items-center mt-8">
              <div class="shadowBox relative bg-white w-[5.5rem] h-[5.5rem]">
                <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12"
                  src="@/assets/images/holiday.svg" alt="" />
              </div>
              <div class="flex flex-col break-words">
                <h1 class="text-white text-center mt-3 mb-1">{{ $t('holiday') }}</h1>
                <span class="text-center text-xs text-mute">กำหนดการหยุดต่างๆ</span>
              </div>
            </div>
          </div>
          <div @click="this.$router.push({ name: 'Attendance' })"
            class="w-1/2 lg:w-1/4 md:hover:bg-white md:hover:bg-opacity-20 active:bg-white active:bg-opacity-20 rounded-[2.5rem] my-5 lg:my-0 lg:rounded-t-none rounded-b-[2.5rem] cursor-pointer">
            <div class="flex flex-col justify-center items-center mt-8">
              <div class="shadowBox relative bg-white w-[5.5rem] h-[5.5rem]">
                <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12"
                  src="@/assets/images/work.svg" alt="" />
              </div>
              <div class="flex flex-col">
                <h1 class="text-white text-center mt-3 mb-1">ประวัติ เข้า-ออก งาน</h1>
                <span class="text-center text-xs text-mute">ข้อมูลการเข้าออกงาน</span>
              </div>
            </div>
          </div>
          <div @click="this.$router.push({ name: 'Employee-MonthlyLateAbsenceOnLeave' })"
            class="w-1/2 lg:w-1/4 md:hover:bg-white md:hover:bg-opacity-20 active:bg-white active:bg-opacity-20 rounded-[2.5rem] my-5 lg:my-0 lg:rounded-t-none rounded-b-[2.5rem] cursor-pointer">
            <div class="flex flex-col justify-center items-center mt-8">
              <div class="shadowBox relative bg-white w-[5.5rem] h-[5.5rem]">
                <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12"
                  src="@/assets/images/MonthlyReport.png" alt="" />
              </div>
              <h1 class="text-white text-center mt-3 mb-1">รายงานรายเดือน</h1>
              <span class="text-center text-xs text-mute">รายงานขาดลามาสาย</span>
            </div>
          </div>
          <div @click="this.$router.push({ name: 'Employee-AnnualLeave' })"
            class="w-1/2 lg:w-1/4 md:hover:bg-white md:hover:bg-opacity-20 active:bg-white active:bg-opacity-20 rounded-[2.5rem] my-5 lg:my-0 lg:rounded-t-none rounded-b-[2.5rem] cursor-pointer">
            <div class="flex flex-col justify-center items-center mt-8">
              <div class="shadowBox relative bg-white w-[5.5rem] h-[5.5rem]">
                <img class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12"
                  src="@/assets/images/YearlyReport.png" alt="" />
              </div>
              <h1 class="text-white text-center mt-3 mb-1">การ เข้า-ออกงาน <br />ประจำปี</h1>

            </div>
          </div>
        </div>
      </div>

      <!-- 3rd section -->
      <div class="md:flex md:gap-3">
        <div
          class="mx-auto flex flex-col lg:flex-row w-[95%] lg:w-full bg-white border rounded-[70px] border-gray-200 md:rounded-[70px] box mt-4 mb-5 md:mb-0">
          <!-- calendar details -->
          <div class="md:bg-none lg:w-[60%] relative md:mb-0">
            <div class="md:h-full dashboard-calendar">
              <FullCalendar ref="cc" class="p-10 lg:p-6 lg:pb-2 md:pb-0 text-primary w-full" :options="calendarOptions">
              </FullCalendar>
              <div class="flex flex-wrap items-baseline gap-3 justify-end mr-3 my-4">
                <div class="flex justify-end items-center gap-1 w-1/5">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="7.5" stroke="#1A3C54" stroke-width="2" />
                  </svg>
                  <span class="text-muted text-sm">วันนี้</span>
                </div>
                <div class="flex justify-end items-center gap-1 w-1/5">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(245, 102, 102, 1)"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(245, 102, 102, 1)" stroke-width="2" />
                  </svg>
                  <span class="text-muted text-sm">{{ $t('holiday') }}</span>
                </div>
                <div class="flex justify-end items-center gap-1 w-1/5">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(156, 228, 82, 1)"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(156, 228, 82, 1)" stroke-width="2" />
                  </svg>
                  <span class="text-muted text-sm">{{ $t('summerLeave') }}</span>
                </div>
                <div class="flex justify-end items-center gap-1 w-1/5">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(182, 213, 255, 1)"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(182, 213, 255, 1)" stroke-width="2" />
                  </svg>
                  <span class="text-muted text-sm">{{ $t('personalLeave') }}</span>
                </div>
                <div class="flex justify-end items-center gap-1 w-1/5">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(255, 168, 87, 1)"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(255, 168, 87, 1)" stroke-width="2" />
                  </svg>
                  <span class="text-muted text-sm">{{ $t('specialLeave') }}</span>
                </div>
                <div class="flex justify-end items-center gap-1 w-1/5">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(255, 199, 115, 1)"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(255, 199, 115, 1)" stroke-width="2" />
                  </svg>
                  <span class="text-muted text-sm">{{ $t('sickLeave') }}</span>
                </div>
                <div class="flex justify-end items-center gap-1 w-1/5">
                  <svg width="17" height="17" viewBox="0 0 17 17" fill="rgba(172, 175, 182, 1)"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8.5" cy="8.5" r="7.5" stroke="rgba(172, 175, 182, 1)" stroke-width="2" />
                  </svg>
                  <span class="text-muted text-sm">ไม่รับเงิน</span>
                </div>
              </div>
            </div>
          </div>
          <!-- date details -->
          <div id=""
            class="w-full relative lg:w-[40%] box-calendar bg-calendarBg text-primary lg:pt-[18px] p-4 pb-8 rounded-b-[70px] lg:rounded-b-none lg:rounded-r-[70px]">
            <div class="flex items-center gap-2 mt-2">
              <div class="w-1 h-8 bg-[#FEB51F] rounded-2xl"></div>
              <h1 class="text-2xl font-medium text-primary">
                {{ $t("Holidays_in") }}
                {{ monthName }}
                <!-- {{
                  this.$moment(month.date)
                    .locale(this.$store.getters.getAppLanguage)
                    .format("MMM YYYY")
                }} -->
              </h1>
            </div>
            <div id="dashboardContainer"
              class="relative font-semibold overflow-hidden mr-2 mt-5 hover:mr-0 hover:overflow-auto"
              :class="containerLoading ? 'bg-black bg-opacity-20' : ''">
              <!-- info cards -->
              <div v-for="(leaveDay, index) in holidays" :key="index">
                <div v-for="(holiday, index) in leaveDay" :key="index" class="text-primary rounded-r-3xl max-h-[566px]">
                  <div id="" class="card-small font-semibold mb-2">
                    <div class="flex bg-white rounded-3xl pl-2 h-[4.5rem] mt-1">
                      <div class="text-origin text-xl text-center flex flex-col justify-center items-center pl-2">
                        <span class="text-xl pl-2 pt-2 font-medium">
                          {{ holiday.month }}
                        </span>
                        <span class="text-2xl text-center w-full">{{
                          holiday.dateNum
                        }}</span>
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
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// import FcComp from "@/components/FcComp.vue";
import '@fullcalendar/core/vdom'
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { collapsed } from "@/components/js/state";
// import $ from "jquery";
import { Popover } from "flowbite";

export default {
  components: { FullCalendar },
  data() {
    return {
      collapsed,
      loading: true,
      loaded: false,
      color: "#36A1EA",
      size: "20px",
      dashboard: true,
      containerLoading: false,
      monthName: '',
      titlePosition: "left",
      rendered: false,
      month: {
        date: new Date(),
      },
      filter: {
        date: new Date(),
      },
      apiFetched: false,
      dashboardData: [],
      holidays: [],
      leaveDays: [],
      calendarOptions: {
        plugins: [interactionPlugin, dayGridPlugin],
        dateClick: this.handleDateClick,
        locale: this.$store.getters.getAppLanguage,
        showNonCurrentDates: false,
        handleWindowResize: true,
        datesSet: this.handleDatesSet,
        aspectRatio: 1.1,
        initialView: "dayGridMonth",
        weekends: true,
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
          start: "title", // will normally be on the left. if RTL, will be on the right
          center: "",
          end: "custPrev,custNext",
        },
        events: [
          {
            id: "e12",
            title: "Today",
            start: this.$moment().format("YYYY-MM-DD"),
            end: this.$moment().format("YYYY-MM-DD"),
            className: "today",
            eventType: "today",
          },
        ],
        eventDisplay: "auto",
        selectable: false,
      },
    };
  },

  methods: {
    async custPrev() {
      this.$refs.cc.calendar.prev();
      this.onNavClick();
    },
    async custNext() {
      this.$refs.cc.calendar.next();
      this.onNavClick();
    },

    onNavClick() {
      this.calendarOptions.events = [
        {
          id: "e12",
          title: "Today",
          start: this.$moment().format("YYYY-MM-DD"),
          end: this.$moment().format("YYYY-MM-DD"),
          className: "today",
        },
      ];
      this.month.date = this.$moment(this.$refs.cc.calendar.getDate()).format(
        "YYYY-MM"
      );
      this.monthName = this.$refs.cc.calendar.currentData.viewTitle.split(' ')[0];
      this.getDays();
    },

    dayRender() {
      this.apiFetched = false;
      const div = document.createElement("div");
      div.className = "connector";
      for (let a of this.calendarOptions.events) {
        let date = this.$moment(a.start).format("YYYY-MM-DD");
        let highlightDate = document.querySelector(
          '[data-date="' + date + '"] div div a'
        );
        let popover = document.querySelector('[data-date="' + date + '"] div ');
        let targetDiv = document.querySelector(
          '[data-date="' + date + '"] div div'
        );
        targetDiv?.setAttribute("id", `${a.id}trigger`);
        this.addPopover(popover, a);
        if (this.$moment(a.start).isSameOrAfter(a.end, "day")) {
          highlightDate?.classList.add(a.className, "myEvent");
        } else {
          let endDate = this.$moment(a.end).format("YYYY-MM-DD");
          let hightlightEndDate = document.querySelector(
            '[data-date="' + endDate + '"] div div a'
          );
          let divStart = document.createElement("div");
          divStart.classList.add(
            "connector",
            "start",
            this.checkConnectorColor(a.className)
          );
          let halfStart = document.querySelector(
            '[data-date="' + a.start + '"]'
          );
          halfStart?.append(divStart);
          let divEnd = document.createElement("div");
          divEnd.classList.add(
            "connector",
            "end",
            this.checkConnectorColor(a.className)
          );
          let halfEnd = document.querySelector('[data-date="' + endDate + '"]');
          halfEnd?.append(divEnd);

          hightlightEndDate?.classList.add(a.className, "myEvent");
          highlightDate?.classList.add(a.className, "myEvent");
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
              this.checkConnectorColor(a.className)
            );
            hightlightBetweenDate?.append(divBetween);
          }
        }
      }
      this.apiFetched = true;
      if (this.apiFetched) {
        this.appendPopOver();
      }
      // this.mouseOver();
    },

    addPopover(el, a) {
      // let startDate = this.$moment(a.start).format("DD/MM/YYYY");
      // let endDate = this.$moment(a.end).format("DD/MM/YYYY");
      const date = el?.querySelector(`[date="${a.start}"]`);
      if (date) {
        if (a.eventType == "Onleave") {
          date.innerHTML += `<div class="p-2 text-xs w-60 flex flex-col"><h1 class="pb-1 ${this.checkTextColor(
            a.className
          )} border-b border-dotted ${this.checkBorderColor(
            a.className
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
            a.className
          )}">{{$t('holiday')}}นักขัตฤกษ์</h1>
          <span class="text-primary mt-2 w-full capitalize">รายละเอียด :
            ${a.title}
          </span></div>`;
        }
      } else {
        const div = document.createElement("div");
        div.setAttribute(
          "class",
          "popoverTrigger p-1 absolute !z-[1035] invisible inline-block max-h-[21rem] overflow-auto transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0"
        );
        div.setAttribute("data-popover", "");
        div.setAttribute("date", a.start);
        div.setAttribute("role", "tooltip");
        if (a.eventType == "Onleave") {
          div.innerHTML = `<div class="p-2 text-xs w-60 flex flex-col"><h1 class="pb-1 ${this.checkTextColor(
            a.className
          )} border-b border-dotted ${this.checkBorderColor(
            a.className
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
          <div data-popper-arrow></div>
          </div>`;
          el?.appendChild(div);
        } else {
          div.innerHTML = `<div class="p-2 text-xs !w-60 flex flex-col"><h1 class="pb-1 text-red-500 border-b border-dotted ${this.checkBorderColor(
            a.className
          )}">{{$t('holiday')}}นักขัตฤกษ์</h1>
          <span class="text-primary mt-2 w-full capitalize">รายละเอียด :
            ${a.title}
          </span>
          <div data-popper-arrow></div>
          </div>`;
          el?.appendChild(div);
        }
        if (a.eventType == "today") {
          div.innerHTML = `<div class="p-2 text-xs text-center"><h3 class="${this.checkTextColor(
            a.className
          )}">วนนี้</h3>
          <div data-popper-arrow></div>
          </div>`;
          el?.appendChild(div);
        }
      }
    },

    appendPopOver() {
      for (let a of this.calendarOptions.events) {
        typeof a.id == "number" ? (a.id = a.id.toString()) : "";

        const $targetEl = document.querySelector(
          `[data-date="${a.start}"] div div.popoverTrigger`
        );
        // set the element that trigger the popover using hover or click
        const $triggerEl = document.querySelector(
          `[data-date="${a.start}"] div div`
        );
        // options with default values
        const options = {
          placement: "bottom",
          triggerType: "hover",
          offset: 0,
        };

        if (($targetEl, $triggerEl)) {
          const popover = new Popover($targetEl, $triggerEl, options);
          popover.hide();
        }
      }
    },

    checkConnectorColor(className) {
      switch (className) {
        case "sick_leave":
          return "bg-[#ffc773]";
        case "summer_leave":
          return "bg-[#9ce452]";
        case "special_leave":
          return "bg-[#ffa857]";
        case "holiday":
          return "bg-[#f99]";
        case "personal_leave":
          return "bg-[#b6d5ff]";
        case "withoutpay_leave":
          return "bg-[#acafb6]";
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

    checkGap(startDate, endDate) {
      if (endDate <= startDate) {
        return false;
      } else {
        return true;
      }
    },

    handleDateClick(e) {
      this.filter.date = e.date;
      this.getData();
    },

    handleHoliday(a) {
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

    getData() {
      this.loaded = false;
      this.axios
        .post("/dashboard", this.filter)
        .then((response) => {
          this.dashboardData = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
          this.loaded = true;
        });
    },

    async getDays() {
      await this.axios
        .post("holidays-leaves", this.month)
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
                e_name: day.e_name,
                title: day.title,
                start: this.$moment(day.date).format("YYYY-MM-DD"),
                end: day.end,
                className: day.className,
                positionName: day.position_name,
                departmentName: day.department_name,
                leaveName_th: day.leave_name_th,
                leaveName_en: day.leave_name_en,
                period_th: day.period_th,
                period_en: day.period_en,
              };
              this.calendarOptions.events.push(obj);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.dayRender();
          let events = document.getElementsByClassName("fc-daygrid-day-events");
          for (let event of events) {
            event.style.display = "none";
          }
        });
    },
    // fcMonthName() {
    //   const monthName = this.$refs.cc.calendar.currentData.viewTitle.split(' ')[0];
    //   console.log(monthName);
    // }
  },

  computed: {

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
    locale(val) {
      console.log(val);
    },
  },

  mounted() {
    this.getDays();
    this.getData();
    this.monthName = this.$refs.cc.calendar.currentData.viewTitle.split(' ')[0];
    // console.log('cc', this.$refs.cc.calendar.currentData.viewTitle);
  },
};
</script>

<style scoped>
* {
  font-family: "Prompt", sans-serif !important;
}

div#dashboardContainer::-webkit-scrollbar {
  width: 6px;
  overflow: hidden;
}

div#dashboardContainer::-webkit-scrollbar-track {
  background-color: transparent;
}

.shadowBox {
  /* 1 */
  border-radius: 25px;
  box-shadow: 0px 4px 4px 0px #1977b8, 0px 0px 4px 0px rgba(0, 0, 0, 0.25) inset;
}

box-calendar {
  fill: #e7f0fc;
  box-shadow: -2px 0px 4px 0px rgba(0, 0, 0, 0.1) inset;
}

div#chartBG {
  position: absolute;
  left: calc(50%);
  transform: translate(-50%, -50%);
  top: calc(50% + 51px);
  box-shadow: 0px 0px 9px 5px rgba(0, 0, 0, 0.2), inset 0px 0px 15px #36a1ea;
}

div#dashboardContainer {
  max-height: 400px;
}

hr {
  border: none;
  border-top: 1px dotted #f00;
  color: #fff;
  background-color: #fff;
  height: 1px;
  width: 50%;
}

.fc-daygrid-day-events :deep(.child) {
  display: hidden !important;
}

.start-work-section {
  @media screen and (max-width:767px) {
    padding: 28px 10px;
  }
}
</style>
