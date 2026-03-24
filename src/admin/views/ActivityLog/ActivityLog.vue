<template>
  <main class="md:px-4 mt-6">
    <AccOwnerModal :accOwnerIsOpen="userPopup" :userProfileInfo="userProfileInfo" @showCompanyProfile="showCompanyProfile"
      @closeModal="closeModal">
    </AccOwnerModal>

    <CompanyProfileModal :companyProfileIsOpen="companyProfilePopup" :companyProfileInfo="companyProfileInfo"
      @closeModal="closeModal"></CompanyProfileModal>

    <div>
      <div class="tab inline-block md:px-10 px-6 py-3 font-medium text-xs md:text-sm bg-white text-origin">
        กิจกรรม log
      </div>
    </div>
    <div class="bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center p-4 md:p-0 md:pb-8 md:mb-5">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-2xl md:text-3xl">กิจกรรม log</h1>
        </div>
      </div>

      <div class="relative grid md:flex md:justify-between flex-wrap gap-2 items-center p-4 md:p-0 mb-7 px-14">
        <div class="grid gap-3 md:gap-2 md:flex flex-wrap">
          <select
            class="border w-full md:w-56 border-slate-300 p-2.5 text-gray-700 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" @change="$getPaginateNo('logs'), filter" v-model="filter.listNum">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
          <div class="grid md:flex">
            <div
              class="hidden md:block p-2.5 border-r-0 border border-slate-300 rounded-l-xl duration-300 hover:bg-gray-100">
              <font-awesome-icon icon="fa-solid fa-filter" />
            </div>
            <select class="rounded-xl md:rounded-none" name="company" id="company" required>
              <option value="" hidden seleected>{{ $t("company") }}</option>
              <option value="1">Gentech</option>
              <option value="2">Gentech</option>
              <option value="3">Gentech</option>
            </select>
            <div
              class="hidden md:block p-2.5 border border-slate-300 rounded-xl md:rounded-r-xl md:rounded-l-none duration-300 hover:bg-gray-100">
              <font-awesome-icon class="text-[#f56666]" icon="fa-solid fa-rotate-left"></font-awesome-icon>
            </div>
          </div>
          <button
            class="hidden border border-slate-300 rounded-xl w-11 md:flex items-center justify-center duration-300 hover:bg-gray-100">
            <img class="m-auto w-8 h-8" src="@/assets/images/excel.svg" alt="" />
          </button>
        </div>

        <div class="relative md:w-1/4">
          <input class="rounded-xl border-slate-300 w-full" type="text" placeholder="ค้นหา" v-model.trim="filter.search"
            @keyup="$getPaginateNo('logs', filter)" />
          <font-awesome-icon class="absolute top-3 right-4" icon="fa-solid fa-search" />
        </div>
        <div class="md:hidden flex justify-end">
          <div
            class="flex items-center justify-center p-3 border border-slate-300 rounded-xl md:rounded-r-xl duration-300 hover:bg-gray-100">
            <font-awesome-icon class="text-[#f56666]" icon="fa-solid fa-rotate-left"></font-awesome-icon>
          </div>
          <button
            class="border border-slate-300 rounded-xl ml-3 w-11 flex items-center justify-center duration-300 hover:bg-gray-100">
            <img class="m-auto w-8 h-8" src="@/assets/images/excel.svg" alt="" />
          </button>
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
              <th scope="col" class="px-10 py-2 font-medium">ผู้กระทำ</th>
              <th scope="col" class="px-10 py-2 font-medium">User ID</th>
              <th scope="col" class="px-6 py-2 font-medium">
                {{ $t("activityName") }}
              </th>
              <th scope="col" class="px-6 py-2 font-medium">IP Address</th>
              <th scope="col" class="px-4 py-2 font-medium">Action ID</th>
              <th scope="col" class="px-4 py-2 font-medium rounded-r-full">
                {{ $t("created") }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="(data, index) in filteredList" :key="'log' + index" class="bg-white text-primary">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </th>
              <td class="px-1 py-2 whitespace-nowrap">
                <span @click="showUserProfile(data.user_id)" class="text-origin cursor-pointer">{{ data.user_name
                }}</span>
              </td>
              <td class="px-1 py-2 whitespace-nowrap">
                <span @click="showUserProfile(data.user_id)" class="text-origin cursor-pointer">{{ data.user_id }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap capitalize">
                {{ data.action }}
              </td>
              <td class="px-1 py-1">{{ data.ip_address }}</td>
              <td class="px-1 py-1">{{ data.action_id }}</td>
              <td class="px-1 py-1 flex justify-center">
                {{ this.$moment(data.created_at).format("DD/MM/YYYY") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in filteredList" :key="'log' + index" class="border-t py-2 pl-5 pr-3" id="accordion">
          <button @click="this.$toggleAccordion(index, 'log')" class="flex items-center w-full gap-3">
            <font-awesome-icon :id="`log-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-sm text-primary">{{
              data.user_name
            }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            id="content" :class="data.open ? 'h-auto' : 'h-0'">
            <div class="">
              <h1 class="font-medium mb-2">ผู้กระทำ</h1>
              <span @click="showUserProfile(data.user_id)" class="text-origin capitalize cursor-pointer">{{
                data.user_name
              }}</span>
            </div>
            <div class="">
              <h1 class="font-medium mb-2">USER ID</h1>
              <span @click="showUserProfile(data.user_id)" class="text-origin capitalize cursor-pointer">{{
                data.user_id
              }}</span>
            </div>
            <div class="">
              <h1 class="font-medium mb-2">{{ $t('name') }}กิจกรรม</h1>
              <span class="text-gray-400 capitalize">{{ data.action }}</span>
            </div>
            <div class="">
              <h1 class="font-medium mb-2">IP Address</h1>
              <span class="text-gray-400 capitalize">{{
                data.ip_address
              }}</span>
            </div>
            <div class="">
              <h1 class="font-medium mb-2">Action ID</h1>
              <span class="text-gray-400 capitalize">{{ data.action_id }}</span>
            </div>
            <div class="">
              <h1 class="font-medium mb-2">{{ $t("created") }}</h1>
              <span class="text-gray-400 capitalize">{{
                this.$moment(data.created_at).format("DD/MM/YYYY hh:mm A")
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4 md:pr-0">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          @update:modelValue="$getPaginateNo('logs')" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
import AccOwnerModal from "@/components/AccOwnerModal.vue";
import CompanyProfileModal from "@/components/CompanyProfileModal.vue";
import $ from 'jquery';

export default {
  name: "employeeview",
  components: { AccOwnerModal, CompanyProfileModal },
  data() {
    return {
      userPopup: false,
      companyProfilePopup: false,
      loading: false,
      color: "#36A1EA",
      size: "20px",
      page: null,
      last_page: null,
      companyProfile: false,
      tableData: [],
      decat: [],
      userProfileInfo: {},
      companyProfileInfo: {},
      windowWidth: window.innerWidth,
      filter: {
        listNum: "",
        search: "",
      },
    };
  },

  methods: {
    showUserProfile(id) {
      $('#loader').show()
      this.axios
        .get("profile/user/" + id)
        .then((res) => {
          this.userProfileInfo = res.data.user;
          console.log(this.userProfileInfo);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.userPopup = true;
          $('#loader').hide()
        });
    },

    showCompanyProfile(id) {
      $('#loader').show()
      this.axios
        .get("company/profile/" + id)
        .then((res) => {
          this.companyProfileInfo = res.data.data;
          console.log(this.companyProfileInfo);

        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.userPopup = false;
          this.companyProfilePopup = true;
          $('#loader').hide()
        });
    },

    closeModal() {
      this.userPopup = false;
      this.companyProfilePopup = false;
    },
  },

  computed: {
    filteredList() {
      return this.tableData.filter((list) => {
        return list.user_name
          .toLowerCase()
          .includes(this.filter.search.toLowerCase());
      });
    },
  },

  mounted() {
    $('#loader').show()
    this.$paginateData.current_page = 1;
    this.$getPaginateNo("logs", this.filter, true).finally(() => {
      $('#loader').hide()
    })
  },
};
</script>


<style scoped>
.box {
  box-shadow: 3.30726px 3.30726px 12.40223px 0px rgba(0, 0, 0, 0.25),
    0px 0px 3.30726px 0px rgba(0, 0, 0, 0.1) inset;
}
</style>
