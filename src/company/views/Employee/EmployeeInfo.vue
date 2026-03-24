<template>
  <main class="px-4">
    <Modal v-if="loading">
      <template v-slot:container>
        <div class="">
          <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
        </div>
      </template>
    </Modal>

    <div class="py-3 ml-2">
      <h1 class="text-sm md:text-base font-normal">
        <Router-Link :to="{ name: 'Employee' }" class="text-muted cursor-pointer">พนักงาน > แก้ไขข้อมูล
        </Router-Link>
      </h1>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="tab bg-white px-10 py-3 inline-block text-origin font-semibold">
        {{ $t('employee_info') }}
      </h1>
      <div class="hidden md:block">
        <button @click="this.$router.back()"
          class="shadow h-10 w-40 mr-3 bg-white transition-all duration-300 border border-origin text-origin font-normal rounded-xl hover:bg-origin hover:text-white"
          type="button">
          {{ $t('go_back') }}
        </button>
      </div>
    </div>

    <div class="relative bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div @click="editEmployee"
        class="absolute right-6 top-5 md:static border rounded-full float-right p-2 hover:bg-sky-400 duration-300 shadow-lg bg-[rgba(240, 248, 254, 1)]">
        <img src="@/assets/images/edit.svg" alt="" />
      </div>
      <div class="md:flex flex-wrap pt-14 px-4 md:mt-0">
        <!-- <div class="border border-neutral-100 mt-5 rounded-full overflow-hidden w-[300px] h-[250px]"> -->
        <img class="w-[300px] h-[300px] border border-neutral-200 rounded-[30px]" :src="'https://onela.yoursrecord.com/backend/img/user/' + employeeData.image
          " alt="" />
        <!-- </div> -->
        <div class="md:ml-10 mt-5 md:mt-2 w-auto">
          <form action="submit" class="text-sm md:text-base">
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                {{ $t('name') }}พนักงาน
              </label>

              <span class="w-48 text-gray-400 py-1">
                {{ checkTitle }} {{ employeeData.firstname }}
                {{ employeeData.lastname }}
              </span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="">
                ยูสเซอร์เนม
              </label>

              <span class="w-48 text-gray-400 py-1">{{
                employeeData.username
              }}</span>
            </div>

            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="">
                วันเกิด
              </label>

              <span class="w-48 text-gray-400 py-1">{{
                this.$moment(employeeData.birthdate).format("DD-MM-YYYY")
              }}</span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                ที่อยู่
              </label>

              <span class="w-48 text-gray-400 py-1">{{
                employeeData.address
              }}</span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                โทรศัพท์
              </label>

              <span class="w-48 text-gray-400 py-1">{{
                employeeData.phone
              }}</span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                {{ $t("email") }}
              </label>

              <span class="w-48 text-gray-400 py-1">{{
                employeeData.email
              }}</span>
            </div>

            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="">
                ยืนยันอีเมล
              </label>

              <span class="flex items-center gap-2 w-48 text-gray-400 py-1">
                <div v-if="employeeData.active === 1" class="rounded-full bg-lime-400 w-3 h-3"></div>
                <div v-else class="rounded-full bg-red-500 w-3 h-3"></div>
                {{ checkEmailConfirm }}
              </span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="">
                สถานะ
              </label>

              <span class="flex items-center gap-2 w-48 text-gray-400 py-1">
                <div v-if="employeeData.status === 1" class="rounded-full bg-lime-400 w-3 h-3"></div>
                <div v-else class="rounded-full bg-red-500 w-3 h-3"></div>
                {{ checkStatus }}
              </span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                บริษัท
              </label>

              <span class="w-48 text-gray-400 py-1 capitalize">
                {{ employeeData.company_name }}
              </span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="ตำแหน่ง">
                ตำแหน่ง
              </label>

              <span class="w-48 text-gray-400 py-1">
                {{ employeeData.position_name }}
              </span>
            </div>

            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="">
                {{ $t('department') }}
              </label>

              <span class="w-48 text-gray-400 py-1">
                {{ employeeData.department_name }}
              </span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                NFC ID
              </label>

              <span class="w-48 text-gray-400 py-1">
                {{ employeeData.nfc_id }}</span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                เวลางาน
              </label>
              <span class="w-48 text-gray-400 py-1">{{
                employeeData.shiftime_name
              }}</span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                รหัสพนักงาน
              </label>

              <span class="w-48 text-gray-400 py-1">
                {{ employeeData.employee_code }}</span>
            </div>

            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="startwork_date">
                วันที่เริ่มงาน
              </label>

              <span class="w-48 text-gray-400 py-1">{{
                this.$moment(employeeData.startwork_date).format("DD-MM-YYYY")
              }}</span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="">
                วันที่สิ่นสุดการทำงาน
              </label>

              <span class="w-48 text-gray-400 py-1">{{
                employeeData.endwork_date
              }}</span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                {{ $t('enterpriseLevel') }}
              </label>

              <span class="w-48 text-gray-400 py-1">
                พนักงานทั่วไป
              </span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="">
                รหัส Line ID
              </label>

              <span class="w-48 text-gray-400 py-1">{{
                employeeData.line_user_id
              }}</span>
            </div>

            <!-- branch -->
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="">
                {{ $t('salary') }}
              </label>
              <span class="w-48 text-gray-400 py-1">{{
                employeeData.salary
              }}</span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                คะแนน
              </label>
              <span class="w-48 text-gray-400 py-1">{{
                employeeData.point
              }}</span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-primary font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                {{ $t('day_off') }}
              </label>
              <div class="flex flex-wrap gap-2">
                <div class="flex items-center mr-2">
                  <img v-if="employeeData.personal_leave" src="@/assets/images/tick.svg" />
                  <img v-else src="@/assets/images/false.svg" />
                  <span class="ml-2">{{ $t('personalLeave') }}</span>
                </div>
                <div class="flex items-center mr-2">
                  <img v-if="employeeData.sick_leave" src="@/assets/images/tick.svg" />
                  <img v-else src="@/assets/images/false.svg" />
                  <span class="ml-2">{{ $t('sickLeave') }}</span>
                </div>
                <div class="flex items-center mr-2">
                  <img v-if="employeeData.summer_leave" src="@/assets/images/tick.svg" />
                  <img v-else src="@/assets/images/false.svg" />
                  <span class="ml-2">{{ $t('summerLeave') }}</span>
                </div>
                <div class="flex items-center mr-2">
                  <img v-if="employeeData.holiday_leave" src="@/assets/images/tick.svg" />
                  <img v-else src="@/assets/images/false.svg" />
                  <span class="ml-2">{{ $t('day_off') }}</span>
                </div>
              </div>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="inline-password">
                {{ $t('specialLeave') }}
              </label>
              <span class="w-48 text-gray-400 py-1"><img v-if="employeeData.special_leave"
                  src="@/assets/images/tick.svg" />
                <img v-else src="@/assets/images/false.svg" />
              </span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="">
                {{ $t('withoutpayLeave') }}
              </label>
              <span class="w-48 text-gray-400 py-1">
                <img v-if="employeeData.withoutpay_leave" src="@/assets/images/tick.svg" />
                <img v-else src="@/assets/images/false.svg" />
              </span>
            </div>
            <div class="md:flex md:items-center mb-4 align-middle grid flex-row items-center">
              <label class="inline-block w-64 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="can_add_shift">
                {{ $t('can_add_shift') }}
              </label>
              <span class="w-48 text-gray-400 py-1">
                <img v-if="employeeData.can_add_shift" src="@/assets/images/tick.svg" />
                <img v-else src="@/assets/images/false.svg" />
              </span>
            </div>
            <div>
            </div>
            <div class="my-4 flex justify-end">
              <button @click="this.$router.push({ name: 'Employee' })"
                class="shadow w-1/3 border border-origin hover:bg-origin hover:text-white transition-all duration-300 text-origin font-normal py-2 rounded-xl"
                type="button">
                {{ $t('go_back') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>


export default {
  props: ["id"],
  components: {},
  data() {
    return {
      loading: true,
      color: "#36A1EA",
      size: "20px",
      employeeData: {},
      departmentName: "",
      positionName: "",
      shiftTime: "",
    };
  },

  methods: {
    editEmployee() {
      this.$router.push({ name: "editEmployee" });
    },
  },

  computed: {
    checkTitle() {
      var title = "";
      if (this.employeeData.title_id == "1") {
        title = "Mr";
      } else if (this.employeeData.title_id == "2") {
        title = "Mrs";
      } else if (this.employeeData.title_id == "3") {
        title = "Miss";
      }
      return title;
    },
    checkEmailConfirm() {
      return this.employeeData.active === 1 ? "Confirmed" : "Unconfirmed";
    },
    checkStatus() {
      return this.employeeData.status === 1 ? "Active" : "Inactive";
    },
  },

  mounted() {
    this.axios
      .get("employee/show/" + this.id)
      .then((response) => {
        console.log(response);
        this.loading = true;
        this.employeeData = response.data.data;
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style scoped></style>
