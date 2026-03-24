<template>
  <main class="px-4">
    <teleport to="body">
      <BaseModal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </BaseModal>
    </teleport>

    <CompanyProfileModal :companyProfileIsOpen="companyProfilePopup" :companyProfileInfo="companyProfileInfo"
      @closeModal="closeModal"></CompanyProfileModal>
    <div class="py-3 ml-2">
      <h1 class="">
        <Router-Link :to="{ name: 'Package' }" class="text-muted cursor-pointer">แพ็กเกจ > จำนวนบริษัทที่ใช้งาน
        </Router-Link>
      </h1>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="tab bg-white px-10 py-3 inline-block text-origin font-medium">
        แพ็กเกจ
      </h1>
      <div class="hidden md:block">
        <router-link :to="{ name: 'Package' }">
          <button
            class="shadow h-10 w-40 mr-3 bg-white transition-all duration-300 border border-origin text-origin font-normal rounded-xl hover:bg-origin hover:text-white"
            type="button">
            ย้อนกลับ
          </button>
        </router-link>
      </div>
    </div>

    <div class="relative bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex gap-4 p-4">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-2xl md:text-3xl">
          <span>{{ $t('package') }}</span>
        </h1>
      </div>
      <div class="relative grid md:flex flex-wrap md:justify-between gap-2 items-stretched p-4 md:p-0 md:my-7 px-14">
        <div class="grid md:flex flex-wrap gap-2">
          <select
            class="border w-full md:w-56 border-slate-300 p-2.5 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
            name="page" id="">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
          <div class="grid gap-3 md:gap-0 md:flex md:items-stretched">
            <button class="hidden md:block p-2.5 border border-slate-300 rounded-l-xl duration-300 hover:bg-gray-100">
              <font-awesome-icon icon="fa-solid fa-filter" />
            </button>
            <VueDatePicker :format="$format"
              input-class-name="dp-custom-input rounded-xl md:rounded-none md:w-36 md:h-[46px] hover:bg-gray-100"
              v-model="form.birthdate" :teleport="true" :enable-time-picker="false" placeholder="วันที่" />
            <select class="rounded-xl md:rounded-none border-slate-300" name="user" id="user" required>
              <option value="" selected hidden>ใช้งาน</option>
              <option value="1">IDK</option>
            </select>
            <button class="hidden md:block p-2.5 border border-slate-300 rounded-r-xl duration-300 hover:bg-gray-100">
              <font-awesome-icon icon="fa-solid fa-rotate-left" class="text-[#f56666]" />
            </button>
          </div>
          <button
            class="hidden md:flex items-center justify-center border border-slate-300 rounded-xl w-11 duration-300 hover:bg-gray-100">
            <img class="m-auto w-8 h-8" src="@/assets/images/excel.svg" alt="" />
          </button>
        </div>

        <div class="relative md:w-1/4">
          <input class="rounded-xl border-slate-300 w-full" type="text" placeholder="ค้นหา" />
          <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
        </div>

        <div class="flex justify-end gap-3 md:hidden">
          <div class="flex items-center p-3 border border-slate-300 rounded-xl duration-300 hover:bg-gray-100">
            <font-awesome-icon icon="fa-solid fa-rotate-left" class="text-[#f56666]" />
          </div>
          <div class="flex items-center p-1 border border-slate-300 rounded-xl duration-300 hover:bg-gray-100">
            <img class="w-8 h-8" src="@/assets/images/excel.svg" alt="" />
          </div>
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
                {{ $t("companyName") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                วันที่เริ่มใช้แพ็กเกจ
              </th>
              <th scope="col" class="px-6 py-2 font-medium">
                วันที่สิ้นสุดการใช้งาน
              </th>
              <th scope="col" class="px-4 py-2 font-medium rounded-r-full">
                สถานะการใช้งาน
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, index) in filteredList" :key="'CompanyPackage' + index" class="bg-white text-primary">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </th>
              <td class="px-1 py-2 whitespace-nowrap">
                <div class="text-origin flex items-center gap-2 cursor-pointer" @click="companyProfile(data.id)">
                  <img class="object-fill h-6 w-6" src="@/assets/images/Gentech_logo.png" alt="" />
                  {{ data.company_name }}
                </div>
              </td>
              <td class="px-1 py-2 whitespace-nowrap">
                {{ this.$moment(data.package_start).format("DD/MM/YYYY") }}
              </td>
              <td class="px-1 py-1">
                {{ this.$moment(data.package_end).format("DD/MM/YYYY") }}
              </td>

              <td class="px-1 py-1">
                <div v-if="data.active == 1" class="flex items-center gap-2">
                  <div class="bg-lime-400 w-4 h-4 rounded-full"></div>
                  <span class="text-origin">ใช้งาน</span>
                </div>
                <div v-else class="flex items-center gap-2">
                  <div class="bg-h1mute w-4 h-4 rounded-full"></div>
                  <span class="text-h1mute">ปิด</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- accordion -->
      <div id="accordion" class="block md:hidden border-b mb-4">
        <div class="border-t py-2 pl-5 pr-3" id="accordion" v-for="(data, index) in filteredList"
          :key="'CompanyPackage' + index">
          <button @click="this.$toggleAccordion(index, 'companyPackage')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`companyPackage-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary font-medium">{{
              $t("companyName")
            }}</span>
          </button>
          <div class="grid gap-4 mt-4 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            id="content" :class="data.open ? 'h-auto' : 'h-0'">
            <div>
              <h1 class="font-medium mb-2">{{ $t("companyName") }}</h1>
              <div class="flex items-center gap-2">
                <img class="w-7 h-7 object-cover" src="@/assets/images/Gentech_logo.png" alt="" />
                <span @click="companyProfile(data.id)" class="text-origin capitalize">Gentech</span>
              </div>
            </div>
            <div>
              <h1 class="font-medium mb-2">วันที่เริ่มใช้แพ็กเกจ</h1>
              <span class="text-gray-400">01/01/2023</span>
            </div>
            <div>
              <h1 class="font-medium">จวันที่สิ้นสุดการใช้งาน</h1>
              <span class="text-gray-400 capitalize">01/01/2023</span>
            </div>
            <div>
              <h1 class="font-medium">จำนวน User</h1>
              <div class="flex items-center gap-3">
                <div class="w-4 h-4 rounded-full bg-lime-300"></div>
                <span class="text-origin">ใช้งาน</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import CompanyProfileModal from "@/components/CompanyProfileModal.vue";

export default {
  components: {
    CompanyProfileModal,
  },
  data() {
    return {
      loading: false,
      color: "#36A1EA",
      size: "20px",
      img: "",
      form: "",
      tableData: [],
      filter: {
        search: "",
        listNum: "",
      },
      companyProfilePopup: false,
      allowEmployeeReg: false,
      companyProfileInfo: {}
    };
  },

  methods: {
    companyProfile(id) {
      this.loading = true
      this.axios.get('company/profile/' + id).then((res) => {
        this.companyProfileInfo = res.data.data;
        console.log(res);
      }).catch((err) => {
        console.log(err);
      }).finally(() => {
        this.loading = false;
        this.companyProfilePopup = true;
      })
    },

    closeModal() {
      this.companyProfilePopup = false;
    },
  },

  computed: {
    filteredList() {
      return this.tableData.filter((list) => {
        return list.company_name
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },

  mounted() {
    this.$getPagination(
      "package-inuse-company/" + this.$route.params.id,
      "companies",
      '',
      true
    );
  },
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>
<style></style>
