<template>
  <main class="bg-calendarBg">
    <!-- <teleport to="body">
      <Modal v-if="loading">
        <template v-slot:container>
          <div class="">
            <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
          </div>
        </template>
      </Modal>
    </teleport> -->
    <div class="">
      <div class="bg-white shadow-lg mb-5 rounded-b-3xl rounded-tr-3xl">
        <div class="flex justify-end pt-8 pr-8">
          <div @click="editInfo = true" v-if="!editInfo"
            class="p-2 rounded-full border-2 mr-2 bg-chooser cursor-pointer ease-in-out duration-200 hover:bg-slate-200">
            <img src="@/assets/images/edit.svg" alt="edit" />
          </div>
        </div>

        <div class="md:flex flex-wrap justify-normal gap-2 items-start px-10 md:px-16 pt-2 pb-10">
          <div class="mb-10 w-[260px]">
            <ImageCropper v-if="editInfo" @image-cropped="handleCroppedImage" />
            <div v-else>
              <img :src="`https://onela.yoursrecord.com/backend/img/company/${form.logo}`"
                class="max-w-[150px] md:max-w-[300px] md:w-[289px] mx-auto md:h-[289px] border border-neutral-100 rounded-[30px]"
                alt="logo of the company">
            </div>
          </div>
          <div class="md:px-10">
            <form action="submit" class="">
              <div class="md:flex md:items-center mb-4 align-middle block">
                <label class="lg:inline-block block lg:w-64 text-gray-700 mb-1 md:mb-0 pr-4 font-medium w-[165px]"
                  for="companyName">
                  {{ $t("companyName") }}
                </label>
                <input v-if="editInfo"
                  class="capitalize smallLaptop:min-w-[400px] w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="companyName" type="text" v-model="form.company_name" :placeholder="$t('companyName')" />
                <div v-else id="companyName" class="w-48 text-h1mute py-1 capitalize">
                  <span v-if="form.company_name">{{ form.company_name }}</span>
                  <span v-else>--</span>
                </div>
              </div>
              <div class="md:flex md:items-center mb-4 align-middle block flex-row">
                <label class="lg:inline-block block lg:w-64 text-gray-700 font-medium w-[165px] mb-1 md:mb-0 pr-4"
                  for="idNumber">
                  {{ $t("payersIdNumber") }}
                </label>
                <input v-if="editInfo"
                  class="smallLaptop:min-w-[400px] w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="idNumber" type="number" v-model="form.tax_id" :placeholder="$t('payersIdNumber')" />
                <span v-else class="w-48 text-h1mute py-1 capitalize">
                  <span v-if="form.tax_id">{{ form.tax_id }}</span>
                  <span v-else>--</span>
                </span>
              </div>

              <!-- branch -->
              <div class="md:flex md:items-center mb-4 align-middle block flex-row">
                <label class="lg:inline-block block lg:w-64 text-gray-700 font-medium w-[165px] mb-1 md:mb-0 pr-4"
                  for="branch">
                  {{ $t("branch") }}
                </label>
                <input v-if="editInfo"
                  class="smallLaptop:min-w-[400px] w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="branch" type="text" v-model="form.branch" :placeholder="$t('branch')" />
                <div v-else class="w-48 text-h1mute py-1">
                  <span v-if="form.branch">{{ form.branch }}</span>
                  <span v-else>--</span>
                </div>
              </div>
              <div class="md:flex md:items-center mb-4 align-middle block flex-row">
                <label class="lg:inline-block block lg:w-64 text-gray-700 font-medium w-[165px] mb-1 md:mb-0 pr-4"
                  for="location">
                  {{ $t("location") }}
                </label>
                <input v-if="editInfo"
                  class="smallLaptop:min-w-[400px] w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="location" type="text" v-model="form.address" :placeholder="$t('location')" />
                <div v-else class="w-48 text-h1mute py-1">
                  <span v-if="form.address">{{ form.address }}</span>
                  <span v-else>--</span>
                </div>
              </div>
              <div class="md:flex md:items-center mb-4 align-middle block flex-row">
                <label class="lg:inline-block block lg:w-64 text-gray-700 font-medium w-[165px] mb-1 md:mb-0 pr-4"
                  for="email">
                  {{ $t("email") }}
                </label>
                <input v-if="editInfo"
                  class="smallLaptop:min-w-[400px] w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="email" type="email" v-model="form.user.email" :placeholder="$t('email')" />
                <span v-else class="w-48 text-h1mute py-1">{{
                  form.user?.email
                }}</span>
              </div>
              <div class="md:flex md:items-center mb-4 align-middle block flex-row">
                <label class="lg:inline-block block lg:w-64 text-gray-700 font-medium w-[165px] mb-1 md:mb-0 pr-4"
                  for="phone">
                  {{ $t("phone") }}
                </label>
                <input v-if="editInfo"
                  class="smallLaptop:min-w-[400px] w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="phone" type="number" :placeholder="$t('phone')" />
                <span v-else class="w-48 text-h1mute py-1"><span v-if="form.phone">{{ form.phone }}</span>
                  <span v-else>--</span></span>
              </div>

              <div class="md:flex md:items-center mb-4 align-middle block flex-row">
                <label class="lg:inline-block block lg:w-64 text-gray-700 font-medium w-[165px] mb-1 md:mb-0 pr-4"
                  for="website">
                  {{ $t("website") }}
                </label>
                <input v-if="editInfo"
                  class="smallLaptop:min-w-[400px] w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="website" type="text" v-model="form.website" :placeholder="$t('website')" />
                <div v-else class="w-48 text-h1mute py-1">
                  <span v-if="form.website">{{ form.website }}</span>
                  <span v-else>--</span>
                </div>
              </div>
              <div class="md:flex md:items-center mb-4 align-middle block flex-row">
                <label class="lg:inline-block block lg:w-64 text-gray-700 font-medium w-[165px] mb-1 md:mb-0 pr-4"
                  for="companycode">
                  {{ $t("companycode") }}
                </label>
                <input v-if="editInfo"
                  class="smallLaptop:min-w-[400px] w-full border rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="companycode" type="text" v-model="form.company_code" :placeholder="$t('companycode')" />
                <div v-else class="w-48 text-h1mute py-1">
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
      color: "#36A1EA",
      size: "20px",
      editInfo: false,
      form: "",
    };
  },

  methods: {
    submitProfile(id) {
      $('#loader').show()
      console.log(this.form);
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
            .get("company/profile")
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
  mounted() { },
};
</script>

<style scoped>
* {
  font-family: "Prompt", sans-serif !important;
}
</style>
