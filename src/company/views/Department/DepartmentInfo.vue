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
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center px-5 py-3 md:p-8">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1 bg-origin"></div>
          <h1 class="text-primary text-[26px] md:text-3xl">{{ $t('department') }} | {{ $t('position') }}</h1>
        </div>
        <div @click="addDepartment = true"
          class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div>
      <div class="grid md:flex gap-2 md:gap-4 w-full p-8">
        <div class="relative">
          <select
            class="border w-full md:w-auto border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            v-model="filter.listNum" @change="this.$getPaginateNo('departments')">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
          </select>
        </div>
        <div class="w-full md:w-1/4">
          <VueDatePicker :teleport="true" v-model="date" :enable-time-picker="false"
            @change="this.$getPaginateNo('departments')" />
        </div>
        <div class="relative w-full md:w-2/4">
          <input
            class="border w-full border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            type="text" placeholder="ค้นหา" v-model.trim="filter.search" @keyup="this.$getPaginateNo('departments')" />
          <font-awesome-icon class="absolute top-3 right-4 text-muted" icon="fa-solid fa-search" />
        </div>
      </div>

      <!-- add department popup -->
      <BaseModal :isOpen="addDepartment" class="!p-0" :classList="'md:w-[50vw] w-full'" @submit="createDepartment"
        @close-modal="addDepartment = false">
        <template #title>
          <h1 class="text-center text-2xl text-primary"> {{ $t('add_enterprise_level') }} </h1>
        </template>
        <template #container>
          <div class="">
            <form class="md:flex w-full justify-center gap-10 p-4 text-primary">
              <div class="flex flex-col md:w-2/5 mb-3 md:mb-0">
                <label class="pb-1" for="departmentName">{{ $t('department_name') }} <span
                    class="text-red-600 font-bold">*</span>
                </label>
                <div>
                  <input
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    :class="$errorBorder('name')" type="text" :placeholder="$t('department_name')" v-model="form.name"
                    required />
                  <small>{{ errors.name }}</small>
                </div>
              </div>
              <div class="flex flex-col md:w-2/5">
                <label class="pb-1" for="departmentManager">ผู้จัดการแผนก</label>
                <select id="departmentManager"
                  class="border border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  v-model="form.employee_id" required>
                  <option value="" selected hidden>{{ $t('instruction.please_choose_manager') }}</option>
                  <option v-for="manager in departmentManagers" :key="manager.id" :value="manager.id">
                    {{ manager.fullname }}
                  </option>
                </select>
              </div>
            </form>
          </div>
        </template>
      </BaseModal>

      <!-- edit department popup -->
      <BaseModal :isOpen="editDepartment" @close-modal="editDepartment = false" :classList="'md:w-[50vw] w-full'"
        @submit="updateDepartment(editForm.id)">
        <template #title>
          <h1 class="text-center text-2xl text-primary"> {{ $t('enterprise_level_editing') }} </h1>
        </template>
        <template #container>
          <div class="">
            <form action="" class="grid md:flex flex-col w-full justify-center items-center gap-4 text-primary pr-4 mb-4">
              <div class="md:w-75">
                <label class="pb-1" for="departmentName"> {{ $t('department_name') }} <span
                    class="text-red-600 font-bold">*</span></label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text" :placeholder="`${$t('department_name')}`" v-model="editForm.name" required />
              </div>
              <div class="md:w-75">
                <label class="pb-1" for="departmentName">{{ $t('id_department') }} </label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="number" v-model="editForm.department_id" :placeholder="`${$t('id_department')}`" />
              </div>
              <div class="md:w-75">
                <label class="pb-1" for="departmentName">{{ $t('branch') }}</label>
                <input
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text" v-model="editForm.branch" :placeholder="`${$t('branch')}`" />
              </div>
              <div class="md:w-75">
                <label class="pb-1" for="departmentName">{{ $t('manager') }}</label>
                <select id="departmentManager"
                  class="w-full border border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  v-model="editForm.employee_id">
                  <option value="1">กรุณาเลือกผู้จัดการ</option>
                  <option v-for="manager in departmentManagers" :key="manager.id" :value="manager.id">
                    {{ manager.fullname }}
                  </option>
                </select>
              </div>
            </form>
          </div>
        </template>
      </BaseModal>

      <!-- table -->
      <div class="overflow-x-auto hidden md:block">
        <table class="w-full text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-2 py-1 font-medium rounded-l-full">
                {{ $t('no.') }}
              </th>
              <th scope="col" class="px-1 py-1 font-medium">{{ $t('name') }}</th>
              <th scope="col" class="px-2 py-1 font-medium">ID แผนก</th>
              <th scope="col" class="px-2 py-1 font-medium">{{ $t('branch') }}</th>
              <th scope="col" class="px-2 py-1 font-medium">{{ $t('position') }}</th>
              <th scope="col" class="px-2 py-1 font-medium">{{ $t('manager') }}</th>
              <th scope="col" class="px-2 py-1 font-medium">{{ $t('created') }}</th>
              <th scope="col" class="px-2 py-1 font-medium">{{ $t('editTime') }}</th>
              <th scope="col" class="px-2 py-1 font-medium rounded-r-full">
                {{ $t('edit') }}/{{ $t('delete') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, i) in filteredList" :key="data.id" class="bg-white">
              <th scope="row" class="px-4 py-2 font-medium text-primary whitespace-nowrap">
                {{ i + 1 }}
              </th>
              <td class="px-4 py-2 capitalize">{{ data.name }}</td>
              <td class="px-4 py-2 capitalize">{{ data.id }}</td>
              <td class="px-4 py-2 capitalize">{{ data.branch }}</td>
              <td class="px-4 py-2">
                <div class="flex justify-center items-center gap-2">
                  100
                  <div @click="goToPosition(data.id)"
                    class="relative border-2 p-2 rounded-full shadow-lg hover:bg-slate-200">
                    <img src="@/assets/images/person-work.svg" alt="" />
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 capitalize">
                {{ data.title }} {{ data.firstname }} {{ data.lastname }}
              </td>
              <td class="px-6 py-4 capitalize">
                {{ this.$moment(data.created_at).format("DD/MM/YYYY") }}
              </td>
              <td class="px-6 py-4 capitalize">
                {{ this.$moment(data.updated_at).format("DD/MM/YYYY") }}
              </td>
              <td class="px-6 py-4 text-right">
                <div class="flex">
                  <div @click="getDepartmentInfo(data.id)"
                    class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200">
                    <img src="@/assets/images/editblack.svg" alt="" />
                  </div>
                  <div @click="$deleteData(data.id)"
                    class="flex items-center border-2 shadow-lg rounded-r-large px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                    <img src="@/assets/images/bin.svg" alt="" />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in filteredList" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="this.$toggleAccordion(index, 'department')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`department-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize">{{ data.name }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div>
              <h1 class="font-medium">{{ $t('name') }}</h1>
              <span class="text-gray-400 capitalize">{{ data.name }}</span>
            </div>
            <div>
              <h1 class="font-medium">ID แผนก</h1>
              <span class="text-gray-400">{{ data.id }}</span>
            </div>
            <div>
              <h1 class="font-medium">{{ $t('branch') }}</h1>
              <span class="text-gray-400">{{ data.branch }}</span>
            </div>
            <div>
              <h1 class="font-medium">{{ $t('position') }}</h1>
              <div class="flex justify-normal items-center gap-2">
                <span>100</span>
                <div @click="goToPosition(data.id)"
                  class="relative border-2 p-2 rounded-full shadow-lg hover:bg-slate-200">
                  <img src="@/assets/images/personBlue-work.svg" alt="" />
                </div>
              </div>
            </div>
            <div>
              <h1 class="font-medium">{{ $t('manager') }}</h1>
              <span class="text-gray-400">
                {{ data.title }} {{ data.firstname }} {{ data.lastname }}
              </span>
            </div>
            <div>
              <h1 class="font-medium">สร้างเมื่อ</h1>
              <span class="text-gray-400">
                {{ this.$moment(data.created_at).format("DD/MM/YYYY") }}
              </span>
            </div>
            <div>
              <h1 class="font-medium">แก้ไขเมื่อ</h1>
              <span class="text-gray-400">
                {{ this.$moment(data.updated_at).format("DD/MM/YYYY") }}
              </span>
            </div>
            <div>
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-3 mt-2">
                <button @click="getDepartmentInfo(data.id)"
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

      <div class="flex justify-end items-center gap-2 text-sm text-h1mute">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="this.$getPaginateNo('departments')" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
let data = {
  branch: "",
  company_id: "",
  created_at: "",
  department_id: null,
  employee_id: "",
  id: "",
  name: "",
  updated_at: "",
};
export default {
  name: "department",
  data() {
    return {
      loading: true,
      color: "#36A1EA",
      size: "20px",
      page: null,
      pageCount: null,
      pagi: null,
      last_page: null,
      addDepartment: false,
      editDepartment: false,
      form: { name: "", employee_id: "" },
      editForm: { ...data },
      errors: { ...data },
      date: new Date("07-03-2023"),
      tableData: [],
      departmentManagers: [],
      filter: {
        listNum: "",
        search: "",
      },
    };
  },
  methods: {
    goToPosition(id) {
      this.$emit("changeTab", 2, id);
    },
    filterList() {
      this.$getPaginateNo("departments");
    },

    toggleAccordion(id) {
      for (let i in this.tableData) {
        if (i != id) {
          this.tableData[i].open = false;
        }
      }
      this.tableData[id].open = !this.tableData[id].open;
      document
        .querySelector(`#department-chevron-${id}`)
        .classList.toggle("rotate");
    },

    async getDepartmentManagers() {
      this.loading = true;
      await this.axios
        .get("department-managers")
        .then((response) => {
          this.departmentManagers = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async createDepartment() {
      this.loading = true;
      await this.axios
        .post("department/create", this.form)
        .then((response) => {
          if (response.data.success === true) {
            this.addDepartment = false;
            this.$swal({
              icon: "success",
              html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
              confirmButtonText: "ตกลง",
            }).then(() => {
              this.$getPaginateNo("departments");
            });
          } else {
            this.$validateMsg(response.data.message)
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    async getDepartmentInfo(id) {
      this.loading = true;
      this.getDepartmentManagers();
      await this.axios
        .get("department/edit/" + id)
        .then((response) => {
          console.log(response);
          this.editForm = response.data.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
          this.editDepartment = true;
        });
    },
    async updateDepartment(id) {
      await this.axios
        .post("department/update/" + id, this.editForm)
        .then((response) => {
          if (response.data.success === true) {
            this.editDepartment = false;
            this.$swal({
              icon: "success",
              html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
              confirmButtonText: "ตกลง",
            }).then(() => {
              this.$getPaginateNo("departments");
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  computed: {
    filteredList() {
      return this.tableData.filter((list) => {
        return list.name
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },

  mounted() {
    this.$paginateData.current_page = 1;
    this.$getPaginateNo("departments");
    this.getDepartmentManagers();
  },
};
</script>
