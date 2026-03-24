<template>
  <main class="md:px-4">
    <BaseModal :isOpen="chooseCompanyPopup" @closeModal="closeModal" :classList="'w-full md:w-[50vw]'">
      <template #title>
        <h1 class="text-primary">เลือกบริษัท</h1>
      </template>
      <template #container>
        <div class="grid gap-3 mb-10 px-10">
          <div class="grid gap-3 md:gap-0 md:flex justify-between">
            <select class="rounded-xl md:w-1/3" name="" id="" required>
              <option value="" hidden selected>แสดง 10 แถว</option>
              <option value="1">แสดง 10 แถว</option>
              <option value="2">แสดง 20 แถว</option>
              <option value="3">แสดง 30 แถว</option>
              <option value="4">แสดง 40 แถว</option>
            </select>
            <div class="relative">
              <input class="rounded-xl placeholder-muted" type="text" placeholder="ค้นหา" />
              <font-awesome-icon icon="fa-solid fa-search" class="absolute right-3 top-3 text-muted" />
            </div>
          </div>
          <div class="overflow-x-auto w-auto">
            <table class="w-full text-sm text-left text-primary">
              <thead class="text-md text-primary bg-calendarBg text-center">
                <tr>
                  <th scope="col" class="px-2 md:px-6 py-2 font-medium rounded-l-full">
                    {{ $t("no.") }}
                  </th>
                  <th scope="col" class="px-2 md:px-10 py-2 font-medium">
                    {{ $t("companyName") }}
                  </th>
                  <th scope="col" class="px-2 md:px-6 py-2 font-medium rounded-r-full">
                    <input type="checkbox" class="rounded-[4px]" />
                    เลือกทั้งหมด
                  </th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr class="bg-white align-middle">
                  <th scope="row" class="px-1 py-2 font-medium text-primary whitespace-nowrap">
                    1
                  </th>
                  <td class="px-1 py-2 whitespace-nowrap cursor-pointer">
                    Gentech
                  </td>
                  <td class="px-1 py-1 whitespace-nowrap cursor-pointer">
                    <input type="checkbox" class="rounded-[4px]" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-center items-center gap-2 text-xs text-h1mute mt-5 pr-4 md:pr-0">
            <v-pagination v-model="$paginateData.current_page" :pages="$paginateData.last_page" :range-size="1"
              active-color="" @update:modelValue="$getPaginateNo('devices')" hideFirstButton hideLastButton />
          </div>
        </div>
      </template>
      <template #buttons>
        <div class="flex flex-wrap justify-center gap-3 items-center">
          <button @click="closeModal"
            class="w-1/3 py-2 rounded-xl border border-red-400 text-red-400 duration-300 hover:bg-red-400 hover:text-white">
            ยกเลิก
          </button>
          <button
            class="w-1/3 py-2 rounded-xl border border-origin text-white bg-origin duration-300 hover:bg-white hover:text-origin">
            ยกเลิกบันทึก
          </button>
        </div>
      </template>
    </BaseModal>

    <div class="py-3 ml-2">
      <h1 class="">
        <Router-Link :to="{ name: 'CompanyGroup' }" class="text-muted cursor-pointer">{{ $t("companyGroup") }} >
          สร้างกลุ่มบริษัท
        </Router-Link>
      </h1>
    </div>
    <div class="flex justify-between items-center">
      <h1 class="tab bg-white px-10 py-3 inline-block text-origin font-medium">
        กลุ่มบริษัท
      </h1>
      <div class="hidden md:block">
        <router-link :to="{ name: 'CompanyGroup' }">
          <button
            class="shadow h-10 w-40 mr-3 bg-white transition-all duration-300 border border-origin text-origin font-normal rounded-xl hover:bg-origin hover:text-white"
            type="button">
            {{ $t('go_back') }}
          </button>
        </router-link>
      </div>
    </div>

    <div class="relative bg-white overflow-scroll rounded-tr-3xl rounded-b-3xl md:p-10 pb-5">
      <div class="flex gap-4 p-4">
        <div class="inline-block h-8 w-1 bg-origin rounded-2xl"></div>
        <h1 class="text-primary text-[26px] text-3xl">สร้างกลุ่มบริษัท</h1>
      </div>
      <div class="w-full md:flex mt-5 gap-5">
        <div class="w-1/3">
          <ImageCropper class="my-5" :imgLink="apiData.logo" :img_type="'company'" @image-cropped="handleCroppedImage" />
        </div>
        <div class="w-2/3">
          <form action="" @submit.prevent="submit($route.params.id)" class="grid gap-3 text-primary w-full px-10 md:px-0">
            <div class="grid gap-4 md:flex md:gap-20 items-center w-full">
              <label class="md:w-40" for="companyGpName"> {{ $t('company_group_name') }} <span
                  class="text-red-500">*</span></label>
              <input class="lg:w-80 w-auto rounded-lg" type="text" v-model="apiData.company_name" required />
            </div>
            <div class="grid gap-4 md:md:flex md:gap-20 items-baseline w-full">
              <label class="md:w-40" for="companyGpName">{{ $t("Code") }}<span class="text-red-500">*</span></label>
              <div class="grid gap-2">
                <input class="lg:w-80 w-auto rounded-lg" type="text" v-model="apiData.company_code" required />
                <span class="text-muted text-sm">เพิ่มได้สูงสุด 10 ตัวอักษร</span>
              </div>
            </div>
            <div class="grid gap-4 md:flex md:gap-20 items-center w-full">
              <label class="md:w-40" for="companyGpName">Line group token</label>
              <input class="lg:w-80 w-auto rounded-lg" type="text" v-model="apiData.line_group" />
            </div>
            <div class="grid gap-4 md:flex md:gap-20 items-center w-full">
              <label class="md:w-40" for="companyGpName">คำอธิบาย</label>
              <input class="lg:w-80 w-auto rounded-lg" type="text" />
            </div>
            <div class="grid gap-4 md:flex md:gap-20 items-center w-full">
              <label class="md:w-40" for="companyGpName">{{
                $t("company")
              }}</label>
              <div class="flex items-center gap-2">
                Gentech
                <div @click="showCompanyChooser"
                  class="bg-origin p-2 px-4 text-white rounded-lg cursor-pointer duration-300 hover:bg-sky-400">
                  เลือกบริษัท
                </div>
              </div>
            </div>
            <div class="grid gap-4 md:flex md:gap-20 items-start w-full">
              <label class="md:w-40" for="companyGpName">
                {{ $t("manager") }}
              </label>
              <div class="grid gap-3">
                <select class="rounded-lg lg:w-80 w-auto" name="manager" id="manager">
                  <option value="" disabled hidden>เลือกผู้จัดการ</option>
                </select>
                <div class="w-full flex flex-col md:flex-row gap-3 justify-center mt-10 md:mt-0">
                  <router-link class="block w-full" :to="{ name: 'CompanyGroup' }"><button
                      class="w-full md:w-1/2 border-2 border-danger text-danger font-normal py-2 rounded-xl hover:bg-danger hover:text-white transition-all duration-500"
                      type="button">
                      {{ $t("cancel") }}
                    </button></router-link>

                  <button
                    class="shadow md:w-1/2 border-2 border-origin bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
                    type="submit">
                    {{ $t("save") }}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
// import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";
import BaseModal from "@/components/CustomModal/BaseModal.vue";
import ImageCropper from "@/components/ImageCropper.vue";
import { mapActions } from "vuex";
import $ from 'jquery';
import { debounce } from 'lodash'

export default {
  components: { BaseModal, ImageCropper },
  data() {
    return {
      img: "",
      form: {},
      chooseCompanyPopup: false,
      apiData: {}
    };
  },
  methods: {
    ...mapActions(['fetchCompanyList']),
    showCompanyChooser() {
      this.chooseCompanyPopup = true;
    },

    closeModal() {
      this.chooseCompanyPopup = false;
    },

    submit: debounce(function (id) {
      console.log(id);
    }, 500),

    handleCroppedImage(img) {
      this.form.logo = img
    }
  },
  mounted() {
    this.fetchCompanyList();
    $('#loader').show()
    this.axios.get('company/profile/' + this.$route.params?.id).then((res) => {
      if (res.data.success && res.data.data !== null) {
        this.apiData = res.data.data
        console.log(this.apiData);
      }
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      $('#loader').hide()

    })
  }
};
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 100%;
}
</style>
