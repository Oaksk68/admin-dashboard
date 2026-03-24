<template>
  <main class="md:px-4 mt-6">
    <div class="flex justify-between items-center">
      <h1 class="tab bg-white px-10 py-3 inline-block text-origin font-medium">
        กลุ่มบริษัท
      </h1>
    </div>
    <div class="relative bg-white rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex justify-between items-center p-4 md:p-0 md:mb-5">
        <div class="flex gap-4">
          <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
          <h1 class="text-primary text-2xl md:text-3xl">รายการกลุ่มบริษัท</h1>
        </div>
        <div @click="this.$router.push({ name: 'AddCompanyGroup' })"
          class="absolute top-2 right-2 md:top-5 md:right-8 p-2 rounded-full border-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
          <img src="@/assets/images/add.svg" alt="" />
        </div>
      </div>
      <div class="relative md:flex justify-between items-center mb-7 px-14 md:p-2 overflow-auto">
        <div class="grid md:flex py-2">
          <select
            class="border border-slate-300 p-2.5 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            name="page" id="" v-model="filter.listNum" @change="$getPaginateNo('companies', this.filter)">
            <option value="" selected hidden>แสดง 10 แถว</option>
            <option value="10">แสดง 10 แถว</option>
            <option value="20">แสดง 20 แถว</option>
            <option value="30">แสดง 30 แถว</option>
            <option value="50">แสดง 50 แถว</option>
            <option value="100">แสดง 100 แถว</option>
          </select>
        </div>
        <div class="flex md:flex-row flex-col-reverse relative md:justify-end md:items-center md:mt-0">
          <div class="relative md:float-right md:ml-4">
            <input class="w-full rounded-xl border-slate-300" type="text" placeholder="ค้นหา" v-model.trim="filter.search"
              @keyup="$getPaginateNo('companies', this.filter)" />
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
                {{ $t("no.") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("companyName") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("description") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("Code") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                Line group token
              </th>
              <th scope="col" class="px-2 py-2 font-medium">
                {{ $t("groupManager") }}
              </th>
              <th scope="col" class="px-2 py-2 font-medium rounded-r-full">
                {{ $t('edit') }}/{{ $t('delete') }}
              </th>
            </tr>
          </thead>
          <tbody class="text-center text-primary">
            <tr v-for="(data, index) in tableData" :key="'company' + index">
              <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                {{ ++index }}
              </th>
              <td class="px-1 py-2">
                <div class="flex gap-2 items-center2">
                  <img class="w-6 h-6 object-fit rounded-full" :src="`${$logo_path}${data.logo}`" alt="image_of_a_logo" />
                  <span>{{ data.company_name }}</span>
                </div>
              </td>
              <td class="px-1 py-2 capitalize">บริษัทอุปกรณ์สำหรับบ้าน</td>
              <td class="px-1 py-2 capitalize">
                <span v-if="!!data.company_code">{{ data.company_code }}</span>
                <span v-else>--</span>
              </td>
              <td class="px-6 py-4 capitalize">
                <span v-if="!!data.line_group">{{ data.line_group }}</span>
                <span v-else>--</span>
              </td>
              <td class="px-1 py-2 capitalize">
                <span v-if="!!data.firstname">{{ data.title }} {{ data.firstname }}
                  {{ data.lastname }}</span>
                <span v-else>--</span>
              </td>
              <td class="px-6 py-4 text-right flex justify-center">
                <div @click="
                  this.$router.push({
                    name: 'ModifyCompany',
                    params: { id: data.id },
                  })
                  "
                  class="flex items-center border-2 shadow-lg rounded-l-large px-3 transition-all duration-200 cursor-pointer hover:bg-slate-200">
                  <img src="@/assets/images/editblack.svg" alt="" />
                </div>
                <div @click="$deleteData('company', 'companies', data.id)"
                  class="flex items-center border-2 shadow-lg rounded-r-large px-3 py-1 transition-all duration-200 cursor-pointer hover:bg-slate-200">
                  <img src="@/assets/images/bin.svg" alt="" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div id="accordion" class="block md:hidden border-b mb-4">
        <div v-for="(data, index) in tableData" :key="index" class="border-t py-2 pl-5 pr-3 text-sm" id="accordion">
          <button @click="this.$toggleAccordion(index, 'companyGroup')"
            class="flex justify-start items-center w-full gap-3">
            <font-awesome-icon :id="`companyGroup-chevron-${index}`" class="bg-origin p-2 text-white rounded-full"
              icon="fa-solid fa-chevron-up" rotation="180" />
            <span class="capitalize text-primary font-medium">{{
              data.company_name
            }}</span>
          </button>
          <div class="grid gap-3 pl-11 text-primary text-sm overflow-hidden transition ease-in-out duration-300"
            :class="data.open ? 'h-auto ' : 'h-0'" id="content">
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("companyName") }}</h1>
              <div class="flex items-center gap-3">
                <img class="w-6 h-6" src="@/assets/images/Gentech_logo.png" alt="" />
                <span class="text-gray-400 capitalize">{{
                  data.company_name
                }}</span>
              </div>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("description") }}</h1>
              <span class="text-gray-400">บริษัทอุปกรณ์สำหรับบ้าน</span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("code") }}</h1>
              <span v-if="!!data.company_code">{{ data.company_code }}</span>
              <span v-else>--</span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">Line group token</h1>
              <span v-if="!!data.line_group">{{ data.line_group }}</span>
              <span v-else>--</span>
            </div>
            <div class="grid gap-3">
              <h1 class="font-medium">{{ $t("groupManager") }}</h1>
              <span v-if="!!data.firstname">{{ data.title }} {{ data.firstname }} {{ data.lastname }}</span>
              <span v-else>--</span>
            </div>
            <div>
              <h1>แก้ไข / ลบ</h1>
              <div class="flex gap-3 mt-2 py-2">
                <button @click="EditCompanyGp(data.id)"
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
      <div class="flex justify-end items-center gap-2 text-xs text-h1mute mt-5 pr-4">
        <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
          active-color="" @update:modelValue="$getPaginateNo('companies', this.filter)" hideFirstButton hideLastButton />
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "employeeview",
  data() {
    return {
      color: "#36A1EA",
      size: "20px",
      page: null,
      pageCount: null,
      last_page: null,
      tableData: [],
      filter: {
        search: "",
        listNum: "",
      },
      deleteConfirmation: Boolean,
    };
  },
  methods: {
    EditCompanyGp(id) {
      console.log(id);
      this.$router.push({ name: "ModifyCompany", params: { id: id } });
    },
  },
  computed: {},

  mounted() {
    this.$getPaginateNo("companies", this.filter, true);
  },
};
</script>

<style scoped></style>
