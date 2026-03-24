<template>
  <main class="md:px-4 mt-6">
    <BaseModal :isOpen="adminPopup" @closeModal="closeModal" :classList="'w-full md:w-[50vw]'">
      <template #title>Admin (ผู้ดูแลระบบ)</template>
      <template #container>
        <div class="p-10">
          <div @click="closeModal"
            class="absolute flex justify-center items-center top-2 right-3 bg-[#F5666680] rounded-full px-2 py-[7px] cursor-pointer hover:bg-[#F56666] duration-300 ease-in-out">
            <font-awesome-icon class="text-white mx-auto" :icon="['fas', 'x']" size="2xs" />
          </div>
          <div class="flex gap-3 md:block">
            <img class="object-fit h-32 w-32 md:h-40 md:w-40 md:mx-auto" src="@/assets/images/profile.png" alt="" />
            <div class="grid gap-3 md:hidden text-primary text-sm">
              <div class="grid md:hidden w-full">
                <span class="md:w-40 font-medium">{{ $t("name") }}</span>
                <span class="text-h1mute font-normal">{{ adminInfo.title }} {{ adminInfo.firstname }}
                  {{ adminInfo.lastname }}</span>
              </div>
              <div class="grid md:hidden w-full">
                <span class="md:w-40 font-medium">{{ $t("userName") }}</span>
                <span class="text-h1mute font-normal">{{
                  adminInfo.username
                }}</span>
              </div>
            </div>
          </div>
          <div class="my-10 w-full grid md:justify-center gap-4 text-primary text-sm">
            <div class="hidden md:flex w-full">
              <span class="md:w-40 font-medium">{{ $t("name") }}</span>
              <span class="text-h1mute font-normal">{{ adminInfo.title }} {{ adminInfo.firstname }}
                {{ adminInfo.lastname }}</span>
            </div>
            <div class="hidden md:flex w-full">
              <span class="md:w-40 font-medium">{{ $t("userName") }}</span>
              <span v-if="adminInfo.username" class="text-h1mute font-normal">{{ adminInfo.username }}</span>
              <span class="text-h1mute" v-else>--</span>
            </div>
            <div class="grid md:flex w-full">
              <span class="md:w-40 font-medium"> {{ $t("email") }} </span>
              <span class="text-h1mute font-normal">{{ adminInfo.email }}</span>
            </div>
            <div class="grid md:flex w-full">
              <span class="md:w-40 font-medium"> {{ $t("phone") }} </span>
              <span class="text-h1mute font-normal" v-if="adminInfo.phone">{{ adminInfo.phone }}</span>
              <span class="text-h1mute" v-else>--</span>
            </div>
            <div class="grid md:flex w-full">
              <span class="md:w-40 font-medium"> {{ $t("birthday") }} </span>
              <span class="text-h1mute font-normal" v-if="adminInfo.birthdate">{{
                this.$moment(adminInfo.birthdate).format("DD/MM/YYYY") }}</span>
              <span class="text-h1mute" v-else>--</span>
            </div>
          </div>
        </div>
      </template>
    </BaseModal>

    <BaseModal :isOpen="addOrEditPopup" @close-modal="closeModal" :classList="'w-full md:w-[50vw]'">
      <template #title>เพิ่มแอดมินใหม่</template>
      <template #container>
        <div class="">
          <div>
            <div class="mx-auto w-[260px]">
              <ImageCropper :imgLink="form.image" @image-cropped="handleCroppedImage"></ImageCropper>
            </div>
          </div>
          <div class="my-10 w-full md:px-8 grid gap-4 text-primary text-sm">
            <form class="grid gap-4">
              <div class="grid md:flex items-center">
                <label for="prefix" class="md:w-40 font-medium">
                  {{ $t("prefix") }} <span class="text-red-500">*</span>
                </label>
                <div class="w-4/5 ">
                  <select class="w-full rounded-lg" :class="$errorBorder('title')" name="title" id="title"
                    v-model="form.title_id" required>
                    <option value="1">Mr.</option>
                    <option value="2">Mrs.</option>
                    <option value="3">Ms.</option>
                    <option value="4">Dr.</option>
                  </select>
                  <em>{{ errors.title }}</em>
                </div>
              </div>
              <div class="grid md:flex items-baseline">
                <label class="md:w-40 font-medium" for="name">{{ $t("name") }} <span class="text-red-500">*</span></label>
                <div class="w-4/5">
                  <input id="name" type="text" class="w-full rounded-lg mb-1" :class="$errorBorder('firstname')"
                    v-model="form.firstname" />
                  <em class="block">{{ errors.firstname }}</em>
                </div>
              </div>
              <div class="grid md:flex items-baseline">
                <label class="md:w-40 font-medium" for="surname">{{ $t("surname") }}
                  <span class="text-red-500">*</span>
                </label>
                <div class="w-4/5">
                  <input id="surname" type="text" class="w-full rounded-lg mb-1" v-model="form.lastname"
                    :class="$errorBorder('lastname')" />
                  <em class="block">{{ errors.lastname }}</em>
                </div>
              </div>
              <div class="grid md:flex items-baseline">
                <label class="md:w-40 font-medium" for="username">{{ $t("userName") }}
                  <span class="text-red-500">*</span>
                </label>
                <div class="w-4/5">
                  <input id="username" type="text" class="w-full rounded-lg mb-1" v-model="form.username" />
                  <em class="block"> {{ errors.username }} </em>
                </div>
              </div>
              <div class="grid md:flex items-baseline">
                <label class="md:w-40 font-medium" for="email">{{ $t("email") }} <span
                    class="text-red-500">*</span></label>
                <div class="w-4/5">
                  <input id="email" type="text" class="w-full rounded-lg mb-1" v-model="form.email"
                    :class="$errorBorder('email')" />
                  <em class="block"> {{ errors.email }}</em>
                </div>
              </div>
              <div class="grid md:flex items-baseline">
                <label class="md:w-40 font-medium" for="phone">{{ $t("phone") }} <span
                    class="text-red-500">*</span></label>
                <div class="w-4/5">
                  <input id="phone" type="text" class="w-full rounded-lg mb-1" v-model="form.phone" />
                  <em class="block">{{ errors.phone }}</em>
                </div>
              </div>
              <div class="grid md:flex items-baseline">
                <label class="md:w-40 font-medium" for="datePicker">{{ $t("birthdate") }}
                  <span class="text-red-500">*</span></label>
                <VueDatePicker name="datePicker" format="yyyy-MM-dd" class="w-4/5"
                  input-class-name="dp-custom-input rounded-lg" v-model="form.birthdate" :teleport="true"
                  :enable-time-picker="false">
                </VueDatePicker>
              </div>
            </form>
            <div class="flex justify-center items-center gap-5 mt-10">
              <button @click="closeModal"
                class="w-1/3 py-2 !ring-red-400 border border-red-400 text-red-400 rounded-xl duration-300 hover:bg-red-400 hover:text-white">
                {{ $t("cancel") }}
              </button>
              <button @click="addOrEditSubmit"
                class="w-1/3 py-2 border border-origin text-white bg-origin rounded-xl duration-300 hover:bg-white hover:text-origin">
                {{ $t("save") }}
              </button>
            </div>

          </div>
        </div>
      </template>
      <template #footer>
        <div>
        </div>
      </template>
    </BaseModal>

    <div>
      <div class="tab inline-block md:px-10 px-5 py-3 font-medium text-sm bg-white text-origin">
        แอดมิน
      </div>
    </div>

    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center p-4 md:p-0 md:mb-5">
        <div class="flex items-center gap-2 md:gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-2xl md:text-3xl">Admin(ผู้ดูแลระบบ)</h1>
        </div>
        <div @click="addOrEdit('add')"
          class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div>
      <div class="relative grid md:flex gap-2 md:gap-0 md:justify-between items-center md:p-0 mb-7 px-14">
        <div class="md:mr-4 md:flex md:gap-3">
          <select
            class="border w-full md:w-40 border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" @change="$getPaginateNo('devices'), filter" v-model="filter.listNum">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
        </div>

        <div class="relative md:w-1/3">
          <input class="rounded-xl border-slate-300 w-full" type="text" placeholder="ค้นหา" v-model.trim="filter.search"
            @keyup="$getPaginateNo('admins', filter)" />
          <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
        </div>
      </div>

      <!-- table -->
      <div class="overflow-x-auto w-auto hidden md:block">
        <table class="w-full text-sm text-left text-primary">
          <thead class="text-md text-primary bg-calendarBg text-center">
            <tr>
              <th scope="col" class="px-6 py-2 font-medium rounded-l-full">
                {{ $t("no.") }}
              </th>
              <th scope="col" class="px-10 py-2 font-medium">
                {{ $t("name") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("userName") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("email") }}
              </th>
              <th scope="col" class="px-4 py-2 font-medium">
                {{ $t("created") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("lastLogin") }}
              </th>
              <th scope="col" class="py-2 font-medium rounded-r-full">
                {{ $t('edit') }}/{{ $t('delete') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(admin, index) in tableData" :key="'admin' + index" class="bg-white align-middle">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </th>
              <td class="px-1 py-2 whitespace-nowrap cursor-pointer">
                <div class="text-origin flex items-center gap-2" @click="showAdminDetail(admin.id)">
                  <img class="object-fill h-6 w-6" src="@/assets/images/employee.svg" alt="" />
                  {{ admin.title }} {{ admin.firstname }} {{ admin.lastname }}
                </div>
              </td>
              <td class="px-1 py-1 whitespace-nowrap cursor-pointer">
                <span v-if="admin.username == null">--</span>
                <span v-else>{{ admin.username }}</span>
              </td>
              <td class="px-1 py-1 whitespace-nowrap cursor-pointer">
                {{ admin.email }}
              </td>
              <td class="px-1 py-1 whitespace-nowrap cursor-pointer">
                {{ this.$moment(admin.created_at).format("DD/MM/YYYY") }}
              </td>
              <td>{{ this.$moment(admin.update_at).format("DD/MM/YYYY") }}</td>
              <td class="px-2 py-4 text-right flex justify-center">
                <div @click="addOrEdit('edit', admin.id)"
                  class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/editblack.svg" alt="" />
                </div>
                <div @click="$deleteData('admin', '', admin.id)"
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
        <div v-for="(admin, index) in tableData" :key="'admin' + index" class="border-t py-2 pl-5 pr-3 text-sm"
          id="accordion">
          <button @click="this.$toggleAccordion(index, 'admin')" class="flex justify-start items-center w-full gap-3">
            <font-awesome-icon :id="`admin-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-primary font-medium">{{ admin.title }} {{ admin.firstname }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            id="content" :class="admin.open ? 'h-auto ' : 'h-0'">
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("name") }}</h1>
              <div class="flex items-center gap-2">
                <img class="object-fill h-6 w-6" src="@/assets/images/employee.svg" alt="" />
                <span @click="showAdminDetail(admin.id)" class="text-origin capitalize cursor-pointer">{{ admin.title }}
                  {{
                    admin.firstname }}
                  {{ admin.lastname }}</span>
              </div>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("userName") }}</h1>
              <span class="text-gray-400">{{ admin.username }}</span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("email") }}</h1>
              <span class="text-gray-400"> {{ admin.email }} </span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("created") }}</h1>
              <span class="text-gray-400"> {{ this.$moment(admin.created_at).format("DD/MM/YYYY") }}</span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">การเข้าถึงครั้งล่าสุด</h1>
              <span class="text-gray-400"> {{ this.$moment(admin.updated_at).format("DD/MM/YYYY") }} </span>
            </div>
            <div>
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-3 mt-2 py-2">
                <button @click="addOrEdit('edit', admin.id)"
                  class="bg-sky-100 p-3 rounded-full shadow-lg hover:bg-sky-200 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/edit.svg" alt="" />
                </button>
                <button class="bg-red-500 p-3 rounded-full hover:bg-red-600 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4 md:pr-0">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="getPagination()" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import BaseModal from "@/components/CustomModal/BaseModal.vue";
