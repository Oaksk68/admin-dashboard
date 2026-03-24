<template>
  <main class="md:px-4 mt-6">
    <teleport to="body">
      <BaseModal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </BaseModal>
    </teleport>

    <BaseModal :isOpen="packageDetail" @closeModal="closeModal" :classList="'w-full md:w-[60vw] z-[1035]'">
      <template #title>เพิ่มแพ็กเกจ</template>
      <template #container>
        <div class="">
          <div class="absolute top-2 right-3">
            <font-awesome-icon @click="closeModal" class="text-red-400 cursor-pointer duration-300 hover:text-red-300"
              icon="fa-solid fa-circle-xmark" size="xl" />
          </div>
          <form class="w-full md:px-14 grid gap-4 text-primary text-sm mb-10">
            <div class="grid w-full">
              <label for="name" class="font-medium">{{ $t("name") }}<span class="text-red-500">*</span></label>
              <input type="text" :placeholder="$t('name')" class="rounded-lg h-10" :class="$errorBorder('name')"
                v-model="form.name" />
              <em v-if="$errorBorder('name')">{{ errors.name }}</em>
            </div>
            <div class="grid w-full">
              <label for="user_qty_start" class="font-medium">จำนวน User เริ่มต้น<span
                  class="text-red-500">*</span></label>
              <input type="text" placeholder="ระบุจำนวน" class="rounded-lg h-10" :class="$errorBorder('user_qty_start')"
                v-model="form.user_qty_start" />
              <em v-if="$errorBorder('user_qty_start')">{{
                errors.user_qty_start
              }}</em>
            </div>
            <div class="grid w-full">
              <label for="name" class="font-medium">จำนวน User<span class="text-red-500">*</span></label>
              <input type="text" placeholder="ระบุจำนวน" class="rounded-lg h-10" :class="$errorBorder('user_qty')"
                v-model="form.user_qty" />
              <em v-if="$errorBorder('user_qty')">{{ errors.user_qty }}</em>
            </div>
            <div class="grid w-full">
              <label for="name" class="font-medium">ราคาต่อ User<span class="text-red-500">*</span></label>
              <input type="text" placeholder="ระบุจำนวน" class="rounded-lg h-10" :class="$errorBorder('price_per_user')"
                v-model="form.price_per_user" />
              <em v-if="$errorBorder('price_per_user')">{{
                errors.price_per_user
              }}</em>
            </div>
            <div class="grid w-full">
              <label for="name" class="font-medium">ราคาต่อเดือน</label>
              <input type="text" disabled class="rounded-lg h-10 bg-gray-300" v-model="pricePerMonth" />
            </div>
            <div class="grid w-full">
              <label for="name" class="font-medium">ส่วนลดต่อปี</label>
              <div class="flex items-center gap-3 w-full">
                <input type="text" placeholder="ระบุจำนวน" class="rounded-lg h-10 w-[90%]"
                  v-model="form.discount_per_year" />
                <span class="">%</span>
              </div>
            </div>
            <div class="grid w-full">
              <label for="name" class="font-medium">ราคาต่อปี</label>
              <input type="text" placeholder="" class="rounded-lg h-10 bg-gray-300" disabled v-model="pricePerYear" />
            </div>
            <div class="grid w-full">
              <label for="name" class="font-medium">รายละเอียด</label>
              <textarea type="text" rows="4" placeholder="รายละเอียด" class="rounded-lg" v-model="form.detail" />
            </div>
          </form>
        </div>
      </template>
      <template #buttons>
        <div class="flex items-center justify-center gap-10">
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
        แพ็กเกจ
      </div>
    </div>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center p-4 md:p-0 pb-8 md:mb-5">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-2xl md:text-3xl">รายการแพ็กเกจ</h1>
        </div>
        <div @click="addOrEditPackage('add')"
          class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div>
      <div class="relative grid md:flex gap-2 md:gap-0 items-center md:p-0 mb-7 px-14">
        <div class="md:mr-4 flex gap-3 w-full">
          <select
            class="border w-full md:w-56 border-slate-300 p-2.5 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" @change="$getPaginateNo('packages'), filter" v-model="filter.listNum">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
        </div>

        <div class="relative md:w-1/4">
          <input class="rounded-xl border-slate-300 w-full" type="text" placeholder="ค้นหา" v-model.trim="filter.search"
            @keyup="$getPaginateNo('packages', filter)" />
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
                {{ $t("company") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                จำนวน User เริ่มต้น
              </th>
              <th scope="col" class="px-6 py-2 font-medium">จำนวน User</th>
              <th scope="col" class="px-4 py-2 font-medium">
                ราคาต่อ User (บาท)
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                ราคาต่อเดือน (บาท)
              </th>
              <th scope="col" class="px-6 py-2 font-medium">ส่วนลด ต่อป</th>
              <th scope="col" class="px-6 py-2 font-medium">ราคาต่อปี (บาท)</th>
              <th scope="col" class="px-6 py-2 font-medium">รายละเอียด</th>
              <th scope="col" class="px-4 py-2 font-medium rounded-r-full">
                แก้ไขเมื่อ
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
                <router-link :to="{ name: 'companyPackage', params: { id: data.id } }">
                  <span class="text-origin cursor-pointer">{{ data.companies_count }} บริษัท</span>
                </router-link>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ data.user_qty_start }}
              </td>
              <td class="px-1 py-1">{{ data.user_qty }}</td>
              <td class="px-1 py-1">{{ data.price_per_user }}</td>
              <td class="px-1 py-1">{{ data.price_per_month }}</td>
              <td class="px-1 py-1">{{ data.discount_per_year }}%</td>
              <td class="px-1 py-1">{{ data.price_per_year }}</td>
              <td class="px-1 py-1">{{ data.detail }}</td>
              <td class="px-1 py-1 flex justify-center">
                <div @click="addOrEditPackage('edit', data.id)"
                  class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 hover:bg-slate-200">
                  <img src="@/assets/images/editblack.svg" alt="" />
                </div>
                <div @click="$deleteData('package', '', data.id)"
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
          <button @click="this.$toggleAccordion(index, 'package')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`package-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{ data.name }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            id="content" :class="data.open ? 'h-auto ' : 'h-0'">
            <div>
              <h1 class="font-medium mb-2">{{ $t("name") }}</h1>
              <span class="text-gray-400 capitalize">{{ data.name }}</span>
            </div>
            <div>
              <h1 class="font-medium mb-2">{{ $t("company") }}</h1>
              <router-link :to="{ name: 'companyPackage' }"><span class="text-origin capitalize">{{ data.companies_count
              }} บริษัท</span></router-link>
            </div>
            <div>
              <h1 class="font-medium">จำนวน User เริ่มต้น</h1>
              <span class="text-gray-400 capitalize">{{
                data.user_qty_start
              }}</span>
            </div>
            <div>
              <h1 class="font-medium">จำนวน User</h1>
              <span class="text-gray-400 capitalize">{{ data.user_qty }}</span>
            </div>
            <div>
              <h1 class="font-medium">ราคาต่อ User (บาท)</h1>
              <span class="text-gray-400 capitalize">{{
                data.price_per_user
              }}</span>
            </div>
            <div>
              <h1 class="font-medium">ราคาต่อเดือน (บาท)</h1>
              <span class="text-gray-400 capitalize">{{
                data.price_per_month
              }}</span>
            </div>
            <div>
              <h1 class="font-medium">ส่วนลดต่อปี</h1>
              <span class="text-gray-400 capitalize">{{
                data.discount_per_year
              }}</span>
            </div>
            <div>
              <h1 class="font-medium">ราคาต่อปี (บาท)</h1>
              <span class="text-gray-400 capitalize">{{
                data.price_per_year
              }}</span>
            </div>
            <div>
              <h1 class="font-medium">รายละเอียด</h1>
              <span class="text-gray-400 capitalize">{{ data.detail }}</span>
            </div>
            <div>
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-3 mt-2">
                <button @click="addOrEditPackage('edit', data.id)"
                  class="bg-sky-100 p-3 rounded-full hover:bg-sky-200 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/edit.svg" alt="" />
                </button>
                <button @click="$deleteData('package', '', data.id)"
                  class="bg-red-500 p-3 rounded-full hover:bg-red-600 duration-200">
                  <img class="w-6 h-6" src="@/assets/images/binWhite.svg" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getPaginateNo('devices')" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import BaseModal from "@/components/CustomModal/BaseModal.vue";

