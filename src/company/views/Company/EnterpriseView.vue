<template>
  <main class="w-full bg-calendarBg">
    <teleport to="body">
      <Modal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </Modal>
    </teleport>

    <!-- edit level popup section -->
    <BaseModal :isOpen="popUp" :btnDisable="btnDisable" @close-modal="togglePopUp()" @submit="submit"
      :classList="'w-full md:w-[60vw]'">
      <template #title>
        <h1 class="text-center text-2xl text-primary pt-5">
          {{ $t('add_enterprise_level') }}
        </h1>
      </template>
      <template #container>
        <form action="">
          <div class="md:flex w-full justify-around gap-3 p-5 text-primary">
            <div class="flex flex-col md:w-2/5">
              <label class="pb-1" for="companyName">{{ $t('companyName') }}</label>
              <input class="rounded-xl capitalize" :class="$errorBorder('name')" type="text"
                :placeholder="$t('companyName')" v-model="form.name" />
              <em :class="$errorText('name')">{{ errors.name }}</em>
            </div>
            <div class="flex flex-col md:w-1/4">
              <label class="pb-1" for="companyName">{{ $t('enterpriseLevel') }}</label>
              <select class="rounded-xl capitalize" :class="$errorBorder('management_level_id')"
                v-model="form.management_level_id" required>
                <option value="" selected hidden>{{ $t('enterpriseLevel') }}</option>
                <option v-for="(item, i) in getManagementLevels" :key="i" :value="item.id">
                  {{ item.name }}
                </option>
              </select>
              <em :class="$errorText('management_level_id')">
                {{ errors.management_level_id }}
              </em>
            </div>
            <div class="flex flex-col md:w-1/4">
              <label class="pb-1" for="salary"> {{ $t('salary') }}</label>
              <input :class="$errorBorder('salary')" id="salary" class="rounded-xl" type="number"
                :placeholder="$t('salary')" v-model="form.salary" />
              <em :class="$errorText('salary')">{{ errors.salary }}</em>
            </div>
          </div>
          <div class="text-primary px-5">
            <h1 class="block w-full">{{ $t('holiday') }} :</h1>
            <div class="flex flex-wrap justify-normal md:justify-start">
              <div class="w-1/3 md:p-3 py-3">
                <input class="w-6 h-6 text-lightGreen bg-gray-100 rounded-lg" type="checkbox" id="personal_leave"
                  v-model="form.personal_leave" true-value="1" false-value="0" />
                <label class="pl-2" for="personal_leave">{{ $t('personalLeave') }}</label>
              </div>
              <div class="w-1/3 md:p-3 py-3">
                <input class="w-6 h-6 text-lightGreen bg-gray-100 rounded-lg" type="checkbox" id="sick_leave"
                  v-model="form.sick_leave" true-value="1" false-value="0" />
                <label class="pl-2" for="sick_leave">{{ $t('sickLeave') }}</label>
              </div>
              <div class="w-1/3 md:p-3 py-3">
                <input class="w-6 h-6 text-lightGreen bg-gray-100 rounded-lg" type="checkbox" v-model="form.special_leave"
                  id="special_leave" true-value="1" false-value="0" />
                <label class="pl-2" for="special_leave">{{ $t('specialLeave') }}</label>
              </div>
              <div class="w-1/3 md:p-3 py-3">
                <input class="w-6 h-6 text-lightGreen bg-gray-100 rounded-lg" type="checkbox" v-model="form.summer_leave"
                  id="summer_leave" true-value="1" false-value="0" />
                <label class="pl-2" for="summer_leave">{{ $t('summerLeave') }}</label>
              </div>
              <div class="w-1/3 md:p-3 py-3">
                <input class="w-6 h-6 text-lightGreen bg-gray-100 rounded-lg" type="checkbox"
                  v-model="form.withoutpay_leave" id="withoutpay_leave" true-value="1" false-value="0" />
                <label class="pl-2" for="withoutpay_leave">ไม่รับเงิน</label>
              </div>
              <div class="w-1/3 md:p-3 py-3">
                <input class="w-6 h-6 text-lightGreen bg-gray-100 rounded-lg" type="checkbox" v-model="form.holiday"
                  id="holiday" true-value="1" false-value="0" />
                <label class="pl-2" for="holiday">{{ $t('holiday') }}</label>
              </div>
            </div>
          </div>
        </form>
      </template>
    </BaseModal>

    <div class="">
      <div class="h-auto bg-white rounded-tr-3xl rounded-b-3xl pb-8">
        <div class="flex justify-between items-center p-10">
          <div v-if="!editInformation" class="flex gap-4">
            <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
            <h1 class="text-primary text-2xl md:text-3xl">{{ $t('organization_info') }}</h1>
          </div>
          <div @click="editInformation = !editInformation" v-if="!editInformation"
            class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
            <img src="@/assets/images/edit.svg" alt="edit" />
          </div>
        </div>
        <!-- information -->
        <form action="">
          <div v-for="(leave, index) in formSetting.onleavedays" :key="index"
            class="grid md:flex text-primary text-18 mb-5 px-8">
            <label v-if="this.$store.getters.getAppLanguage == 'th'" :for="leave.day" class="inline-block md:w-1/3">
              {{ leave.onleavetype.name_th }}
            </label>
            <label v-if="this.$store.getters.getAppLanguage == 'en'" :for="leave.day"
              class="inline-block md:w-1/3 capitalize">
              {{ leave.onleavetype.name_en }}
            </label>
            <span v-if="!editInformation" class="w-2/3 pb-4">{{
              leave.day
            }}</span>
            <input :id="leave.day" v-else
              class="md:w-72 border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              v-model="testForm[leave.onleavetype.type]" />
          </div>
          <div class="grid md:flex text-primary text-18 mb-5 px-8">
            <label for="line_group" class="inline-block md:w-1/3">{{ $t('lineCode') }}</label>
            <span v-if="!editInformation" class="w-2/3 pb-4">{{
              formSetting.line_group
            }}</span>
            <span v-else id="line_group" class="w-2/3 pb-4">
              {{ formSetting.line_group }}</span>
          </div>
          <div class="grid md:flex text-primary text-18 mb-5 px-8">
            <label for="created" class="inline-block md:w-1/3">{{ $t('register_date') }}</label>
            <span v-if="!editInformation" class="w-2/3 pb-4">{{
              this.$moment(formSetting.created_at).format("DD-MM-YYYY")
            }}</span>
            <VueDatePicker :format="$format" v-else v-model="formSetting.created_at" id="created" class="md:w-72"
              input-class-name=" text-muted rounded-xl focus:ring-blue-500 focus:border-blue-500"
              :enable-time-picker="false" />
          </div>
          <div class="grid md:flex px-8 text-primary text-18 mb-5">
            <label class="inline-block md:w-1/3">{{ $t('status') }}</label>
            <span class="flex justify-start items-center gap-1 text-lime-400">
              <img class="w-4 h-4" src="@/assets/images/active.svg" alt="" />
              <p>ใช้งาน</p>
            </span>
          </div>
          <div class="grid md:flex px-8 text-primary text-18 mb-5">
            <label for="toggle" class="inline-block md:w-1/3">{{ $t('allowEmployeeToReg') }}</label>
            <span class="w-2/3 pb-4">
              <Toggle id="toggle" class="toggle-blue" v-model="regStatus" trueValue="1" falseValue="0"
                :disabled="!editInformation" />
              <!-- @change="toggleChange(formSetting.id)" -->
            </span>
          </div>
          <div class="grid md:flex px-8 text-primary text-18 mb-5">
            <label for="secret_code" class="inline-block md:w-1/3"> {{ $t('secret_code') }} </label>
            <span class="w-2/3 pb-4"> {{
              formSetting.allow_register_code
            }}</span>
          </div>
        </form>
        <div v-if="editInformation" class="mb-10 flex justify-center gap-5">
          <button
            class="w-32 md:w-1/4 border border-danger text-danger font-normal py-2 rounded-xl hover:bg-danger hover:text-white transition-all duration-500"
            type="button" @click="editInformation = !editInformation">
            {{ $t("cancel") }}
          </button>
          <button
            class="shadow w-32 md:w-1/4 bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
            type="submit" @click.prevent="settingSubmit">
            {{ $t("save") }}
          </button>
        </div>
      </div>

      <!-- enterprise level -->
      <div class="h-auto bg-white rounded-3xl pb-8 mt-5 mb-10">
        <div class="flex justify-between items-center p-10">
          <div class="flex gap-4">
            <div class="inline-block h-8 w-1 rounded-2xl bg-origin"></div>
            <h1 class="text-primary text-3xl">{{ $t('enterpriseLevel') }}</h1>
          </div>
          <div class="p-2 rounded-full border mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200"
            @click="togglePopUp((cleanForm = true))">
            <img src="@/assets/images/add.svg" alt="" />
          </div>


        </div>

        <div class="relative overflow-auto rounded-lg mx-10 hidden md:block">
          <table class="w-full text-sm text-left text-primary">
            <thead class="text-primary bg-calendarBg text-center">
              <tr>
                <th scope="col" class="px-2 py-3 font-semibold rounded-l-full">
                  {{ $t('no.') }}
                </th>
                <th scope="col" class="px-2 py-3 font-semibold">{{ $t('name') }}</th>
                <th scope="col" class="px-2 py-3 font-semibold">{{ $t('enterpriseLevel') }}</th>
                <th scope="col" class="px-2 py-3 font-semibold">
                  {{ $t('salary') }} ({{ $t('baht') }})
                </th>
                <th scope="col" class="px-2 py-3 font-semibold">{{ $t('personalLeave') }}</th>
                <th scope="col" class="px-2 py-3 font-semibold">{{ $t('sickLeave') }}</th>
                <th scope="col" class="px-2 py-3 font-semibold">{{ $t('specialLeave') }}</th>
                <th scope="col" class="px-2 py-3 font-semibold">{{ $t('summerLeave') }}</th>
                <th scope="col" class="px-2 py-3 font-semibold">ไม่รับเงิน</th>
                <th scope="col" class="px-2 py-3 font-semibold">{{ $t('holiday') }}</th>
                <th scope="col" class="px-2 py-3 font-semibold rounded-r-full">
                  {{ $t('edit') }}/{{ $t('delete') }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(data, i) in tableData" :key="'management_level' + i" class="bg-white text-center capitalize">
                <th scope="row" class="px-6 py-4 font-medium text-primary whitespace-nowrap">
                  {{ ++i }}
                </th>
                <td class="px-2 py-4">{{ data.name }}</td>
                <td class="px-2 py-4">{{ data.management_level.name }}</td>
                <td class="px-2 py-4">{{ data.salary }}</td>
                <td class="px-2 py-4">
                  <img v-if="data.personal_leave === 1" class="mx-auto" src="@/assets/images/tick.svg" alt="" />
                  <img class="mx-auto" v-else src="@/assets/images/false.svg" alt="" />
                </td>
                <td class="px-2 py-4">
                  <img v-if="data.sick_leave === 1" class="mx-auto" src="@/assets/images/tick.svg" alt="" />
                  <img class="mx-auto" v-else src="@/assets/images/false.svg" alt="" />
                </td>
                <td class="px-2 py-4">
                  <img class="mx-auto" v-if="data.special_leave === 1" src="@/assets/images/tick.svg" alt="" />
                  <img class="mx-auto" v-else src="@/assets/images/false.svg" alt="" />
                </td>
                <td class="px-2 py-4">
                  <img class="mx-auto" v-if="data.summer_leave === 1" src="@/assets/images/tick.svg" alt="" />
                  <img class="mx-auto" v-else src="@/assets/images/false.svg" alt="" />
                </td>
                <td class="px-2 py-4">
                  <img class="mx-auto" v-if="data.withoutpay_leave === 1" src="@/assets/images/tick.svg" alt="" />
                  <img class="mx-auto" v-else src="@/assets/images/false.svg" alt="" />
                </td>
                <td class="px-2 py-4">
                  <img class="mx-auto" v-if="data.holiday === 1" src="@/assets/images/tick.svg" alt="" />
                  <img class="mx-auto" v-else src="@/assets/images/false.svg" alt="" />
                </td>
                <td class="px-2 py-4 flex justify-center">
                  <div @click="edit(data.id)"
                    class="flex items-center border shadow-lg rounded-l-large px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                    <img src="@/assets/images/editblack.svg" alt="" />
                  </div>
                  <div @click="deleteLevel(data.id)"
                    class="flex items-center border shadow-lg rounded-r-large px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                    <img src="@/assets/images/bin.svg" alt="" />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- accordion -->
        <div id="accordion" class="block md:hidden">
          <div v-for="(data, index) in tableData" :key="index" class="border-t py-2 pl-8 pr-3" id="accordion">
            <button @click="this.$toggleAccordion(index, 'enterprise')" class="flex items-center w-full gap-3">
              <font-awesome-icon :id="`enterprise-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
                icon="fa-solid fa-chevron-up" rotation="180" />
              <span class="capitalize">{{ data.name }}</span>
            </button>
            <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
              :class="data.open ? 'h-auto ' : 'h-0'" id="content">
              <div>
                <h1>{{ $t('name') }}</h1>
                <span class="text-gray-400 capitalize">{{ data.name }}</span>
              </div>
              <div>
                <h1>{{ $t('enterpriseLevel') }}</h1>
                <span class="text-gray-400">{{
                  data.management_level.name
                }}</span>
              </div>
              <div>
                <h1>ระดับสูง (UPPER)</h1>
                <span class="text-gray-400">{{ data.salary }}</span>
              </div>
              <div>
                <h1>{{ $t('holiday') }}</h1>
                <div class="flex flex-wrap gap-4 items-center">
                  <div class="flex items-center gap-2">
                    <img v-if="data.personal_leave === 1" class="" src="@/assets/images/tick.svg" alt="" />
                    <img class="" v-else src="@/assets/images/false.svg" alt="" />
                    <span>{{ $t('personalLeave') }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <img v-if="data.sick_leave === 1" class="" src="@/assets/images/tick.svg" alt="" />
                    <img class="" v-else src="@/assets/images/false.svg" alt="" />
                    <span>{{ $t('sickLeave') }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <img v-if="data.special_leave === 1" class="" src="@/assets/images/tick.svg" alt="" />
                    <img class="" v-else src="@/assets/images/false.svg" alt="" />
                    <span>{{ $t('specialLeave') }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <img v-if="data.summer_leave === 1" class="" src="@/assets/images/tick.svg" alt="" />
                    <img class="" v-else src="@/assets/images/false.svg" alt="" />
                    <span>{{ $t('summerLeave') }}</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <img v-if="data.withoutpay_leave === 1" class="" src="@/assets/images/tick.svg" alt="" />
                    <img class="" v-else src="@/assets/images/false.svg" alt="" />
                    <span>ลาไม่รับเงิน</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <img v-if="data.holiday === 1" class="" src="@/assets/images/tick.svg" alt="" />
                    <img class="" v-else src="@/assets/images/false.svg" alt="" />
                    <span>{{ $t('holiday') }}</span>
                  </div>
                </div>
              </div>
              <div>
                <h1>แก้ไข / ลบ</h1>
                <div class="flex gap-3 mt-2">
                  <button @click="edit(data.id)" class="bg-sky-100 p-3 rounded-full hover:bg-sky-200 duration-200">
                    <img class="w-6 h-6" src="@/assets/images/edit.svg" alt="" />
                  </button>
                  <button @click="deleteLevel(data.id)" class="bg-red-500 p-3 rounded-full hover:bg-red-600 duration-200">
                    <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
                  </button>
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
import Toggle from "@vueform/toggle";
import { mapActions, mapGetters } from "vuex";

var data = {
  name: "",
  salary: "",
  management_level_id: "",
  company_id: "",
  personal_leave: null,
  sick_leave: null,
  special_leave: null,
  summer_leave: null,
  withoutpay_leave: null,
  holiday: null,
};

export default {
  name: "Enterprise",
  props: ["passApiData"],
  components: {
    Toggle,
  },
  data() {
    return {
      loading: false,
      color: "#36A1EA",
      size: "20px",
      regStatus: 0,
      popUp: false,
      btnDisable: false,
      editInformation: false,
      formSetting: "",
      tableData: [],
      form: { ...data },
      errors: { ...data },
      testForm: {},
    };
  },

  methods: {
    ...mapActions(["fetchManagementLevels"]),

    togglePopUp(cleanForm) {
      if (cleanForm) {
        this.errors = { ...data };
        this.form = { ...data };
      }
      this.popUp = !this.popUp;
    },

    submit() {
      this.btnDisable = true;
      this.form.company_id = this.formSetting.id;
      if (this.form.id) {
        console.log("edit");
        this.axios
          .post("level/update/" + this.form.id, this.form)
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
                  this.loadData();
                });
            } else {
              if (this.$errorMsg(response.data.message)) {
                this.$swal({
                  icon: "error",
                  html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
                  confirmButtonText: "ตกลง",
                });
              }
              this.$validateMsg(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.btnDisable = false;
          });
      } else {
        this.axios
          .post("level/create", this.form)
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
                  this.loadData();
                });
            } else {
              if (this.$errorMsg(response.data.message)) {
                this.$swal({
                  icon: "error",
                  title: "Error",
                  text: response.data.message,
                });
              }
              this.$validateMsg(response.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.btnDisable = false;
          });
      }
    },
    async settingSubmit() {
      this.testForm.open_register_status = parseInt(this.regStatus);
      await this.axios
        .post("company-setting/update/" + this.formSetting.id, this.testForm)
        .then((response) => {
          if (response.data.success) {
            this.$swal({
              icon: "success",
              html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
              confirmButtonText: "ตกลง",
            }).then(() => {
              this.editInformation = false;
            });
          } else {
            this.$swal({
              icon: "error",
              title: "Error",
              text: response.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    edit(id) {
      // faster!! No API call needed.Reuse data from mounted hook
      console.log(id);
      const companyData = this.tableData.find(td => td.id === id)
      this.form = { ...companyData }
      this.errors = { ...data }
      this.togglePopUp()

      /*the old way
      Slower when making READ api call
      */

      // this.loading = true;
      // this.axios
      //   .get("level/edit/" + id)
      //   .then((response) => {
      //     this.form = response.data.data;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   })
      //   .finally(() => {
      //     this.loading = false;
      //     this.errors = { ...data };
      //     this.togglePopUp();
      //   });
    },

    async deleteLevel(id) {
      this.$swal({
        showCancelButton: true,
        title: "คุณต้องการลบข้อมูลนี้ ?",
        text: "หากลบไปแล้วจะไม่สามารถเรียกกลับคืนได้",
        confirmButtonText: "ใช่ ฉันต้องการลบ",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios
            .delete("level/delete/" + id)
            .then(() => { })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.loading = false;
              this.$swal({
                icon: "success",
                html: "<h1>ลบสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการเพิ่มระดับเรียบร้อยแล้ว</span>",
                confirmButtonText: "ตกลง",
              }).then(() => {
                this.loadData();
              });
            });
        }
      });
    },

    async loadData() {
      this.axios
        .get("levels")
        .then((response) => {
          this.tableData = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  computed: {
    ...mapGetters(["getManagementLevels"]),
  },

  watch: {
    passApiData(newVal) {
      this.formSetting = newVal;
      for (let i = 0; i < this.formSetting.onleavedays.length; i++) {
        this.testForm[this.formSetting.onleavedays[i].onleavetype.type] =
          this.formSetting.onleavedays[i].day.toString();
        this.testForm.calendar_type = 0;
        this.regStatus = this.formSetting.open_register_status.toString();
      }
    },
  },

  mounted() {
    this.loadData();
    this.fetchManagementLevels();
    console.log(this.formSetting);
  },
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
* {
  font-family: "Prompt", sans-serif !important;
}

.active-color {
  color: #3faca9;
}

.toggle-blue {
  --toggle-bg-on: #36a1ea;
  --toggle-border-on: #36a1ea;
  --toggle-ring-width: none;
}
</style>
