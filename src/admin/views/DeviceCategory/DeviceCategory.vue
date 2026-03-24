<template>
  <main class="px-4 my-8">
    <teleport to="body">
      <BaseModal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </BaseModal>
    </teleport>

    <BaseModal :isOpen="popUp" @closeModal="closeModal" :classList="'w-full md:w-[30vw]'">
      <template #title>เพิ่มอุปกรณ์</template>
      <template #container>
        <div class="md:px-5 py-7">
          <div class="w-full px-10">
            <form class="grid gap-3">
              <div class="grid gap-3">
                <label for="name" class="text-primary">{{ $t("name") }}<span class="text-red-500">*</span></label>
                <input class="rounded-lg" :class="$errorBorder('name')" type="text" :placeholder="$t('name')"
                  v-model="form.name" />
              </div>
              <div class="grid gap-3">
                <label for="name" class="text-primary">{{ $t("type") }}<span class="text-red-500">*</span></label>
                <select class="rounded-lg capitalize" name="type" id="type" v-model="form.type" required>
                  <option value="" selected hidden>Choose Type</option>
                  <option v-for="(item, index) in getTypeSelector" :key="'type' + index" :value="item.name">{{ item.name
                  }}
                  </option>
                </select>
              </div>
            </form>
          </div>
        </div>
      </template>
      <template #buttons>
        <div class="flex items-center justify-center gap-10 py-8">
          <button @click="closeModal"
            class="w-1/4 py-2 !ring-red-400 border border-red-400 text-red-400 rounded-xl duration-300 hover:bg-red-400 hover:text-white">
            {{ $t("close") }}
          </button>
          <button @click="createOrUpdate(form.id)"
            class="w-1/4 py-2 border border-origin text-white bg-origin rounded-xl duration-300 hover:bg-white hover:text-origin">
            {{ $t("save") }}
          </button>
        </div>
      </template>
    </BaseModal>

    <div>
      <div class="tab inline-block md:px-10 px-8 py-3 font-medium text-xs md:text-sm bg-white text-origin">
        หมวดหมู่อุปกรณ์
      </div>
    </div>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center p-4 md:p-0 md:pb-8 md:mb-5">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-2xl md:text-3xl">หมวดหมู่อุปกรณ์</h1>
        </div>
        <div @click="addOrEdit('add')"
          class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div>

      <div class="relative grid md:flex gap-2 md:gap-0 items-center p-4 md:p-0 mb-7 px-14 md:px-0">
        <div class="md:mr-4 flex gap-3 w-full md:w-3/5">
          <select
            class="border w-full md:w-56 border-slate-300 p-2.5 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" @change="
              $getPagination('device-categories', 'device_categories', filter)
              " v-model="filter.listNum">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
        </div>

        <div class="relative md:w-2/5">
          <input class="rounded-xl border-slate-300 w-full" type="text" placeholder="ค้นหา" v-model.trim="filter.search"
            @keyup="
              $getPagination('device-categories', 'device_categories', filter)
              " />
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
              <th scope="col" class="px-10 py-2 font-medium">
                {{ $t("created") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("editDate") }}
              </th>
              <th scope="col" class="px-4 py-2 font-medium rounded-r-full">
                {{ $t("editTime") }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, index) in filteredList" :key="index" class="bg-white text-primary">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </th>
              <td class="px-1 py-2 whitespace-nowrap">{{ data.name }}</td>
              <td class="px-1 py-2 whitespace-nowrap">
                {{ this.$moment(data.created_at).format("DD/MM/YYYY") }}
              </td>
              <td class="px-1 py-2 whitespace-nowrap">
                {{ this.$moment(data.updated_at).format("DD/MM/YYYY") }}
              </td>
              <td class="px-1 py-2 flex justify-center">
                <div @click="addOrEdit('edit', data.id)"
                  class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/editblack.svg" alt="" />
                </div>
                <div @click="
                  deleteDeviceCat(data.id)
                  "
                  class="flex items-center border-2 shadow-lg rounded-r-large px-3 py-1 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/bin.svg" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in filteredList" :key="index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="this.$toggleAccordion(index, 'deviceCategory')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`deviceCategory-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{ data.name }}</span>
          </button>

          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            id="content" :class="data.open ? 'h-auto ' : 'h-0'">
            <div class="grid gap-2">
              <h1 class="font-medium">{{ $t("name") }}</h1>
              <span class="text-gray-400 capitalize">{{ data.name }}</span>
            </div>
            <div class="grid gap-2">
              <h1 class="font-medium">{{ $t("created") }}</h1>
              <span class="text-gray-400">
                {{ this.$moment(data.created_at).format("DD/MM/YYYY") }}
              </span>
            </div>
            <div class="grid gap-2">
              <h1 class="font-medium">{{ $t("editDate") }}</h1>
              <span class="text-gray-400">
                {{ this.$moment(data.updated_at).format("DD/MM/YYYY") }}
              </span>
            </div>
            <div class="grid gap-2">
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-3 mt-2">
                <button @click="addOrEdit('edit', data.id)"
                  class="bg-sky-100 p-3 rounded-full hover:bg-sky-200 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/edit.svg" alt="" />
                </button>
                <button @click="
                  deleteDeviceCat(data.id)
                  " class="bg-red-500 p-3 rounded-full hover:bg-red-600 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4 md:pr-0">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="
            $getPagination('device-categories', 'device_categories')
            " hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import BaseModal from "@/components/CustomModal/BaseModal.vue";