var data = {
  name: "",
  user_qty_start: "",
  user_qty: "",
  price_per_user: "",
  price_per_month: "",
  price_per_year: "",
  discount_per_year: "",
  detail: "",
};

export default {
  name: "employeeview",
  components: { BaseModal },
  data() {
    return {
      popUp: false,
      loading: true,
      color: "#36A1EA",
      size: "20px",
      page: null,
      last_page: null,
      tableData: [],
      form: { ...data },
      errors: { ...data },
      editMode: false,
      packageDetail: false,
      windowWidth: window.innerWidth,
      filter: {
        listNum: "",
        search: "",
      },
    };
  },

  methods: {
    addOrEditPackage(state, id) {
      if (state == "add") {
        this.editMode = false;
        this.packageDetail = true;
      } else if (state == "edit") {
        this.editMode = true;
        this.loading = true;
        this.axios
          .get("package/edit/" + id)
          .then((res) => {
            this.form = res.data.data;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.loading = false;
            this.packageDetail = true;
          });
      }
    },

    createOrUpdate(id) {
      if (id) {
        this.form.price_per_month = this.pricePerMonth;
        this.form.price_per_year = this.pricePerYear;
        this.axios
          .post("package/update/" + id, this.form)
          .then((res) => {
            if (res.data.success === true) {
              this.$swal({
                icon: "success",
                text: "แก้ไขสำเร็จ!",
                html: "<span class='text-sm'>ทำการแก้ไขแพ็กเกจเรียบร้อยแล้ว</span>",
                confirmButtonText: "ตกลง",
              }).finally(() => {
                this.packageDetail = false;
                this.$getPaginateNo("packages");
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.form.price_per_month = this.pricePerMonth;
        this.form.price_per_year = this.pricePerYear;
        this.axios
          .post("package/create", this.form)
          .then((res) => {
            console.log(res);
            if (res.data.success) {
              this.$swal({
                icon: "success",
                text: "เพิ่มสำเร็จ!",
                html: "<span class='text-sm'>ทำการเพิ่มแพ็กเกจเรียบร้อยแล้ว</span>",
                confirmButtonText: "ตกลง",
              }).finally(() => {
                this.packageDetail = false;
                this.$getPaginateNo("packages");
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

    closeModal() {
      this.packageDetail = false;
      this.form = { ...data };
      this.errors = { ...data };
      this.$errorBorder(this.errors);
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
    pricePerMonth() {
      return this.form.user_qty * this.form.price_per_user;
    },
    pricePerYear() {
      return (
        this.pricePerMonth * 12 -
        (this.form.discount_per_year / 100) * (this.pricePerMonth * 12)
      );
    },
  },

  mounted() {
    this.loading = false;
    this.$paginateData.current_page = 1;
    this.$getPaginateNo("packages", this.filter, true);
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
