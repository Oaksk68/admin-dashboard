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
    <div class="relative bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center gap-4 mb-5 p-5 pb-0">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1.5 bg-origin rounded-xl"></div>
          <h1 class="text-primary text-[26px] md:text-3xl">ตำแหน่ง</h1>
        </div>
        <div @click="popUp = true"
          class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div>

      <div class="md:flex gap-4 md:w-4/5 p-10 pt-0 pb-8">
        <div class="grid md:flex gap-2">
          <div class="relative">
            <select
              class="w-full border border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              v-model="filter.listNum" @change="getPaginateNo">
              <option value="" selected hidden>แสดง 10 แถว</option>
              <option value="10">แสดง 10 แถว</option>
              <option value="20">แสดง 20 แถว</option>
              <option value="50">แสดง 50 แถว</option>
              <option value="100">แสดง 100 แถว</option>
            </select>
          </div>
          <div class="w-full md:w-1/4">
            <VueDatePicker :format="$format" v-model="date" :teleport="true" :enable-time-picker="false" />
          </div>
          <div class="relative w-full md:w-2/4">
            <input
              class="border w-full border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
              type="text" placeholder="ค้นหา" v-model.trim="filter.search" @keyup="getPaginateNo" />
            <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
          </div>
        </div>
      </div>

      <!-- add/edit department popup -->
      <BaseModal :isOpen="popUp" @close-modal="closePopUp" @submit="submit" :classList="'w-full md:w-[50vw]'">
        <template #title>
          <h1 class="text-center text-2xl text-primary py-5">เพิ่มตำแหน่ง</h1>
        </template>
        <template #container>
          <div class="">
            <form action=""
              class="flex p-3 pr-6 md:p-0 flex-col w-full justify-normal md:justify-center md:items-center gap-4 text-primary mb-5">
              <div class="md:w-75">
                <label class="pb-1" for="departmentName">{{ $t('department_name') }} <span
                    class="text-red-600 font-bold">*</span></label>
                <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
                  :class="$errorBorder('name')" type="text" :placeholder="$t('department_name')" v-model="form.name"
                  required />
                <em class="text-red-500 text-xs">{{ errors.name }}</em>
              </div>
              <div class="md:w-75">
                <label class="pb-1" for="departmentName">ID แผนก </label>
                <input class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
                  type="number" placeholder="ID แผนก" v-model.number="form.department_id" />
              </div>
              <div class="md:w-75">
                <label class="pb-1" for="departmentName">{{ $t('enterpriseLevel') }} <span
                    class="text-red-600 font-bold">*</span>
                </label>
                <select id="departmentManager"
                  class="bg-gray-50 border border-gray-300 capitalize text-gray-900 text-sm rounded-lg block w-full"
                  :class="$errorBorder('companylevel_id')" v-model="form.companylevel_id" required>
                  <option value="" selected disabled>
                    {{ $t('instruction.please_choose_enterprise_level') }}
                  </option>
                  <option v-for="data in getEnterpriseLevel" :key="data.id" :value="data.id" class="capitalize">
                    {{ data.name }}
                  </option>
                </select>
                <em class="text-red-500 text-xs">{{
                  errors.companylevel_id
                }}</em>
              </div>
              <div class="md:w-75">
                <label class="pb-1" for="departmentName">ผู้จัดการ </label>
                <select id="departmentManager"
                  class="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
                  v-model="form.position_id" required>
                  <option value="" disabled hidden selected>
                    {{ $t('instruction.please_choose_manager') }}
                  </option>
                  <option v-for="data in getManagers" :key="data.id" :value="data.id">
                    {{ data.fullname }}
                  </option>
                </select>
              </div>
              <div class="md:w-75">
                <label class="" for="lateStatus">Late Status</label>
                <select id="lateStatus"
                  class="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full"
                  v-model="form.late_status" required>
                  <option value="">Late Status</option>
                  <option :value="0">0</option>
                  <option :value="1">1</option>
                </select>
                <!-- <input type="checkbox" v-model="form.late_status" :true-value="1" :false-value="0" /> -->
              </div>
              <div class="md:w-75">
                <label for="late_limit_time">Late Limit Time</label>
                <VueDatePicker v-model="form.late_limit_time" placeholder="Select Date" model-type="HH:mm:ss" time-picker
                  :start-time="startTime" format="HH:mm">
                </VueDatePicker>
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
              <th scope="col" class="px-2 py-3 font-medium">ID แผนก</th>
              <th scope="col" class="px-2 py-3 font-medium">{{ $t('name') }}</th>
              <th scope="col" class="px-2 py-3 font-medium">{{ $t('enterpriseLevel') }}</th>
              <th scope="col" class="px-2 py-3 font-medium">{{ $t('salary') }}</th>
              <th scope="col" class="px-1 py-3 font-medium rounded-r-full">
                {{ $t('edit') }}/{{ $t('delete') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, i) in filteredList" :key="data.id" class="bg-white">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ i + 1 }}
              </th>
              <td class="px-1 py-2">{{ data.department_id }}</td>
              <td class="px-1 py-2 capitalize">{{ data.name }}</td>
              <td class="px-1 py-2 capitalize">{{ data.companylevel_name }}</td>
              <td class="px-6 py-4">{{ data.salary }}</td>
              <td class="px-1 py-4 flex justify-center">
                <div @click="getPositionInfo(data.id)"
                  class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/editblack.svg" alt="" />
                </div>
                <div
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
        <div v-for="(data, index) in filteredList" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="this.$toggleAccordion(index, 'position')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`position-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize">{{ data.name }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium">ID แผนก</h1>
              <span class="text-gray-400 capitalize">{{
                data.department_id
              }}</span>
            </div>
            <div>
              <h1 class="font-medium">{{ $t('name') }}</h1>
              <span class="text-gray-400">{{ data.name }}</span>
            </div>
            <div>
              <h1 class="font-medium">{{ $t('enterpriseLevel') }}ขา</h1>
              <span class="text-gray-400">{{ data.companylevel_name }}</span>
            </div>
            <div>
              <h1 class="font-medium">{{ $t('salary') }}</h1>
              <span class="text-gray-400">
                {{ data.salary }}
              </span>
            </div>
            <div>
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-3 mt-2">
                <button @click="getPositionInfo(data.id)"
                  class="bg-sky-100 p-3 rounded-full hover:bg-sky-200 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/edit.svg" alt="" />
                </button>
                <button @click="$deleteData(data.id)" class="bg-red-500 p-3 rounded-full hover:bg-red-600 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-7 flex justify-end items-center gap-2 text-sm text-h1mute">
        <v-pagination v-model="page" :pages="last_page" :range-size="1" active-color="" @update:modelValue="getPaginateNo"
          hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

let data = {
  id: null,
  company_id: "",
  department_id: Number,
  name: "",
  department_id: null,
  position_id: "",
  companylevel_id: "",
  salary: "",
  created_at: "",
  updated_at: "",
  late_status: "",
  late_limit_time: ""
};
export default {
  name: "Position",
  props: ["passDepartId"],
  data() {
    return {
      loading: true,
      color: "#36A1EA",
      size: "20px",
      date: new Date(),
      page: null,
      pageCount: null,
      last_page: null,
      form: { ...data },
      errors: { ...data },
      tableData: [],
      startTime: {
        hours: 0,
        minutes: 0
      },
      filter: {
        listNum: "",
        search: "",
      },
      popUp: false,
    };
  },

  methods: {
    ...mapActions(["fetchEnterpriseLevel", "fetchManagers"]),
    closePopUp() {
      this.popUp = false;
      this.form = { ...data };
      this.errors = { ...data };
    },

    async getPaginateNo() {
      let url = "positions";
      if (this.passDepartId) {
        url = "positions/" + this.passDepartId;
        console.log(url);
      }
      await this.axios
        .post(url + "?page=" + this.page, this.filter)
        .then((response) => {
          this.filter.listNum = response.data.pagi;
          this.last_page = response.data.positions.last_page;
          this.page = response.data.positions.current_page;
          this.tableData = response.data.positions.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    getPositionInfo(id) {
      this.loading = true;
      this.axios
        .get("position/edit/" + id)
        .then((response) => {
          this.form = response.data.data;
          // this.form.late_status = this.form.late_status.toString()
          console.log(this.form);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
          this.popUp = true;
        });
    },

    submit() {
      if (this.form.id) {
        console.log(this.form.id);
        this.axios.post("position/update/" + this.form.id, this.form).then((res) => {
          if (res.data.success) {

          } else {
            this.$validateMsg(res.data.message)
          }
        }).catch(err => {
          console.log(err);
        })
      } else {
        this.axios
          .post("position/create/" + this.form.department_id, this.form)
          .then((response) => {
            if (this.$errorMsg(response.data.message.companylevel_id)) {
              this.errors.companylevel_id =
                response.data.message.companylevel_id;
            } else {
              this.$validateMsg(response.data.message);
            }
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            if (this.form.name === "" || this.form.name === null) {
              this.errors.name = "Department Name is required";
            }
          });
      }
    },
  },

  computed: {
    ...mapGetters(["getEnterpriseLevel", "getManagers", "getId"]),
    filteredList() {
      return this.tableData.filter((list) => {
        return list.name
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },

  watch: {
    passDepartId(val) {
      if (val) {
        this.getPaginateNo();
      }
    },
  },

  mounted() {
    this.getPaginateNo();
    this.fetchEnterpriseLevel();
    this.fetchManagers();
  },
};
</script>

<style></style>
