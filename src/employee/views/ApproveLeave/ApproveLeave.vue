<template>
  <nav class="px-4">
    <h1 class="tab mt-5 bg-white px-10 py-3 inline-block text-origin font-semibold">
      ข้อมูลพนักงาน
    </h1>
  </nav>
  <main class="px-4">
    <BaseModal :isOpen="reasonPopup" @closeModal="closeReasonPopUp" :classList="'w-full md:w-[30vw]'">
      <template #title>
        <h1>{{ $t('reason') }}</h1>
      </template>
      <template #container>
        <form action="" class="my-5" @submit.prevent="submit">
          <div class="grid gap-3 px-10 py-6">
            <label for="reason">{{ $t('reason') }}</label>
            <textarea v-model="form.approved_reason" name="reason" rows='10' cols="30" type="text"
              class="text-sm rounded-xl" :class="$errorBorder('approved_reason')"></textarea>
            <em :class="$errorText('approved_reason')">{{ errors.approved_reason }}</em>
          </div>
          <div class="flex justify-center items-center gap-5 w-full">
            <button
              class="w-[80%] md:w-1/3 border-2 border-danger text-danger font-normal py-2 rounded-xl hover:bg-danger hover:text-white transition-all duration-500"
              type="button" @click="closeReasonPopUp">
              {{ $t("cancel") }}
            </button>
            <button
              class="shadow w-[80%] md:w-1/3 border-2 border-origin bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
              type="submit" :disabled="btnDisable">
              {{ $t("save") }}
            </button>
          </div>
        </form>
      </template>
      <template #footer>
        <div></div>
      </template>
    </BaseModal>

    <BaseModal :isOpen="infoModal" :classList="'w-full md:w-[30vw]'">
      <template #title>
        <div class="">
          <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120"
            fill="none">
            <circle cx="60" cy="60" r="60" fill="#FAFAFB" />
            <circle cx="60" cy="60" r="57.5" stroke="#AEF359" stroke-opacity="0.5" stroke-width="5" />
            <path d="M32 64.4286L48.2857 80.7143L89 40" stroke="#74B72E" stroke-width="6.10714" stroke-linecap="round"
              stroke-linejoin="round" />
          </svg>
        </div>
      </template>
      <template #container>
        <div class="text-center px-14 grid gap-3 mb-10">
          <h1 v-if="form.is_approved === 1" class="text-2xl text-primary font-medium">อนุมัติสำเร็จ!</h1>
          <h1 v-if="form.is_approved === 2" class="text-2xl text-primary font-medium">ยกเลิกสำเร็จ!</h1>
          <h2 v-if="form.is_approved === 1" class="">ทำการยื่นคำขอลางานเรียบร้อยแล้ว</h2>
          <h2 v-if="form.is_approved === 2" class="">ทำการยกเลิกคำขอลางานเรียบร้อยแล้ว</h2>
          <h2>{{ $t('name') }}การลา: {{ form.leaveName }} </h2>
          <h2>{{ $t('department') }}: {{ form.employee.company_name }}</h2>
          <h2>{{ $t('position') }}: {{ form.employee.position_name }}</h2>
          <h2>{{ $t('reason') }}: {{ this.form.reason }}</h2>
        </div>
      </template>
      <template #footer>
        <div class="text-center">
          <button
            class="shadow w-[80%] md:w-1/3 border-2 border-origin bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
            type="button" :disabled="btnDisable" @click="confirm">
            ตกลง
          </button>
        </div>
      </template>
    </BaseModal>


    <div class="relative bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex items-center gap-3 p-8 md:p-0 md:mb-10">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-3xl">{{ $t('reqLeave') }}</h1>
      </div>
      <div class="grid md:flex md:justify-between items-center mb-5 px-14 gap-3 md:gap-0 md:px-0">
        <div class="grid md:flex flex-wrap gap-3">
          <select class="md:w-48 rounded-xl" name="" id="" required>
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="30">แสดง 30 แถว</option>
            <option value="50">แสดง 50 แถว</option>
          </select>
          <div class="flex">
            <div
              class="hidden md:flex items-center justify-center border border-slate-300 rounded-l-xl px-2 duration-200 hover:bg-gray-100">
              <font-awesome-icon icon="fa-solid fa-filter" class="text-primary"></font-awesome-icon>
            </div>
            <VueDatePicker class="md:w-48" input-class-name="rounded-xl md:rounded-l-none" placeholder="วันที่">
            </VueDatePicker>
          </div>
          <div
            class="hidden md:flex items-center justify-center border border-slate-300 rounded-xl w-11 duration-200 hover:bg-gray-100">
            <img src="@/assets/images/excel.svg" alt="">
          </div>
          <div
            class="hidden md:flex items-center justify-center border border-slate-300 rounded-xl w-11 duration-200 hover:bg-gray-100">
            <img src="@/assets/images/printer.svg" alt="">
          </div>
        </div>
        <div class="grid gap-3">
          <div class="relative">
            <input class="w-full md:w-56 rounded-xl placeholder:text-slate-300" type="text" placeholder="ค้นหา" />
            <font-awesome-icon class="text-slate-300 absolute right-3 top-3" icon="fa-solid fa-search" />
          </div>
          <div class="md:hidden flex justify-end items-stretched gap-3">
            <div
              class="flex items-center justify-center border border-slate-300 rounded-xl w-11 py-1 duration-200 hover:bg-gray-100">
              <img src="@/assets/images/excel.svg" alt="">
            </div>
            <div
              class="flex items-center justify-center border border-slate-300 rounded-xl w-11 duration-200 hover:bg-gray-100">
              <img src="@/assets/images/printer.svg" alt="">
            </div>
          </div>
        </div>

      </div>

      <div class="overflow-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
                {{ $t("no.") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">{{ $t('employee') }}</th>
              <th scope="col" class="px-2 py-2 font-medium">{{ $t('date') }}</th>
              <th scope="col" class="px-2 py-2 font-medium">{{ $t('leavename') }}</th>
              <th scope="col" class="px-2 py-2 font-medium">{{ $t('reason') }}</th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t('start') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t('end') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t('totalDay') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t('requestLeaveDate') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t('approve') }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
                {{ $t('approveDate') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, index) in tableData" :key="index" class="h-16" :class="checkColor(data.is_approved)">
              <td class="px-2 py-1 whitespace-nowrap">{{ ++index }}</td>
              <td class="py-1 px-5">
                {{ data.employee.user.firstname }}
                {{ data.employee.user.lastname }}
              </td>
              <td class="py-1 px-2 whitespace-nowrap">
                {{ this.$moment(data.created_at).format("DD/MM/YYYY") }}
              </td>
              <td class="py-1 px-2 whitespace-nowrap">
                {{ leaveType(data.onleaveday.onleavetype.name) }}
              </td>
              <td class="py-1 px-5">
                {{ data.reason }}
              </td>
              <td class="py-1 px-2 whitespace-nowrap">
                {{ this.$moment(data.start).format("HH:mm") }}
              </td>
              <td class="py-1 px-2 whitespace-nowrap">
                {{ this.$moment(data.end).format("HH:mm") }}
              </td>
              <td class="py-1 px-2 whitespace-nowrap">
                {{ data.time }}
              </td>
              <td class="py-1 px-2 whitespace-nowrap">
                {{ this.$moment(data.onleaveday.created_at).format("DD/MM/YYYY") }}
              </td>
              <td class="py-1 px-2 whitespace-nowrap">
                <div class="flex" v-if="data.is_approved === 0">
                  <div @click="showPopup(1, data.id, data.employee, data.onleaveday_id, data.reason)"
                    class="flex items-center border shadow-xl rounded-l-large px-3 cursor-pointer transition-all duration-200 hover:bg-gray-100">
                    <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"
                      fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M20.884 5.03171C18.5203 3.97851 15.8795 3.7176 13.3554 4.28788C10.8313 4.85817 8.55921 6.22909 6.87792 8.1962C5.19663 10.1633 4.19626 12.6212 4.02599 15.2033C3.85573 17.7854 4.5247 20.3534 5.93313 22.5242C7.34157 24.695 9.414 26.3524 11.8413 27.2492C14.2687 28.146 16.9209 28.2341 19.4024 27.5004C21.8839 26.7667 24.0618 25.2505 25.6112 23.1779C27.1606 21.1053 27.9985 18.5874 28 15.9997V14.7738C28 14.0374 28.5969 13.4405 29.3333 13.4405C30.0697 13.4405 30.6667 14.0374 30.6667 14.7738V16.0005C30.6648 19.1632 29.6407 22.2414 27.747 24.7746C25.8533 27.3077 23.1915 29.1609 20.1585 30.0576C17.1255 30.9544 13.884 30.8467 10.9172 29.7506C7.95045 28.6546 5.41747 26.6288 3.69605 23.9756C1.97464 21.3224 1.15701 18.1837 1.36511 15.0278C1.5732 11.8719 2.79588 8.86785 4.85079 6.46361C6.9057 4.05937 9.68273 2.38379 12.7677 1.68678C15.8527 0.989768 19.0804 1.30866 21.9693 2.5959C22.642 2.89561 22.9443 3.68384 22.6446 4.35647C22.3449 5.0291 21.5566 5.33142 20.884 5.03171Z"
                        fill="#4CAF50" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M30.2757 4.39005C30.7966 4.91049 30.797 5.75471 30.2766 6.27567L16.9433 19.6223C16.6933 19.8726 16.3541 20.0132 16.0003 20.0133C15.6466 20.0134 15.3073 19.8729 15.0572 19.6228L11.0572 15.6228C10.5365 15.1021 10.5365 14.2579 11.0572 13.7372C11.5779 13.2165 12.4221 13.2165 12.9428 13.7372L15.9995 16.7939L28.39 4.391C28.9105 3.87004 29.7547 3.86961 30.2757 4.39005Z"
                        fill="#4CAF50" />
                    </svg>
                  </div>
                  <div @click="showPopup(2, data.id, data.employee, data.onleaveday_id, data.reason)"
                    class="flex items-center border shadow-xl rounded-r-large px-3 py-1 cursor-pointer transition-all duration-200 hover:bg-gray-100">
                    <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                      fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M15.6629 3.77329C13.8902 2.9834 11.9096 2.78771 10.0165 3.21542C8.12345 3.64314 6.41936 4.67133 5.15839 6.14666C3.89743 7.62199 3.14715 9.4654 3.01945 11.402C2.89175 13.3386 3.39348 15.2645 4.44981 16.8927C5.50613 18.5208 7.06045 19.7638 8.88096 20.4364C10.7015 21.109 12.6906 21.1751 14.5518 20.6248C16.4129 20.0745 18.0463 18.9374 19.2083 17.3829C20.3704 15.8285 20.9988 13.9401 20.9999 11.9993V11.0799C20.9999 10.5276 21.4477 10.0799 21.9999 10.0799C22.5522 10.0799 22.9999 10.5276 22.9999 11.0799V11.9999C22.9986 14.3719 22.2305 16.6806 20.8102 18.5804C19.3899 20.4803 17.3936 21.8702 15.1188 22.5427C12.8441 23.2153 10.4129 23.1345 8.18786 22.3125C5.96279 21.4904 4.06306 19.9711 2.772 17.9812C1.48093 15.9913 0.867709 13.6373 1.02378 11.2704C1.17986 8.90346 2.09687 6.6504 3.63805 4.84722C5.17923 3.04404 7.262 1.78736 9.57575 1.2646C11.8895 0.741837 14.3102 0.981007 16.4769 1.94644C16.9814 2.17122 17.2082 2.76239 16.9834 3.26687C16.7586 3.77134 16.1674 3.99807 15.6629 3.77329Z"
                        fill="#F56666" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M16.6641 8.48161C17.003 8.14267 17.003 7.59314 16.6641 7.2542C16.3252 6.91527 15.7756 6.91527 15.4367 7.2542L11.9592 10.7317L8.4817 7.25423C8.14276 6.91529 7.59323 6.91529 7.25429 7.25423C6.91535 7.59317 6.91535 8.1427 7.25429 8.48164L10.7318 11.9591L7.25396 15.4369C6.91502 15.7759 6.91502 16.3254 7.25396 16.6643C7.5929 17.0033 8.14243 17.0033 8.48137 16.6643L11.9592 13.1865L15.437 16.6644C15.776 17.0033 16.3255 17.0033 16.6644 16.6644C17.0034 16.3254 17.0034 15.7759 16.6644 15.437L13.1866 11.9591L16.6641 8.48161Z"
                        fill="#F56666" />
                    </svg>
                  </div>
                </div>
                <div class="flex justify-center" v-else>
                  <div class="w-full" v-if="data.is_approved === 1">
                    <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"
                      fill="none">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M20.884 5.03171C18.5203 3.97851 15.8795 3.7176 13.3554 4.28788C10.8313 4.85817 8.55921 6.22909 6.87792 8.1962C5.19663 10.1633 4.19626 12.6212 4.02599 15.2033C3.85573 17.7854 4.5247 20.3534 5.93313 22.5242C7.34157 24.695 9.414 26.3524 11.8413 27.2492C14.2687 28.146 16.9209 28.2341 19.4024 27.5004C21.8839 26.7667 24.0618 25.2505 25.6112 23.1779C27.1606 21.1053 27.9985 18.5874 28 15.9997V14.7738C28 14.0374 28.5969 13.4405 29.3333 13.4405C30.0697 13.4405 30.6667 14.0374 30.6667 14.7738V16.0005C30.6648 19.1632 29.6407 22.2414 27.747 24.7746C25.8533 27.3077 23.1915 29.1609 20.1585 30.0576C17.1255 30.9544 13.884 30.8467 10.9172 29.7506C7.95045 28.6546 5.41747 26.6288 3.69605 23.9756C1.97464 21.3224 1.15701 18.1837 1.36511 15.0278C1.5732 11.8719 2.79588 8.86785 4.85079 6.46361C6.9057 4.05937 9.68273 2.38379 12.7677 1.68678C15.8527 0.989768 19.0804 1.30866 21.9693 2.5959C22.642 2.89561 22.9443 3.68384 22.6446 4.35647C22.3449 5.0291 21.5566 5.33142 20.884 5.03171Z"
                        fill="#4CAF50" />
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M30.2757 4.39005C30.7966 4.91049 30.797 5.75471 30.2766 6.27567L16.9433 19.6223C16.6933 19.8726 16.3541 20.0132 16.0003 20.0133C15.6466 20.0134 15.3073 19.8729 15.0572 19.6228L11.0572 15.6228C10.5365 15.1021 10.5365 14.2579 11.0572 13.7372C11.5779 13.2165 12.4221 13.2165 12.9428 13.7372L15.9995 16.7939L28.39 4.391C28.9105 3.87004 29.7547 3.86961 30.2757 4.39005Z"
                        fill="#4CAF50" />
                    </svg>
                  </div>
                  <div class="" v-if="data.is_approved === 2">
                    <span class=""> {{ data.approved_reason }}</span>
                  </div>
                </div>
              </td>
              <td class="py-1 px-2 whitespace-nowrap">
                {{ this.$moment(data.approved_date).format("DD/MM/YYYY") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in tableData" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="this.$toggleAccordion(index, 'approveLeave')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`approveLeave-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{
              this.$moment(data.start).format("DD/MM/YYYY")
            }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium mb-2">{{ $t('employee') }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ data.employee.user.firstname }} {{ data.employee.user.lastname }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("date") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ this.$moment(data.created_at).format("DD/MM/YYYY") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("leavename") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ leaveType(data.onleaveday.onleavetype.name) }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("reason") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ data.reason }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("start") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ this.$moment(data.start).format("HH:mm") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("end") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ this.$moment(data.end).format("HH:mm") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("totalDay") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ data.time }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("requestLeaveDate") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ this.$moment(data.onleaveday.created_at).format("DD/MM/YYYY") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("approve") }}</h1>
              <div class="flex" v-if="data.is_approved === 0">
                <div @click="showPopup(1, data.id, data.employee, data.onleaveday_id, data.reason)"
                  class="flex items-center border shadow-xl rounded-l-large px-3 cursor-pointer transition-all duration-200 hover:bg-gray-100">
                  <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"
                    fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M20.884 5.03171C18.5203 3.97851 15.8795 3.7176 13.3554 4.28788C10.8313 4.85817 8.55921 6.22909 6.87792 8.1962C5.19663 10.1633 4.19626 12.6212 4.02599 15.2033C3.85573 17.7854 4.5247 20.3534 5.93313 22.5242C7.34157 24.695 9.414 26.3524 11.8413 27.2492C14.2687 28.146 16.9209 28.2341 19.4024 27.5004C21.8839 26.7667 24.0618 25.2505 25.6112 23.1779C27.1606 21.1053 27.9985 18.5874 28 15.9997V14.7738C28 14.0374 28.5969 13.4405 29.3333 13.4405C30.0697 13.4405 30.6667 14.0374 30.6667 14.7738V16.0005C30.6648 19.1632 29.6407 22.2414 27.747 24.7746C25.8533 27.3077 23.1915 29.1609 20.1585 30.0576C17.1255 30.9544 13.884 30.8467 10.9172 29.7506C7.95045 28.6546 5.41747 26.6288 3.69605 23.9756C1.97464 21.3224 1.15701 18.1837 1.36511 15.0278C1.5732 11.8719 2.79588 8.86785 4.85079 6.46361C6.9057 4.05937 9.68273 2.38379 12.7677 1.68678C15.8527 0.989768 19.0804 1.30866 21.9693 2.5959C22.642 2.89561 22.9443 3.68384 22.6446 4.35647C22.3449 5.0291 21.5566 5.33142 20.884 5.03171Z"
                      fill="#4CAF50" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M30.2757 4.39005C30.7966 4.91049 30.797 5.75471 30.2766 6.27567L16.9433 19.6223C16.6933 19.8726 16.3541 20.0132 16.0003 20.0133C15.6466 20.0134 15.3073 19.8729 15.0572 19.6228L11.0572 15.6228C10.5365 15.1021 10.5365 14.2579 11.0572 13.7372C11.5779 13.2165 12.4221 13.2165 12.9428 13.7372L15.9995 16.7939L28.39 4.391C28.9105 3.87004 29.7547 3.86961 30.2757 4.39005Z"
                      fill="#4CAF50" />
                  </svg>
                </div>
                <div @click="showPopup(2, data.id, data.employee, data.onleaveday_id, data.reason)"
                  class="flex items-center border shadow-xl rounded-r-large px-3 py-1 cursor-pointer transition-all duration-200 hover:bg-gray-100">
                  <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M15.6629 3.77329C13.8902 2.9834 11.9096 2.78771 10.0165 3.21542C8.12345 3.64314 6.41936 4.67133 5.15839 6.14666C3.89743 7.62199 3.14715 9.4654 3.01945 11.402C2.89175 13.3386 3.39348 15.2645 4.44981 16.8927C5.50613 18.5208 7.06045 19.7638 8.88096 20.4364C10.7015 21.109 12.6906 21.1751 14.5518 20.6248C16.4129 20.0745 18.0463 18.9374 19.2083 17.3829C20.3704 15.8285 20.9988 13.9401 20.9999 11.9993V11.0799C20.9999 10.5276 21.4477 10.0799 21.9999 10.0799C22.5522 10.0799 22.9999 10.5276 22.9999 11.0799V11.9999C22.9986 14.3719 22.2305 16.6806 20.8102 18.5804C19.3899 20.4803 17.3936 21.8702 15.1188 22.5427C12.8441 23.2153 10.4129 23.1345 8.18786 22.3125C5.96279 21.4904 4.06306 19.9711 2.772 17.9812C1.48093 15.9913 0.867709 13.6373 1.02378 11.2704C1.17986 8.90346 2.09687 6.6504 3.63805 4.84722C5.17923 3.04404 7.262 1.78736 9.57575 1.2646C11.8895 0.741837 14.3102 0.981007 16.4769 1.94644C16.9814 2.17122 17.2082 2.76239 16.9834 3.26687C16.7586 3.77134 16.1674 3.99807 15.6629 3.77329Z"
                      fill="#F56666" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M16.6641 8.48161C17.003 8.14267 17.003 7.59314 16.6641 7.2542C16.3252 6.91527 15.7756 6.91527 15.4367 7.2542L11.9592 10.7317L8.4817 7.25423C8.14276 6.91529 7.59323 6.91529 7.25429 7.25423C6.91535 7.59317 6.91535 8.1427 7.25429 8.48164L10.7318 11.9591L7.25396 15.4369C6.91502 15.7759 6.91502 16.3254 7.25396 16.6643C7.5929 17.0033 8.14243 17.0033 8.48137 16.6643L11.9592 13.1865L15.437 16.6644C15.776 17.0033 16.3255 17.0033 16.6644 16.6644C17.0034 16.3254 17.0034 15.7759 16.6644 15.437L13.1866 11.9591L16.6641 8.48161Z"
                      fill="#F56666" />
                  </svg>
                </div>
              </div>
              <div class="" v-else>
                <div class="w-full" v-if="data.is_approved === 1">
                  <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"
                    fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M20.884 5.03171C18.5203 3.97851 15.8795 3.7176 13.3554 4.28788C10.8313 4.85817 8.55921 6.22909 6.87792 8.1962C5.19663 10.1633 4.19626 12.6212 4.02599 15.2033C3.85573 17.7854 4.5247 20.3534 5.93313 22.5242C7.34157 24.695 9.414 26.3524 11.8413 27.2492C14.2687 28.146 16.9209 28.2341 19.4024 27.5004C21.8839 26.7667 24.0618 25.2505 25.6112 23.1779C27.1606 21.1053 27.9985 18.5874 28 15.9997V14.7738C28 14.0374 28.5969 13.4405 29.3333 13.4405C30.0697 13.4405 30.6667 14.0374 30.6667 14.7738V16.0005C30.6648 19.1632 29.6407 22.2414 27.747 24.7746C25.8533 27.3077 23.1915 29.1609 20.1585 30.0576C17.1255 30.9544 13.884 30.8467 10.9172 29.7506C7.95045 28.6546 5.41747 26.6288 3.69605 23.9756C1.97464 21.3224 1.15701 18.1837 1.36511 15.0278C1.5732 11.8719 2.79588 8.86785 4.85079 6.46361C6.9057 4.05937 9.68273 2.38379 12.7677 1.68678C15.8527 0.989768 19.0804 1.30866 21.9693 2.5959C22.642 2.89561 22.9443 3.68384 22.6446 4.35647C22.3449 5.0291 21.5566 5.33142 20.884 5.03171Z"
                      fill="#4CAF50" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M30.2757 4.39005C30.7966 4.91049 30.797 5.75471 30.2766 6.27567L16.9433 19.6223C16.6933 19.8726 16.3541 20.0132 16.0003 20.0133C15.6466 20.0134 15.3073 19.8729 15.0572 19.6228L11.0572 15.6228C10.5365 15.1021 10.5365 14.2579 11.0572 13.7372C11.5779 13.2165 12.4221 13.2165 12.9428 13.7372L15.9995 16.7939L28.39 4.391C28.9105 3.87004 29.7547 3.86961 30.2757 4.39005Z"
                      fill="#4CAF50" />
                  </svg>
                </div>
                <div class="" v-if="data.is_approved === 2">
                  <span class=""> {{ data.approved_reason }}</span>
                </div>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("approveDate") }}</h1>
              <span class="text-h1mute text-sm capitalize">
                {{ this.$moment(data.approved_date).format("DD/MM/YYYY") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("delete") }}</h1>
              <div @click="
                $deleteData(
                  'emp-request-leave',
                  'emp-onleave-reports',
                  data.id,
                  'leaves'
                )
                "
                class="flex justify-start items-center w-10 mb-3 border-2 shadow-lg rounded-large p-1.5 transition-all duration-200 hover:bg-gray-100">
                <img class="w-6 h-6 mx-auto" src="@/assets/images/bin.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center md:justify-end items-center gap-2 text-xs text-h1mute mt-5">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getPaginateNo('emp-leaves', 'leaves')" hideFirstButton hideLastButton />
      </div>

    </div>
  </main>
</template>

<script>
var data = {
  onleaveday_id: '',
  start_date: '',
  end_date: '',
  leaveperiod_id: '',
  approved_reason: '',
  id: '',
  leaveName: '',
  employee: {},
  reason: ''
}

export default {
  name: "Approve Leave",
  data() {
    return {
      loading: false,
      color: '#36A1EA',
      size: '20px',
      approveLeaveModal: false,
      reasonPopup: false,
      infoModal: false,
      form: { ...data },
      errors: { ...data },
      tableData: {},
    }
  },
  methods: {
    approveLeave() {
      this.approveLeaveModal = true
    },

    closeModal() {
      this.approveLeaveModal = false
      this.reasonPopup = false
    },

    showPopup(status, id, employeeInfo, leave_id, reason) {
      this.form.is_approved = status;
      this.form.id = id
      this.form.employee = employeeInfo
      this.form.leaveName = this.checkLeaveName(leave_id)
      this.reasonPopup = true;
      this.form.reason = reason
    },

    submit() {
      if (this.form.is_approved === 1) {
        this.loading = true
        this.axios.post('emp-approve-leave', this.form).then((res) => {
          if (res.data.success === true) {
            this.infoModal = true;
            this.closeModal();
          } else if (res.data.success === false) {
            if (this.$errorMsg(res.data.message)) {
              this.$swal({
                icon: "error",
                title: "Error",
                text: res.data.message,
              });
            }
            this.$validateMsg(res.data.message);
          }
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          this.$getEmployeePaginateNo('emp-leaves', 'leaves', this.filter, true)
        })
      } else if (this.form.is_approved === 2) {
        this.loading = true
        this.axios.post('emp-reject-leave', this.form).then((res) => {
          if (res.data.success == true) {
            this.infoModal = true;
            this.closeModal()
          }
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          this.loading = false
        })
      }
    },

    confirm() {
      this.infoModal = false;
      this.form = { ...data }
    },

    closeReasonPopUp() {
      this.form = { ...data }
      this.reasonPopup = false;
    },

    leaveType(leaveName) {
      const words = leaveName.split(' ');
      const filteredWords = words.filter(word => !word.includes("requests"));
      let newString = filteredWords.join(' ');
      return newString.charAt(0).toUpperCase() + newString.slice(1);
    },

    checkColor(status) {
      if (status == 1) {
        return 'text-green-400'
      } else if (status == 2) {
        return 'text-red-500'
      } else {
        return 'text-primary'
      }
    },

    checkLeaveName(leavename) {
      if (leavename == 1) {
        return this.$t('personalLeave');
      } else if (leavename == 2) {
        return this.$t('sickLeave');
      }
      else if (leavename == 3) {
        return this.$t('summerLeave');
      }
      else if (leavename == 4) {
        return this.$t('specialLeave');
      }
      else if (leavename == 5) {
        return this.$t('withoutPayLeave');
      }
    }

  },
  mounted() {
    this.$getEmployeePaginateNo('emp-leaves', 'leaves', this.filter, true)
    // this.loading = true;
  }
};
</script>

<style lang="scss" scoped></style>
