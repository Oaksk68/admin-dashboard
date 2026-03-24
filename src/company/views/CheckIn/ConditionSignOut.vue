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
    <div class="relative h-auto bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-baseline md:items-center p-5 md:p-0 pb-8">
        <div class="flex items-start gap-4">
          <div class="inline-block h-8 w-1.5 bg-origin rounded-xl"></div>
          <h1 class="text-primary text-[26px] md:text-3xl">
            เงื่อนไขลงชื่อออกงาน
          </h1>
        </div>
        <div @click="popUp = true"
          class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div>
      <div class="grid gap-2 md:flex md:gap-4 w-full pb-8 mt-4">
        <div class="relative">
          <select
            class="w-full border border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="" v-model="shifttime_id.listNum">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="30">แสดง 30 แถว</option>
            <option value="50">แสดง 50 แถว</option>
          </select>
        </div>
        <div class="relative md:w-64">
          <input
            class="bg-gray-50 border capitalize border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            type="text" placeholder="ค้นหา" />
          <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
        </div>
      </div>

      <!-- add/edit condition popup -->
      <BaseModal :isOpen="popUp" @close-modal="closeModal" @submit="submit" :classList="'w-full md:w-[40vw]'">
        <template #title>
          <h1 class="text-center text-2xl text-primary py-5 pr-4 md:pr-0">
            เพิ่มเงื่อนไข
          </h1>
        </template>
        <template #container>
          <div class="">
            <form action=""
              class="flex flex-col w-full justify-center items-center gap-5 text-primary mb-8 pr-4 md:pr-0 md:">
              <div class="w-full md:w-75">
                <label class="pb-1" for="departmentName">เพิ่มเงื่อนไข
                  <span class="text-red-600 font-bold">*</span></label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text" placeholder="เพิ่มเงื่อนไข" v-model="form.section" required />
              </div>
              <div class="w-full md:w-75">
                <label class="pb-1" for="timeIn">เวลาเข้างาน(00.00 - 23.00 น.)</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text" placeholder="เวลาเข้างาน" v-model="form.starttime" />
              </div>
              <div class="w-full md:w-75">
                <label class="pb-1" for="timeOut">เวลาออกงาน(00.00 - 23.00 น.)</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text" placeholder="เวลาออกงาน" v-model="form.endtime" />
              </div>
              <div class="w-full md:w-75">
                <label class="pb-1" for="restHour">เงื่อนไข</label>
                <select id="restHour"
                  class="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  v-model="form.finetype_id" required>
                  <option value="" hidden selected>กรุณาเลือกเงื่อนไข</option>
                  <option v-for="data in getFineType" :key="data.id" :value="data.id" class="capitalize">
                    {{ data.name }}
                  </option>
                </select>
              </div>
              <div class="w-full md:w-75">
                <label for="workday" class="pb-1">คะแนน<span class="text-red-600 font-bold">*</span></label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text" placeholder="เวลาออกงาน" v-model="form.point" />
              </div>
              <div class="w-full md:w-75">
                <input type="checkbox" value="" v-model="form.no_stamp"
                  class="w-6 h-6 text-lightGreen bg-gray-100 rounded-lg" />
                <span class="text-primary ml-2">สแตมป์ / เช็คอิน</span>
              </div>
              <div class="w-full md:w-75">
                <input type="checkbox" value="" v-model="form.linenotify"
                  class="w-6 h-6 text-lightGreen bg-gray-100 rounded-lg" />
                <span class="text-primary ml-2">แจ้งเตือนทางไลน์</span>
              </div>
            </form>
          </div>
        </template>
      </BaseModal>

      <!-- table -->
      <div class="overflow-x-auto hidden md:block">
        <table class="w-full border-collapse text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-3 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-20 py-3 font-medium">{{ $t('name') }}</th>
              <th scope="col" class="px-2 py-3 font-medium">เวลาเข้างาน</th>
              <th scope="col" class="px-2 py-3 font-medium">เวลาออกงาน</th>
              <th scope="col" class="px-2 py-3 font-medium">เงื่อนไข</th>
              <th scope="col" class="px-2 py-3 font-medium">คะแนน</th>
              <th scope="col" class="px-2 py-3 font-medium">
                สแตมป์ / เช็คอิน
              </th>
              <th scope="col" class="px-2 py-3 font-medium">แจ้งเตือนไลน์</th>
              <th scope="col" class="px-2 py-3 font-medium rounded-r-full">
                {{ $t('edit') }}/{{ $t('delete') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, i) in tableData" :key="data.id" class="bg-white">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ i + 1 }}
              </th>
              <td class="px-1 py-2">{{ data.section }}</td>
              <td class="px-1 py-2">{{ data.starttime }}</td>
              <td class="px-1 py-2">{{ data.endtime }}</td>
              <td class="px-6 py-4">{{ data.finetype.name }}</td>
              <td class="px-6 py-4">{{ data.point }}</td>
              <td class="px-1 py-2">
                <div class="flex w-full justify-center">
                  <img v-if="data.no_stamp" src="@/assets/images/tick.svg" alt="" />
                  <img v-else src="@/assets/images/false.svg" alt="" />
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex w-full justify-center">
                  <img v-if="data.linenotify" src="@/assets/images/tick.svg" alt="" />
                  <img v-else src="@/assets/images/false.svg" alt="" />
                </div>
              </td>
              <td class="px-6 py-4 text-right flex">
                <div @click="editConditionOut(data.id)"
                  class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/editblack.svg" alt="" />
                </div>
                <div @click="$deleteData('checkout-condition', data.id)"
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
        <div v-for="(data, index) in tableData" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="toggleAccordion(index, 'conditionSignOut')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`conditionSignOut-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize">{{ data.section }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium">{{ $t('name') }}</h1>
              <span class="text-gray-400 capitalize">{{ data.section }}</span>
            </div>
            <div>
              <h1 class="font-medium">เวลาเข้างาน</h1>
              <span class="text-gray-400">{{ data.starttime }}</span>
            </div>
            <div>
              <h1 class="font-medium">เวลาออกงาน</h1>
              <span class="text-gray-400">{{ data.endtime }}</span>
            </div>
            <div>
              <h1 class="font-medium">เงื่อนไข</h1>
              <span class="text-gray-400">
                {{ data.finetype.name }}
              </span>
            </div>
            <div>
              <h1 class="font-medium">คะแนน</h1>
              <span class="text-gray-400">
                {{ data.point }}
              </span>
            </div>
            <div>
              <h1 class="font-medium">สแตมป์ / เช็คอิน</h1>
              <div class="flex items-center gap-2">
                <div class="flex w-full justify-center">
                  <img v-if="data.no_stamp" src="@/assets/images/tick.svg" alt="" />
                  <img v-else src="@/assets/images/false.svg" alt="" />
                </div>
              </div>
            </div>
            <div>
              <h1 class="font-medium">แจ้งเตือนไลน์</h1>
              <div class="flex w-full justify-center">
                <img v-if="data.linenotify" src="@/assets/images/tick.svg" alt="" />
                <img v-else src="@/assets/images/false.svg" alt="" />
              </div>
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

      <div class="flex justify-end items-center gap-2 text-sm text-h1mute pr-4 md:pr-0 mt-5">
        <v-pagination v-model="page" :pages="last_page" :range-size="1" active-color="" @update:modelValue="getPaginateNo"
          hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

var data = {
  id: null,
  shifttime_id: null,
  company_id: null,
  finetype_id: "",
  section: null,
  starttime: null,
  endtime: null,
  point: null,
  no_stamp: null,
  linenotify: null,

  finetype: {
    id: null,
    name: null,
    code: null,
  },
};
export default {
  props: ["passShiftTimeId"],
  data() {
    return {
      popUp: false,
      checked: false,
      loading: true,
      color: "#36A1EA",
      size: "20px",
      page: null,
      pageCount: null,
      pagi: null,
      last_page: null,
      popUpForm: false,
      signUp: false,
      tableData: [],
      form: { ...data },
      shifttime_id: {
        shifttime_id: this.passShiftTimeId,
        listNum: "",
      },
    };
  },

  methods: {
    ...mapActions(["fetchFineType"]),
    async getPaginateNo() {
      await this.axios
        .post("/checkout-conditions?page=" + this.page, this.shifttime_id)
        .then((response) => {
          this.pagi = response.data.pagi;
          this.page = response.data.conditions.current_page;
          this.last_page = response.data.conditions.last_page;
          this.tableData = response.data.conditions.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    async editConditionOut(id) {
      this.loading = true;
      await this.axios
        .get("checkout-condition/edit/" + id)
        .then((response) => {
          this.form = response.data.data;
          this.form.no_stamp = this.form.no_stamp === 1 ? true : false;
          this.form.linenotify = this.form.linenotify === 1 ? true : false;
          if (response.data.success === true) {
            this.popUp = true;
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    closeModal() {
      this.popUp = false;
      this.form = { ...data };
    },

    async submit() {
      if (this.form.id) {
        await this.axios
          .post("checkout-condition/update/" + this.form.id, this.form)
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
                  this.getPaginateNo();
                });
            }
          });
      } else {
        this.form.shifttime_id = this.shifttime_id.shifttime_id;
        await this.axios
          .post("checkout-condition/create", this.form)
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
                  this.getPaginateNo();
                });
            }
          });
      }
    },
  },

  computed: {
    ...mapGetters(["getFineType"]),
  },

  mounted() {
    this.$paginateData.current_page = 1;
    this.fetchFineType();
    this.getPaginateNo();
  },
};
</script>

<style scoped></style>
