<template>
  <main class="md:px-4 flex-auto">
    <teleport to="body">
      <Modal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </Modal>
    </teleport>
    <div class="py-3 ml-2">
      <h1 class="">
        <Router-Link :to="{ name: 'Employee' }" class="text-muted cursor-pointer">{{ $t('employee') }} > {{
          $t('edit_info')
        }}
        </Router-Link>
      </h1>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="tab bg-white px-10 py-3 md:inline-block text-origin font-semibold">
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
    <div class="bg-white rounded-tr-3xl rounded-b-3xl p-4 md:p-10 pb-5 mb-5">
      <div>
        <div class="lg:flex">
          <div class="w-1/3">
            <ImageCropper :imgLink="form.image" @image-cropped="handleCroppedImage" />
          </div>
          <div class="lg:ml-10 mt-2 w-[100%]">
            <div class="w-full">
              <div class="grid md:flex gap-5 w-full mb-5">
                <div class="flex flex-col md:w-1/3">
                  <label class="font-medium text-primary" for="title">{{ $t("prefix") }} <span
                      class="text-red-600">*</span></label>
                  <div>
                    <select class="w-full border border-slate-300 rounded-xl" :class="$errorBorder('title_id')"
                      name="title" id="title" v-model.number="form.title_id" required>
                      <option value="" disabled hidden selected>
                        {{ $t("prefix") }}
                      </option>
                      <option value="1">
                        {{ $t("mr") }}
                      </option>
                      <option value="2">{{ $t("mrs") }}</option>
                      <option value="3">{{ $t("miss") }}</option>
                    </select>
                    <em :class="$errorText('title_id')" v-if="!!errors.title_id"
                      class="block w-full text-start text-xs">{{
                        errors.title_id }} <br /></em>
                  </div>
                </div>
                <div class="flex flex-col md:w-1/3">
                  <label class="font-medium text-primary" for="title">{{ $t("fname") }} <span
                      class="text-red-600">*</span></label>
                  <div>
                    <input class="rounded-xl w-full border-slate-300 placeholder-gray-300" type="text"
                      :class="$errorBorder('firstname')" v-model="form.firstname" :placeholder="$t('fname')" required />
                    <em :class="$errorText('firstname')" v-if="!!errors.firstname"
                      class="block w-full text-start text-xs">{{
                        errors.firstname }} <br /></em>
                  </div>
                </div>
                <div class="flex flex-col md:w-1/3">
                  <label class="font-medium text-primary" for="title">{{ $t("surname") }}
                    <span class="text-red-600">*</span></label>
                  <div>
                    <input class="rounded-xl w-full border-slate-300 placeholder-gray-300" type="text"
                      v-model="form.lastname" :class="$errorBorder('lastname')" :placeholder="$t('surname')" required />
                    <em :class="$errorText('lastname')" v-if="!!errors.lastname"
                      class="block w-full text-start text-xs">{{
                        errors.lastname }} <br /></em>
                  </div>
                </div>
              </div>
              <div class="grid md:flex gap-5 w-full mb-5">
                <div class="relative flex flex-col md:w-1/2">
                  <label class="font-medium text-primary" for="title">{{ $t("birthday") }}
                    <span class="text-red-600">*</span></label>
                  <VueDatePicker :format="$format" class="rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    v-model="form.birthdate" :enable-time-picker="false" placeholder="เลือกวันเกิด" />
                </div>
                <div class="flex flex-col md:w-1/2">
                  <label class="font-medium text-primary h-[25px]" for="title">{{ $t('citizenId') }} /
                    {{ $t('passportNo') }}
                  </label>
                  <input class="rounded-xl border-slate-300 placeholder-gray-300" type="text" v-model="form.citizen_id_id"
                    :placeholder="`${$t('citizenId')} / ${$t('passportNo')}`" />
                </div>
              </div>

              <div class="grid md:flex gap-5 w-full mb-5">
                <div class="relative flex flex-col md:w-1/2">
                  <label class="font-medium text-primary" for="title">{{ $t('phone') }}</label>
                  <input class="rounded-xl border-slate-300 placeholder-gray-300" type="number" v-model="form.phone"
                    :placeholder="`${$t('phone')}`" />
                </div>
                <div class="flex flex-col md:w-1/2">
                  <label class="font-medium text-primary" for="title">{{ $t('email') }}
                  </label>
                  <input class="rounded-xl border-slate-300 placeholder-gray-300" type="email" v-model="form.email"
                    :placeholder="`${$t('email')}`" />
                </div>
              </div>
              <div class="grid md:flex flex-col gap-5 w-full mb-5">
                <label for="message" class="font-medium text-primary dark:text-white">{{ $t('address') }}</label>
                <textarea id="message" rows="4" v-model="form.address"
                  class="block p-2.5 w-full text-sm bg-gray-50 rounded-xl border border-slate-300 placeholder-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-slate-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  :placeholder="`${$t('address')}`"></textarea>
              </div>
            </div>
          </div>
        </div>
        <hr class="h-0.5 bg-calendarBg mx-5" />
        <div class="my-7 md:mx-10 text-md md:text-lg w-full flex flex-col justify-center items-center gap-4">
          <div class="md:flex w-full md:w-auto">
            <label class="font-semibold md:w-56 text-primary mb-1 md:mb-0 pr-4" for="full-name">
              {{ $t('department') }}<span class="text-red-600">*</span>
            </label>
            <div>
              <select :class="$errorBorder('department_id')" id="dp"
                class="capitalize w-full md:w-96 border border-slate-300 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                required v-model="form.department_id" @change="chooseDepartment">
                <option value="" selected disabled hidden>ออกแบบ</option>
                <option v-for="department in getAllDepartments" :key="department.id" :value="department.id"
                  class="capitalize">
                  {{ department.name }}
                </option>
              </select>
              <em :class="$errorText('department_id')" v-if="!!errors.department_id"
                class="block w-full text-start text-xs">{{ errors.department_id }} <br /></em>
            </div>
          </div>
          <div class="md:flex w-full md:w-auto">
            <label class="md:inline-block font-semibold md:w-56 text-primary mb-1 md:mb-0 pr-4" for="name">
              {{ $t('position') }}<span class="text-red-600">*</span>
            </label>
            <div>
              <select id="position" :class="$errorBorder('position_id')"
                class="w-full md:w-96 border capitalize border-slate-300 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                required v-model="form.position_id">
                <option value="" hidden selected>เลือกตำแหน่ง</option>
                <option v-for="position in positions" :value="position.id" :key="position.id" class="capitalize">
                  {{ position.name }}
                </option>
              </select>
              <em :class="$errorText('position_id')" v-if="!!errors.position_id"
                class="block w-full text-start text-xs">{{
                  errors.position_id }} <br /></em>
            </div>
          </div>
          <div class="md:flex w-full md:w-auto">
            <label class="md:inline-block font-semibold md:w-56 text-primary mb-1 md:mb-0 pr-4" for="surname">
              {{ $t('shift_time') }}<span class="text-red-600">*</span>
            </label>
            <div>
              <select id="default" :class="$errorBorder('shifttime_id')" @change="handleShiftTimeSelector"
                class="w-full md:w-96 border border-slate-300 placeholder-gray-300 text-primary text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                required v-model="form.shifttime_id">
                <option value="" hidden disabled selected>เลือกตำแหน่ง</option>
                <option v-for="time in getAllShiftTimes" :key="time.id" :value="time.id">
                  {{ time.shift_name }}
                </option>
                <option value="edit">Edit Shift Time</option>
              </select>
              <em :class="$errorText('shifttime_id')" v-if="!!errors.shifttime_id"
                class="block w-full text-start text-xs">{{
                  errors.shifttime_id }} <br /></em>
            </div>
          </div>
          <div class="md:flex w-full md:w-auto">
            <label class="md:inline-block font-semibold md:w-56 text-primary mb-1 md:mb-0 pr-4" for="name">
              Manager<span class="text-red-600">*</span>
            </label>
            <div>
              <select id="manager_id" :class="$errorBorder('manager_id')"
                class="w-full md:w-96 border border-slate-300 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                required v-model="form.manager_id">
                <option value="" hidden selected>เลือกตำแหน่ง</option>
                <option v-for="manager in managers" :value="manager.id" :key="manager.id" class="capitalize">
                  {{ manager.fullname }}
                </option>
              </select>
              <em :class="$errorText('manager_id')" v-if="!!errors.manager_id" class="block w-full text-start text-xs">{{
                errors.manager_id }} <br /></em>
            </div>
          </div>
          <div class="md:flex w-full md:w-auto">
            <label class="md:inline-block font-semibold md:w-56 text-primary mb-1 md:mb-0 pr-4" for="nfc_id">
              NFC ID
            </label>
            <input
              class="w-full md:w-[24rem] border border-slate-200 rounded-xl py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              id="userName" type="nfc_id" v-model="form.nfc_id" placeholder="NFC ID" />
          </div>
          <div class="md:flex w-full md:w-auto">
            <label class="md:inline-block font-semibold md:w-56 text-primary mb-1 md:mb-0 pr-4" for="salary">
              {{ $t('salary') }}
            </label>
            <input
              class="w-full md:w-[24rem] border border-slate-200 rounded-xl py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              id="" type="number" v-model="form.salary" :placeholder="`${$t('salary')}`" />
          </div>
          <div class="md:flex w-full md:w-auto">
            <label class="md:inline-block font-semibold md:w-56 text-primary mb-1 md:mb-0 pr-4" for="active">
              {{ $t('status') }}
            </label>
            <select
              class="w-full md:w-[24rem] sm:w-96 border border-slate-200 rounded-xl py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              id="active" v-model.number="form.active">
              <option value="" selected hidden>กรุณาเลือก</option>
              <option :value="1">Active</option>
              <option :value="0">Inactive</option>
            </select>
          </div>
          <div class="md:flex w-full md:w-auto">
            <label class="md:inline-block font-semibold md:w-56 text-primary mb-1 md:mb-0 pr-4" for="startworkingDate">
              {{ $t('start_work_date') }}
            </label>
            <div class="md:w-[24rem]">
              <VueDatePicker :format="$format" id="startworkingDate"
                class="text-muted font-normal rounded-xl focus:ring-blue-500 focus:border-blue-500"
                v-model="form.startwork_date" :enable-time-picker="false" placeholder="กรุณาเลือก" />
            </div>
          </div>
          <div class="md:flex w-full md:w-auto">
            <label class="md:inline-block font-semibold md:w-56 text-primary mb-1 md:mb-0 pr-4" for="point">
              {{ $t('point') }}
            </label>
            <input
              class="md:w-[24rem] sm:w-96 border border-slate-200 rounded-xl py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              id="point" type="text" v-model="form.point" :placeholder="`${$t('point')}`" />
          </div>
          <!-- <div class="">
          <label class="md:inline-block font-semibold md:w-56 text-primary mb-1 md:mb-0 pr-4" for="placeName">
            Type
          </label>
          <select name="type" id="type" v-model="type"
            class="md:w-[24rem] sm:w-96 border border-slate-200 rounded-xl py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500">
            <option value="regular">Regular</option>
            <option value="irregular">Irregular</option>
          </select>
        </div> -->
          <!-- <div v-if="type == 'irregular'">
          <Calendar></Calendar>
        </div> -->
          <div class="md:flex w-full md:w-auto">
            <div class="md:flex items-center justify-between md:w-[38rem]">
              <label class="md:inline-block font-semibold text-primary mb-1 md:mb-0" for="{{$t('holiday')}}">
                {{ $t('day_off') }}
              </label>
              <div class="flex flex-wrap holidaySelector">
                <div class="lg:flex items-center mb-3">
                  <div class="flex justify-between w-full gap-3">
                    <div class="">
                      <input v-model="form.personal_leave" :checked="!!form.personal_leave" type="checkbox" value=""
                        class="w-6 h-6 text-lightGreen bg-gray-100 rounded-xl" />
                      <span class="text-primary ml-2">{{ $t('personalLeave') }}</span>
                    </div>
                    <div class="">
                      <input v-model="form.sick_leave" :checked="!!form.sick_leave" type="checkbox" value=""
                        class="w-6 h-6 text-lightGreen bg-gray-100 rounded-xl" />
                      <span class="text-primary ml-2">{{ $t('sickLeave') }}</span>
                    </div>
                    <div class="">
                      <input v-model="form.summer_leave" :checked="!!form.summer_leave" type="checkbox" value=""
                        class="w-6 h-6 text-lightGreen bg-gray-100 rounded-xl" />
                      <span class="text-primary ml-2">{{ $t('summerLeave') }}</span>
                    </div>
                  </div>
                </div>
                <div class="md:flex items-center w-full">
                  <div class="flex flex-wrap gap-3">
                    <div class="">
                      <input v-model="form.special_leave" :checked="!!form.special_leave" type="checkbox" value=""
                        class="w-6 h-6 text-lightGreen bg-gray-100 rounded-xl" />
                      <span class="text-primary ml-2">{{ $t('specialLeave') }}</span>
                    </div>
                    <div class="">
                      <input v-model="form.withoutpay_leave" :checked="!!form.withoutpay_leave" type="checkbox" value=""
                        class="w-6 h-6 text-lightGreen bg-gray-100 rounded-xl" />
                      <span class="text-primary ml-2">ลาโดยไม่ได้รับค่าจ้าง</span>
                    </div>
                    <div class="">
                      <input v-model="form.holiday" :checked="!!form.holiday" type="checkbox" value=""
                        class="w-6 h-6 text-lightGreen bg-gray-100 rounded-xl" />
                      <span class="text-primary ml-2">{{ $t('holiday') }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="md:flex w-full md:w-auto">
            <label for="can_add_shift" class="md:inline-block font-semibold md:w-56 text-primary mb-1 md:mb-0">{{
              $t('can_add_shift') }}</label>
            <div class="md:w-[24rem]">
              <input type="checkbox" class="w-6 h-6 rounded-full text-lightGreen bg-gray-100" v-model="form.can_add_shift"
                :true-value="1" :false-value="0">
              <small>{{ errors.regular_shift }}</small>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col md:flex-row md:items-center justify-center mt-20 md:gap-5 gap-3">
        <button @click="$router.push({ name: 'Employee' })"
          class="w-full md:w-1/4 border border-danger text-danger py-2 rounded-xl hover:bg-danger hover:text-white transition-all duration-500"
          type="button">
          {{ $t("cancel") }}
        </button>
        <button v-if="!editMode" @click="createEmployee"
          class="shadow w-full md:w-1/4 bg-origin hover:bg-sky-700 transition-all duration-500 text-white py-2 rounded-xl">
          {{ $t("save") }}
        </button>
        <button v-else @click="updateEmployee"
          class="shadow w-full md:w-1/4 bg-origin hover:bg-sky-700 transition-all duration-500 text-white py-2 rounded-xl">
          {{ $t("save") }}
        </button>
      </div>
    </div>

  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ImageCropper from "@/components/ImageCropper.vue";
import { Cropper } from "vue-advanced-cropper";
import Calendar from '../../../components/Calendar.vue'

let data = {
  nfc_id: "",
  active: "",
  address: "",
  citizen_id: "",
  department_id: "",
  position_id: "",
  shifttime_id: "",
  manager_id: "",
  startwork_date: "",
  salary: "",
  point: "",
  email: "",
  title_id: "",
  phone: "",
  firstname: "",
  lastname: "",
  birthdate: "",
  image: "",
  personal_leave: false,
  summer_leave: false,
  sick_leave: false,
  special_leave: false,
  holiday: false,
  withoutpay_leave: false,
  can_add_shift: 0,
};

export default {
  name: 'EditEmployeeInfo',
  components: { ImageCropper, Cropper, Calendar },
  props: ["id"],
  data() {
    return {
      type: 'regular',
      loading: true,
      color: "#36A1EA",
      size: "20px",
      date: "",
      img: null,
      form: { ...data },
      errors: { ...data },
      show: false,
      editMode: Boolean,
      token: this.$cookies.get("token"),
      positions: "",
      managers: "",
      data: null,
      retrieve: true,
    };
  },

  methods: {
    ...mapActions(["fetchDepartments", "fetchShiftTimes"]),

    createEmployee() {
      this.loading = true;
      if (this.form.image == 'default.png') {
        this.form.image = ''
      }
      this.axios
        .post("employee/create", this.form)
        .then((response) => {
          if (response.data.success === true) {
            this.$swal({
              icon: "success",
              html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
              confirmButtonText: "ตกลง",
            });
          } else {
            this.$validateMsg(response.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateEmployee() {
      console.log(this.editMode)
      this.loading = true;
      this.form.image = ''
      this.axios
        .post("employee/update/" + this.id, this.form)
        .then((response) => {
          console.log(response);
          if (response.data.success === true) {
            this.$swal({
              icon: "success",
              html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
              confirmButtonText: "ตกลง",
            }).then(() => {
              this.$router.push({ name: "Employee" });
            });
          } else if (response.data.success === false) {
            this.$swal({
              icon: "error",
              title: "Error",
              text: response.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleShiftTimeSelector() {
      if (this.form.shifttime_id == 'edit') {
        this.$router.push({ name: 'CheckIn' })
      }
    },

    chooseDepartment() {
      this.axios
        .get("positions-by-department/" + this.form.department_id)
        .then((response) => {
          this.positions = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      this.axios
        .get("department-managers")
        .then((response) => {
          this.managers = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleCroppedImage(croppedImageData) {
      this.form.image = croppedImageData
    }
  },

  computed: {
    ...mapGetters(["getAllDepartments", "getAllShiftTimes"]),
  },

  mounted() {
    this.fetchDepartments();
    this.fetchShiftTimes();
    //check route to toggle editMode
    if (this.$route.name == "editEmployee") {
      this.editMode = true;
      this.axios
        .get("employee/edit/" + this.id)
        .then((response) => {
          console.log(response);
          this.form = response.data.data;
          this.form.department_id = parseInt(this.form.department_id);
          this.form.position_id = parseInt(this.form.position_id);
          this.form.shifttime_id = parseInt(this.form.shifttime_id);
          this.chooseDepartment();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    } else if (this.$route.name == "addEmployee") {
      this.editMode = false;
      this.form.image = 'default.png';
      setTimeout(() => (this.loading = false), 500);
    }
  },
};
</script>

<style scoped>
.holidaySelector {
  width: auto;

  @media only screen and (min-width: 768px) {
    width: calc(100% - 14rem);
  }
}
</style>
