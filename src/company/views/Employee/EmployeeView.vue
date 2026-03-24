<template>
  <main>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center pb-8 p-7">
        <div class="flex items-center gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-[30px] font-medium">{{ $t('employee_list') }}</h1>
        </div>
        <div @click="this.$router.push({ name: 'addEmployee' })"
          class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div>
      <div class="relative md:flex items-center mb-7 p-5 pt-0 overflow-auto">
        <div class="grid md:flex gap-2">
          <select
            class="border border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" v-model="filter.listNum" @change="getPaginateNo">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="30">แสดง 30 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
          <div class="md:flex">
            <div class="grid gap-2 md:gap-0 md:flex">
              <div
                class="hidden md:block border border-slate-300 p-2.5 text-gray-700 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500"
                name="page" id="">
                <font-awesome-icon class="text-lg" icon="fa-solid fa-filter" />
              </div>
              <select
                class="border border-slate-300 p-2.5 rounded-lg md:rounded-none text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500"
                name="page" id="">
                <option value="">{{ $t('enterpriseLevel') }}</option>
              </select>
              <select
                class="capitalize border border-slate-300 p-2.5 rounded-lg md:rounded-none text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500"
                name="department" id="department" v-model="filter.department" @change="handleDepartmentSelect">
                <option value="">{{ $t('department') }}</option>
                <option v-for="department in departments" :value="department.id">{{ department.name }}</option>
              </select>
              <select
                class="capitalize border border-slate-300 p-2.5 rounded-lg md:rounded-none text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500"
                name="departpositionment" id="position" v-model="filter.position" @change="getPaginateNo">
                <option value="">{{ $t('position') }}</option>
                <option v-for="position in positions" :value="position.id">{{ position.name }}</option>
              </select>
              <select
                class="border border-slate-300 p-2.5 rounded-lg md:rounded-none text-gray-700 text-sm focus:ring-blue-500 focus:border-blue-500"
                name="page" id="">
                <option :value="true">{{ $t('active') }}</option>
                <option :value="false">{{ $t('inactive') }}</option>
              </select>
              <div
                class="hidden md:block border border-slate-300 p-2.5 text-gray-700 cursor-pointer text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500"
                name="page" id="" @click="resetFilter">
                <font-awesome-icon class="text-lg text-orange-400" icon="fa-solid fa-rotate-left" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex md:flex-row flex-col-reverse relative md:justify-end md:items-center w-full mt-2 md:mt-0">
          <div class="flex justify-end mt-2 md:mt-0">
            <div
              class="block md:hidden border border-slate-300 p-3 rounded-lg text-gray-700 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500"
              name="page" id="">
              <font-awesome-icon class="text-lg text-orange-400" icon="fa-solid fa-rotate-left" />
            </div>
            <div class="border border-slate-300 rounded-lg ml-4 p-1 hover:bg-slate-200 duration-300">
              <img src="@/assets/images/excel.svg" alt="" />
            </div>
          </div>

          <div class="relative md:float-right md:ml-4">
            <input class="w-full rounded-xl border-slate-300" type="text" placeholder="ค้นหา" v-model.trim="filter.search"
              @keyup="getPaginateNo" />
            <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
          </div>
        </div>
      </div>

      <!-- table -->
      <div class="overflow-x-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-2 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-20 py-2 font-medium">{{ $t('name') }}</th>
              <th scope="col" class="px-2 py-2 font-medium"> {{ $t('department') }}</th>
              <th scope="col" class="px-2 py-2 font-medium"> {{ $t('positin') }}</th>
              <th scope="col" class="px-2 py-2 font-medium"> {{ $t('shift_time') }}</th>
              <th scope="col" class="px-2 py-2 font-medium"> {{ $t('status') }}</th>
              <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
                {{ $t('edit') }}/{{ $t('delete') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, i) in tableData" :key="data.id" class="bg-white">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++i }}
              </th>
              <td class="px-1 py-2">
                <RouterLink :to="{ path: 'employee/employeeInfo/' + data.id }" class="text-sky-400 capitalize">{{
                  data.title }} {{ data.firstname }} {{ data.lastname }}
                </RouterLink>
              </td>
              <td class="px-1 py-2 capitalize">{{ data.department_name }}</td>
              <td class="px-1 py-2 capitalize">{{ data.position_name }}</td>
              <td class="px-6 py-4 capitalize">{{ data.shift_name }}</td>
              <td class="px-1 py-2 capitalize">
                <div class="flex justify-center">
                  <img v-if="data.active !== 1" src="@/assets/images/unactive.svg" />
                  <img v-else-if="data.active === 1" src="@/assets/images/active.svg" />
                </div>
              </td>

              <td class="px-6 py-4 text-right flex justify-center">
                <RouterLink :to="{ path: 'employee/edit/' + data.id }"
                  class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200">
                  <div>
                    <img src="@/assets/images/editblack.svg" alt="" />
                  </div>
                </RouterLink>
                <div @click="deleteEmployee(data.id)"
                  class="flex items-center border-2 shadow-lg rounded-r-large px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/bin.svg" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in tableData" :key="index" class="border-t py-2 pl-5 pr-3 text-sm" id="accordion">
          <button @click="this.$toggleAccordion(index, 'position')" class="flex justify-start items-center w-full gap-3">
            <font-awesome-icon :id="`position-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize">{{ data.title }} {{ data.firstname }} {{ data.lastname }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition-all duration-500"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium">{{ $t('name') }}</h1>
              <span class="text-gray-400 capitalize">
                <RouterLink :to="{ path: 'employee/employeeInfo/' + data.id }" class="text-sky-400 capitalize">{{
                  data.title }} {{ data.firstname }} {{ data.lastname }}
                </RouterLink>
              </span>
            </div>
            <div>
              <h1 class="font-medium">{{ $t('department') }}</h1>
              <span class="text-gray-400">{{ data.name }}</span>
            </div>
            <div>
              <h1 class="font-medium">ตำแหน่ง</h1>
              <span class="text-gray-400">{{ data.companylevel_name }}</span>
            </div>
            <div>
              <h1 class="font-medium">เวลางาน</h1>
              <span class="text-gray-400">
                {{ data.salary }}
              </span>
            </div>
            <div>
              <h1 class="font-medium">สถานะ</h1>
              <span class="text-gray-400">
                {{ data.salary }}
              </span>
            </div>
            <div>
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-3 mt-2">
                <RouterLink :to="{ path: 'employee/edit/' + data.id }"
                  class="bg-sky-100 p-3 rounded-full hover:bg-sky-200 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/edit.svg" alt="" />
                </RouterLink>
                <button @click="$deleteData(data.id)" class="bg-red-500 p-3 rounded-full hover:bg-red-600 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="w-full h-full flex justify-center mt-32 mb-32">
        <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4">
        <v-pagination v-model="page" :pages="last_page" :range-size="1" active-color="" @update:modelValue="getPaginateNo"
          hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: "employeeview",
  data() {
    return {
      loading: true,
      color: "#36A1EA",
      size: "20px",
      addEmployee: false,
      page: null,
      pageCount: null,
      last_page: null,
      tableData: [],
      filter: {
        search: "",
        department: '',
        position: '',
        listNum: "",
        // active: Boolean,
      },
      deleteConfirmation: Boolean,
    };
  },
  methods: {
    ...mapActions(['fetchDepartments', 'fetchPositions']),
    getPaginateNo() {
      this.axios
        .post("/employees?page=" + this.page, this.filter)
        .then((response) => {
          this.last_page = response.data.data.last_page;

          this.page = response.data.data.current_page;
          this.tableData = response.data.data.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },

    resetFilter() {
      this.filter = {
        search: "",
        department: '',
        position: '',
        listNum: "",
      }
      this.$store.commit('setPositions', '')
      this.getPaginateNo()
    },

    async deleteEmployee(id) {
      this.$swal({
        showCancelButton: true,
        title: "คุณต้องการลบข้อมูลนี้ ?",
        html: "<span class='text-sm'>หากลบไปแล้วจะไม่สามารถเรียกกลับคืนได้</span>",
        confirmButtonText: "ใช่ ฉันต้องการลบ",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$swal({
            icon: "success",
            html: "<h1>ลบสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการเพิ่มระดับเรียบร้อยแล้ว</span>",
            confirmButtonText: "ตกลง",
          }).then(() => {
            this.getPaginateNo();
          });
          this.axios
            .delete("employees/delete/" + id)
            .then(() => { })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },

    handleDepartmentSelect() {
      this.getPaginateNo()
      this.fetchPositions(this.filter.department)
    }
  },

  computed: {
    ...mapState({
      departments: state => state.employee.departments,
      positions: state => state.employee.positions
    }),
    filteredList() {
      return this.tableData.filter((list) => {
        const fullname = list.firstname + list.lastname;
        return fullname
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },

  },

  mounted() {
    this.getPaginateNo();
    this.fetchDepartments();
    // this.fetchPositions();
  },
};
</script>

<style scoped></style>
