<template>
  <main class="bg-calendarBg mb-4">
    <teleport to="body">
      <BaseModal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </BaseModal>
    </teleport>
    <div class="">
      <div class="bg-white shadow-lg rounded-b-3xl rounded-tr-3xl px-12 py-[46px]">
        <div class="flex justify-end">
          <div @click="editInfo = true" v-if="!editInfo"
            class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
            <img src="@/assets/images/edit.svg" alt="edit" />
          </div>
        </div>

        <div class="lg:flex flex-row justify-normal items-start gap-3">
          <div class="mb-10">
            <div class="grid justify-center w-[260px]">
              <ImageCropper v-if="editInfo" class="min-w-[260px] min-h-[260px]" :img_type="company"
                @image-cropped="handleCroppedImage">
              </ImageCropper>
              <div v-else>
                <img :src="`https://onela.yoursrecord.com/backend/img/company/${form.logo}`"
                  class="max-w-[150px] md:max-w-[300px] md:w-[289px] mx-auto md:h-[289px] border border-neutral-100 rounded-[30px]"
                  alt="logo of the company">
              </div>
            </div>
          </div>
          <div class="md:w-2/4 lg:ml-[88px] overflow-x-auto">
            <form action="submit" class="">
              <div class="lg:flex lg:items-center mb-4 align-middle block items-center justify-center">
                <label class="md:inline-block block md:w-64 text-gray-700 mb-1 md:mb-0 pr-4 font-medium"
                  for="companyName">
                  {{ $t("companyName") }}
                </label>
                <input v-if="editInfo"
                  class="capitalize md:w-48 w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="companyName" type="text" v-model="form.company_name" :placeholder="$t('companyName')" />
                <div v-else id="companyName" class="w-48 sm:w-80 text-h1mute py-1 capitalize">
                  <span v-if="form.company_name">{{ form.company_name }}</span>
                  <span v-else>--</span>
                </div>
              </div>
              <div class="lg:flex lg:items-center mb-4 align-middle block flex-row items-center justify-center">
                <label class="lg:inline-block block w-64 text-gray-700 font-medium mb-1 md:mb-0 pr-4" for="idNumber">
                  {{ $t("payersIdNumber") }}
                </label>
                <input v-if="editInfo"
                  class="lg:w-48 w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="idNumber" type="number" v-model="form.tax_id" :placeholder="$t('payersIdNumber')" />
                <span v-else class="w-48 sm:w-80 text-h1mute py-1 capitalize" for="idNumber">
                  <span v-if="form.tax_id">{{ form.tax_id }}</span>
                  <span v-else>--</span>
                </span>
              </div>

              <!-- branch -->
              <div class="lg:flex lg:items-center mb-4 align-middle block flex-row items-center justify-center">
                <label class="lg:inline-block block w-64 text-gray-700 font-medium mb-1 md:mb-0 pr-4" for="branch">
                  {{ $t("branch") }}
                </label>
                <input v-if="editInfo"
                  class="lg:w-48 w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="branch" type="text" v-model="form.branch" :placeholder="$t('branch')" />
                <div v-else class="w-48 sm:w-80 text-h1mute py-1" id="branch">
                  <span v-if="form.branch">{{ form.branch }}</span>
                  <span v-else>--</span>
                </div>
              </div>
              <div class="lg:flex lg:items-center mb-4 align-middle block flex-row items-center justify-center">
                <label class="lg:inline-block block w-64 text-gray-700 font-medium mb-1 md:mb-0 pr-4" for="location">
                  {{ $t("location") }}
                </label>
                <input v-if="editInfo"
                  class="md:w-48 w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="location" type="text" v-model="form.address" :placeholder="$t('location')" />
                <div v-else class="w-48 sm:w-80 text-h1mute py-1" id="location">
                  <span v-if="form.address">{{ form.address }}</span>
                  <span v-else>--</span>
                </div>
              </div>
              <div class="lg:flex lg:items-center mb-4 align-middle block flex-row items-center justify-center">
                <label class="lg:inline-block block w-64 text-gray-700 font-medium mb-1 md:mb-0 pr-4" for="email">
                  {{ $t("email") }}
                </label>
                <input v-if="editInfo"
                  class="md:w-48 w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="email" type="email" v-model="form.user.email" :placeholder="$t('email')" />
                <span v-else class="w-48 sm:w-80 text-h1mute py-1" id="email">{{
                  form.user?.email
                }}</span>
              </div>
              <div class="lg:flex lg:items-center mb-4 align-middle block flex-row items-center justify-center">
                <label class="lg:inline-block block w-64 text-gray-700 font-medium mb-1 md:mb-0 pr-4" for="phone">
                  {{ $t("phone") }}
                </label>
                <input v-if="editInfo"
                  class="md:w-48 w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="phone" type="number" :placeholder="$t('phone')" />
                <span v-else class="w-48 sm:w-80 text-h1mute py-1" id="phone">
                  <span v-if="form.phone">{{ form.phone }}</span>
                  <span v-else>--</span></span>
              </div>

              <div class="lg:flex lg:items-center mb-4 align-middle block flex-row items-center justify-center">
                <label class="lg:inline-block block w-64 text-gray-700 font-medium mb-1 md:mb-0 pr-4" for="website">
                  {{ $t("website") }}
                </label>
                <input v-if="editInfo"
                  class="md:w-48 w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="website" type="text" v-model="form.website" :placeholder="$t('website')" />
                <div v-else class="w-48 sm:w-80 text-h1mute py-1" id="website">
                  <span v-if="form.website">{{ form.website }}</span>
                  <span v-else>--</span>
                </div>
              </div>
              <div class="lg:flex lg:items-center mb-4 align-middle block flex-row items-center justify-center">
                <label class="lg:inline-block block w-64 text-gray-700 font-medium mb-1 md:mb-0 pr-4" for="companycode">
                  {{ $t("companycode") }}
                </label>
                <input v-if="editInfo"
                  class="md:w-48 w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="companycode" type="text" v-model="form.company_code" :placeholder="$t('companycode')" />
                <div v-else class="w-48 sm:w-80 text-h1mute py-1" id="companycode">
                  <span v-if="form.company_code">{{ form.company_code }}</span>
                  <span v-else>--</span>
                </div>
              </div>
              <div class="my-4 flex justify-between md:justify-around">
                <button v-if="editInfo" @click="editInfo = false"
                  class="w-[40%] md:w-1/3 border-2 border-danger text-danger font-normal py-2 rounded-xl hover:bg-danger hover:text-white transition-all duration-500"
                  type="button">
                  {{ $t("cancel") }}
                </button>
                <button v-if="editInfo"
                  class="shadow w-[40%] md:w-1/3 bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
                  type="button" @click="submitProfile(form.id)">
                  {{ $t("save") }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ImageCropper from '@/components/ImageCropper.vue';
import $ from 'jquery'

export default {
  name: "CompanyInfo",
  props: ["passApiData"],
  components: { ImageCropper },
  data() {
    return {
      loading: false,
      color: "#36A1EA",
      size: "20px",
      editInfo: false,
      form: {},
      tableData: {},
    };
  },

  methods: {
    submitProfile(id) {
      $('#loader').show()
      this.axios
        .post("company/profile/update/" + id, this.form)
        .then((response) => {
          if (response.data.success === true) {
            this.$swal({
              icon: "success",
              html: "<h1>แก้ไขสำเร็จ!</h1> <br/> <span class='text-sm'>ทำการแก้ไขข้อมูลเรียบร้อยแล้ว</span>",
              confirmButtonText: "ตกลง",
            }).then((this.editInfo = false));
          }
        })
        .catch((err) => {
          console.log(err);
        }).finally(() => {
          this.axios
            .get("company/profile/" + id)
            .then((response) => {
              this.form = { ...response.data.data }
            })
            .catch((err) => {
              console.log(err);
            })
          $('#loader').hide()
        })
    },
    handleCroppedImage(data) {
      this.form.logo = data
    }
  },

  watch: {
    passApiData(newVal) {
      this.form = newVal;
      this.loading = false;
    },
  },

  mounted() {
    // this.axios
    //   .get("company/profile/" + this.$route.params)
    //   .then((response) => {
    //     this.form = { ...response.data.data }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    // $('#loader').hide()
  }

};
</script>

<style scoped>
* {
  font-family: "Prompt", sans-serif !important;
}
</style>