import ImageCropper from '@/components/ImageCropper.vue';
import $ from 'jquery';

var data = {
  title_id: '',
  firstname: "",
  birthdate: "",
  lastname: "",
  username: "",
  email: "",
  phone: "",
}

export default {
  name: "employeeview",
  components: { ImageCropper, BaseModal },
  data() {
    return {
      adminPopup: false,
      addOrEditPopup: false,
      loading: false,
      color: "#36A1EA",
      size: "20px",
      page: null,
      last_page: null,
      img: "",
      tableData: [],
      decat: [],
      form: { ...data },
      errors: { ...data },
      adminInfo: {},
      state: "",
      windowWidth: window.innerWidth,
      filter: {
        listNum: "",
        search: "",
      },
    };
  },

  methods: {
    showAdminDetail(id) {
      this.loading = true;
      this.axios
        .get("admin/show/" + id)
        .then((res) => {
          this.adminInfo = res.data.data.original.data;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
          this.adminPopup = true;
        });
    },

    addOrEditSubmit() {
      if (this.state == 'edit') {
        this.form.title = this.form.title_id
        this.axios.post(`admin/update/${this.form.id}`, this.form).then((res) => {
          if (res.data.success) {
            this.$swal({
              icon: "success",
              title: "แก้ไขสำเร็จ!",
              text: res.data.message
            }).then(() => {
              this.addOrEditPopup = false
            })
          }
        }).catch((err) => {
          console.log(err);
        }).finally(() => {
          this.$getPaginateNo("admins", this.filter, true);
        });
      } else if (this.state == 'add') {
        this.addAdmin()
      }
    },

    // bdHandler(val) {
    //   console.log(val);
    //   console.log(this.form.birthdate);
    // },

    addOrEdit(state, id) {
      if (state == "edit") {
        // this.loading = true;
        this.form = { ...this.tableData.find(data => data.id === id) }
        console.log(this.form);
        switch (this.form.title) {
          case 'Mr.':
            this.form.title_id = 1
            break;
          case 'Mrs.':
            this.form.title_id = 2
          case 'Ms.':
            this.form.title_id = 3
            break;
          case 'Dr.':
            this.form.title_id = 4
            break;
        }
        this.addOrEditPopup = true;
        this.state = state
      } else if (state == "add") {
        this.addOrEditPopup = true;
        this.state = state
      }
    },

    addAdmin() {
      if (this.form.title_id == 1) {
        this.form.title = 1;
      } else if (this.form.title_id == 2) {
        this.form.title = 2;
      } else if (this.form.title_id == 3) {
        this.form.title = 3;
      }
      this.form.title_id = parseInt(this.form.title_id);
      this.axios
        .post("admin/create", this.form)
        .then((res) => {
          console.log(this.form);
          if (res.data.success) {
            this.$swal({
              icon: 'success',
              title: 'เพิ่มสำเร็จ!',
              text: res.data.message
            })
          } else {
            this.$validateMsg(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.$getPaginateNo("admins", this.filter, true);
        });
    },

    closeModal() {
      this.form = { ...data };
      this.adminPopup = false;
      this.addOrEditPopup = false;
      this.errors = { ...data }
    },
    handleCroppedImage(img) {
      this.form.image = img;
    }
  },

  computed: {
    filteredList() {
      return this.tableData.filter((list) => {
        return list.firstname
          ?.toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },

  mounted() {
    this.$getPaginateNo("admins", this.filter, true);
  },
};
</script>

<style>
.customDatePicker {
  border-radius: 0% !important;
}
</style>
