<template>
    <div class="w-75 mx-auto">
        <div class="flex gap-4 items-start">
            <div v-if="showMonth" class="w-full">
                <select name="monthPicker" id="monthPicker" class="w-full rounded-lg" v-model="date.month"
                    @change="handleMonthPick" required>
                    <option value="" hidden selected>{{ $t('chooseMonth') }}</option>
                    <option value="1">{{ $t('January') }} </option>
                    <option value="2">{{ $t('February') }} </option>
                    <option value="3">{{ $t('March') }} </option>
                    <option value="4">{{ $t('April') }} </option>
                    <option value="5">{{ $t('May') }} </option>
                    <option value="6">{{ $t('June') }} </option>
                    <option value="7">{{ $t('July') }} </option>
                    <option value="8">{{ $t('August') }} </option>
                    <option value="9">{{ $t('September') }} </option>
                    <option value="10">{{ $t('October') }} </option>
                    <option value="11">{{ $t('November') }} </option>
                    <option value="12">{{ $t('December') }} </option>
                </select>
            </div>
            <div v-if="showYear" class="w-full">
                <VueDatePicker year-picker v-model="date.year" @update:model-value="handleYear"></VueDatePicker>
                <small>{{ errors.year }}</small>
            </div>
        </div>

        <FullCalendar ref="cc" class="mt-4 text-primary h-auto w-full" :options="calendarOptions">
        </FullCalendar>
        <div class="float-right">
            <div class="mb-2">
                <input type="checkbox" id="checkboxMonth" class="mr-2 rounded-md w-6 h-6" v-model="showMonth"
                    @change="onShowMonthTick" :true-value="1" :false-value="0">
                <label for="checkboxMonth">Show Month</label>
            </div>
            <div class="mb-2">
                <input type="checkbox" id="checkBoxYear" class="mr-2 rounded-md w-6 h-6" v-model="showYear"
                    @change="onShowYearTick" :true-value="1" :false-value="0">
                <label for="checkBoxYear">Show Year</label>
            </div>
        </div>
    </div>
</template>

<script>
import '@fullcalendar/core/vdom';
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
import { mapState } from 'vuex';