import { mapGetters, mapActions } from "vuex";


var data = {
  name: "",
  type: "",
};

export default {
  name: "Device-Category",
  components: { BaseModal },
  data() {
    return {
      popUp: false,
      loading: true,
      color: "#36A1EA",
      size: "20px",
      page: null,
      last_page: null,
      companyProfile: false,
      tableData: [],
      form: { ...data },
      errors: { name: "" },
      windowWidth: window.innerWidth,
      filter: {
        listNum: "",
        search: "",
      },
    };
  },

  methods: {
    ...mapActions(["fetchTypeSelector"]),

    closeModal() {
      this.popUp = false;
      this.form = { ...data };
      this.errors = { ...data };
      this.$errorBorder(this.errors);
    },

    addOrEdit(state, id) {
      if (state == "add") {
        this.popUp = true;
      } else if (state == "edit") {
        this.loading = true;
        this.axios
          .get("device-category/edit/" + id)
          .then((res) => {
            this.form = res.data.data;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
            this.popUp = true;
          });
      }
    },

    createOrUpdate(id) {
      if (id) {
        this.axios
          .post("device-category/update/" + id, this.form)
          .then((res) => {
            if (res.data.success === true) {
              this.$swal({
                icon: "success",
                text: "แก้ไขสำเร็จ!",
                html: "<span class='text-sm'>ทำการแก้ไขแพ็กเกจเรียบร้อยแล้ว</span>",
                confirmButtonText: "ตกลง",
              }).finally(() => {
                this.closeModal()
                this.$getPagination("device-categories", "device_categories");
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.axios
          .post("device-category/create", this.form)
          .then((res) => {
            if (res.data.success) {
              this.$swal({
                icon: "success",
                text: "เพิ่มสำเร็จ!",
                html: "<span class='text-sm'>ทำการเพิ่มแพ็กเกจเรียบร้อยแล้ว</span>",
                confirmButtonText: "ตกลง",
              }).finally(() => {
                this.closeModal()
                this.$getPagination("device-categories", "device_categories");
              });
            } else {
              this.$validateMsg(res.data.message);
            }
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => { });
      }
    },

    deleteDeviceCat(id) {
      this.$swal({
        showCancelButton: true,
        html: "<h1 class='text-[25px] md:text-3xl'>คุณต้องการลบข้อมูลนี้ ?</h1> <br/> <span class='text-sm'>หากลบไปแล้วจะไม่สามารถเรียกกลับคืนได้</span>",
        confirmButtonText: "ใช่ ฉันต้องการลบ",
        cancelButtonText: "ยกเลิก",
      }).then((result) => {
        if (result.isConfirmed) {
          this.axios.delete('device-category/delete/' + id).then(() => { }).catch((err) => console.log(err)).finally(() => {
            this.loaing = false
            this.$swal({
              icon: "success",
              html: "<h1 class='text-[25px] md:text-3xl'>ลบสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการลบข้อมูลเรียบร้อยแล้ว</span>",
              confirmButtonText: "ตกลง",
            }).then(() => {
              this.$getPagination("device-categories", "device_categories")
            })
          })
        }
      }).catch((err) => {
        console.log(err);
      })
    }

  },

  computed: {
    ...mapGetters(["getTypeSelector"]),
    filteredList() {
      return this.tableData.filter((list) => {
        return list.name
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },

  mounted() {
    this.loading = false;
    this.$paginateData.current_page = 1;
    this.fetchTypeSelector();
    this.$getPagination(
      "device-categories",
      "device_categories",
      this.filter,
      true
    );
  },
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style scoped>
.box {
  box-shadow: 3.30726px 3.30726px 12.40223px 0px rgba(0, 0, 0, 0.25),
    0px 0px 3.30726px 0px rgba(0, 0, 0, 0.1) inset;
}
</style>