export default {
    name: 'Calendar',
    components: { FullCalendar },
    props: ['errors', 'selectedDatesProp'],
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin, momentPlugin],
                initialView: 'dayGridMonth',
                initialDate: '2024-01-01',
                headerToolbar: {
                    start: '',
                    center: '',
                    end: ''
                },
                showNonCurrentDates: false,
                dateClick: this.dateClick,
                // events: []
            },
            selectedDates: [], //array of selected dates in the calendar
            showMonth: 0, // for show month check box
            showYear: 0, // for show year check box
            date: {
                month: '', //month number binding if showMonth box is true, eg: 1 for January and etc ...
                year: '', //year number binding if showYear box is true, eg: 2023, 2024, etc ...
            },
        }
    },
    methods: {
        dateClick(info) {
            let clickedDate = document.querySelectorAll("[data-date='" + info.dateStr + "'] div.fc-daygrid-day-frame.fc-scrollgrid-sync-inner")
            if (!clickedDate[0].querySelector('.fc-clicked-date-highlight')) {
                const highlightDiv = document.createElement('div')
                highlightDiv.className = 'fc-clicked-date-highlight'
                clickedDate[0].append(highlightDiv)
                const [year, month, day] = info.dateStr.split('-')
                this.selectedDates.push({
                    year: parseInt(year),
                    month: parseInt(month.replace(/^0+/, '')),
                    day: parseInt(day.replace(/^0+/, ''))
                })
                console.log(this.selectedDates);
            } else {
                const divToRemove = clickedDate[0].querySelector('.fc-clicked-date-highlight')
                divToRemove.remove()
                const [year, month, day] = info.dateStr.split('-')
                const dateToRemove = {
                    year: parseInt(year),
                    month: parseInt(month.replace(/^0+/, '')),
                    day: parseInt(day.replace(/^0+/, ''))
                }
                this.selectedDates = this.selectedDates.filter(date => {
                    return !(date.year === dateToRemove.year && date.month === dateToRemove.month && date.day === dateToRemove.day)
                })
                console.log(this.selectedDates);
            }
        },
        handleMonthPick() {
            let date
            if (this.date.year) {
                date = this.date.month + '/' + this.date.year
            } else {
                date = this.date.month + '/' + this.$moment().format("YYYY");
            }
            console.log('calendar go to date', this.$moment(date, 'M/YYYY').format("YYYY/MM/DD"))
            console.log('only month number', this.date.month)
            this.$refs.cc.calendar.gotoDate(this.$moment(date, 'M/YYYY').format("YYYY-MM-DD"))
            //highlight dates
            for (let sDate of this.selectedDates) {
                console.log(sDate);
                let highlightDate = document.querySelectorAll("[data-date='" + sDate + "'] div.fc-daygrid-day-frame.fc-scrollgrid-sync-inner")
                const highlightDiv = document.createElement('div')
                highlightDiv.className = 'fc-clicked-date-highlight'
                highlightDate[0]?.append(highlightDiv)
            }
        },
        handleYear(data) {
            let date
            if (this.date.month) {
                let month = this.date.month < 10 ? '0' + this.date.month : this.date.month
                console.log(month);
                date = this.$moment(this.date.year + '-' + month + '-01').format("YYYY-MM-DD")
            } else {
                date = this.$moment(data, "YYYY").format("YYYY-MM-DD")
            }
            console.log(date);
            this.$refs.cc.calendar.gotoDate(date);
            console.log(this.date.year);
        },
        onShowMonthTick() {
            this.selectedDates = []
            this.date.month = 1
            let highlightedDate = document.querySelectorAll('div.fc-clicked-date-highlight')
            for (let date of highlightedDate) {
                date.remove();
            }
            this.$refs.cc.calendar.gotoDate('2024-01-01')
        },
        onShowYearTick() {
            this.selectedDates = []
        }
    },

    computed: {
        ...mapState({
            shiftTimeData: state => state.checkin.shiftTimeData,
            lang: state => state.authentication.appLanguage
        })
    },

    watch: {
        shiftTimeData: {
            handler(val) {
                if (val && val.regular_shift === 0) {
                    this.showMonth = val.showMonth
                    this.showYear = val.showYear
                    this.date = {
                        month: val.month,
                        year: val.year
                    }
                    this.selectedDates.push(...val.selectedDates)
                    for (let date of this.selectedDates) {
                        let month = date.month.toString().padStart(2, '0')
                        let day = date.day.toString().padStart(2, '0')
                        let dateToHighlight = `${date.year}-${month}-${day}`
                        let divToHighlight = document.querySelectorAll("[data-date='" + dateToHighlight + "'] div.fc-daygrid-day-frame.fc-scrollgrid-sync-inner")
                        const highlightDiv = document.createElement('div')
                        highlightDiv.className = 'fc-clicked-date-highlight'
                        divToHighlight[0].append(highlightDiv)
                    }
                }
            }
            , deep: true
        },
        lang(newLang) {
            this.calendarOptions.locale = this.$store.getters.getAppLanguage;
        }
    },

    mounted() {
        this.selectedDates = []
        // this.displayDate = this.$moment(this.$refs.cc.calendar.getDate()).format("MMMM YYYY")
    }
}
</script>
<style>
.fc-clicked-date-highlight {
    width: 60%;
    height: 70%;
    background-color: #B6D5FF;
    position: absolute;
    border-radius: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.month_only_picker .dp__selection_grid_header,
.month_only_picker .dp__selection_preview {
    display: none;
}

.fc-scroller.fc-scroller-liquid-absolute {
    overflow: hidden;
}
</style>
