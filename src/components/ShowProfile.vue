<template>
  <TransitionRoot as="template" :show="isOpen">
    <Dialog id="show__profile" class="relative z-50" @close="closeModal">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-65 transition-opacity" />
      </TransitionChild>
      <div class="fixed inset-0 w-screen overflow-y-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative p-5 transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 w-full md:w-1/2">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="">
                  <div class="mt-3 sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900 relative">
                      <h1 v-if="!editMode" class="text-center text-[30px] font-medium text-primary">
                        โปรไฟล์ผู้ใช้งาน
                      </h1>
                      <h1 v-else class="text-center text-[30px] font-medium text-primary">
                        แก้ไขโปรไฟล์ผู้ใช้งาน
                      </h1>
                      <div type="button" @click="closeModal"
                        class="absolute w-6 h-6 right-0 top-0 bg-red-400 rounded-full flex justify-center items-center cursor-pointer">
                        <font-awesome-icon icon="fa-solid fa-xmark" class="text-white" />
                      </div>
                    </DialogTitle>
                    <div class="mt-2">
                      <div class="flex justify-center items-center min-h-80 my-[50px] w-[260px] mx-auto">
                        <ImageCropper class="min-w-full min-h-[260px]" v-if="editMode" :imgLink="form.image"
                          @image-cropped="handleCroppedImage" />
                        <img v-else :src="this.$img_path + form.image"
                          class="w-[239px] h-[239px] border border-neutral-200 shadow rounded-[30px]" />
                      </div>
                      <form @submit.prevent="updateProfileInfo" class="grid md:justify-center gap-3 my-7 text-primary">
                        <div v-if="editMode" class="lg:flex md:items-center md:justify-center mb-1">
                          <label for="prefix" class="w-full md:w-24 font-normal mb-1 md:mb-0 md:mr-8">
                            {{ $t("prefix") }}
                          </label>
                          <div class="w-full md:w-80">
                            <select v-model="getUserInfo.title.id" id="prefix" class="profileSelect">
                              <option v-for="title of this.getAllTitles" :value="`${title.id}`">
                                {{ $t(`${title.title}`) }}
                              </option>
                            </select>
                          </div>
                        </div>
                        <div class="lg:flex md:items-center mb-1">
                          <label class="w-full md:w-24 font-normal mb-1 md:mb-0 md:mr-8" for="name">
                            {{ $t("fname") }}
                          </label>
                          <div v-if="editMode" class="w-full md:w-80">
                            <input class="profileInput" v-model="form.firstname" />
                          </div>
                          <div v-else class="w-full md:w-80">
                            <span class="w-full md:w-80" id="name">{{ getUserInfo?.title.title }}
                              {{ getUserInfo?.firstname }}
                              {{ getUserInfo?.lastName }}
                            </span>
                          </div>
                        </div>
                        <div v-if="editMode" class="lg:flex md:items-center mb-1">
                          <label class="w-full md:w-24 font-normal mb-1 md:mb-0 md:mr-8" for="name">
                            {{ $t("surname") }}
                          </label>
                          <div class="w-full md:w-80">
                            <input class="profileInput" v-model="form.lastname" />
                          </div>
                        </div>
                        <div class="lg:flex md:items-center mb-1">
                          <label class="w-full md:w-24 text-gray-700 font-normal mb-1 md:mb-0 md:mr-8" for="surname">
                            {{ $t("employeeName") }}
                          </label>
                          <div v-if="editMode" class="w-full md:w-80">
                            <input class="profileInput" v-model="form.username" />
                          </div>
                          <div v-else class="w-full md:w-80">
                            <span class="" id="surname">{{
                              getUserInfo?.username
                            }}</span>
                          </div>
                        </div>
                        <div class="lg:flex md:items-center mb-1">
                          <label class="w-full md:w-24 text-gray-700 font-normal mb-1 md:mb-0 md:mr-8" for="email">
                            {{ $t("email") }}
                          </label>
                          <div v-if="editMode" class="w-full md:w-80">
                            <input class="profileInput" v-model="form.email" />
                          </div>
                          <div v-else class="w-full md:w-80">
                            <span class="w-full md:w-80" id="surname">{{
                              getUserInfo?.email
                            }}</span>
                          </div>
                        </div>
                        <div class="lg:flex md:items-center mb-1">
                          <label class="w-full md:w-24 text-gray-700 font-normal mb-1 md:mb-0 md:mr-8" for="phone">
                            {{ $t("phone") }}
                          </label>
                          <div v-if="editMode" class="w-full md:w-80">
                            <input maxlength="10" class="profileInput" v-model="form.phone" />
                          </div>
                          <div v-else class="w-full md:w-80">
                            <span class="md:w-80" id="surname">{{
                              getUserInfo?.phone
                            }}</span>
                          </div>
                        </div>
                        <div class="lg:flex md:items-center mb-1">
                          <label class="w-full md:w-24 text-gray-700 font-normal mb-1 md:mb-0 md:mr-8" for="birthday">
                            {{ $t("birthday") }}
                          </label>
                          <div v-if="editMode" class="w-full md:w-80">
                            <VueDatePicker :format="$format"
                              class="w-full text-muted rounded-xl focus:ring-blue-500 focus:border-blue-500"
                              v-model="form.birthdate" :teleport="true" :enable-time-picker="false" />
                          </div>
                          <div v-else class="w-full md:w-80">
                            <span class="md:w-80" id="surname">{{
                              this.$moment(getUserInfo?.birthdate).format(
                                "DD/MM/YYYY"
                              )
                            }}</span>
                          </div>
                        </div>
                        <div class="lg:flex md:items-center mb-1">
                          <label class="w-full md:w-24 text-gray-700 font-normal mb-1 md:mb-0 md:mr-8" for="placeName">
                            {{ $t("placeName") }}
                          </label>
                          <div v-if="editMode" class="w-full md:w-80">
                            <input class="profileInput" v-model="form.location_name" />
                          </div>
                          <div v-else class="w-full md:w-80">
                            <span v-if="getUserInfo?.address" class="w-full md:w-80" id="surname">{{ getUserInfo?.address
                            }}</span>
                            <span v-else class="w-full md:w-80" id="surname">--</span>
                          </div>
                        </div>
                        <div class="lg:flex md:items-center mb-1">
                          <label class="w-full md:w-24 text-gray-700 font-normal mb-1 md:mb-0 md:mr-8" for="latitude">
                            {{ $t("latitude") }}
                          </label>
                          <div v-if="editMode" class="w-full md:w-80">
                            <input class="profileInput" v-model="form.lat" />
                          </div>
                          <div v-else class="w-full md:w-80">
                            <span class="w-full md:w-80" id="surname">{{
                              getUserInfo?.lat
                            }}</span>
                          </div>
                        </div>
                        <div class="lg:flex md:items-center mb-1">
                          <label class="w-full md:w-24 text-gray-700 font-normal mb-1 md:mb-0 md:mr-8" for="longitude">
                            {{ $t("longitude") }}
                          </label>
                          <div v-if="editMode" class="w-full md:w-80">
                            <input class="profileInput" v-model="form.lng" />
                          </div>
                          <div v-else class="w-full md:w-80">
                            <span class="w-full md:w-80" id="surname">{{
                              getUserInfo?.lng
                            }}</span>
                          </div>
                        </div>
                        <div class="lg:flex md:items-center mb-1">
                          <label class="w-full md:w-24 text-gray-700 font-normal mb-1 md:mb-0 md:mr-8" for="radius">
                            {{ $t("radius") }}
                          </label>
                          <div v-if="editMode" class="w-full md:w-80">
                            <input class="profileInput" v-model="form.radius" />
                          </div>
                          <div v-else class="w-full md:w-80">
                            <span class="w-full md:w-80" id="surname">{{
                              getUserInfo?.radius
                            }}</span>
                          </div>
                        </div>
                        <div class="my-4 flex justify-evenly mt-10">
                          <button
                            class="w-2/5 md:w-1/4 text-[18px] border border-danger text-danger font-semibold py-2 rounded-xl hover:bg-danger hover:text-white transition-all duration-500"
                            type="button" @click="
                            editMode ? (editMode = false) : closeModal()
                              ">
                            ยกเลิก
                          </button>
                          <button v-if="!editMode"
                            class="w-2/5 md:w-1/4 shadow text-[18px] bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-semibold py-2 rounded-xl"
                            type="button" @click="this.editMode = true">
                            แก้ไข
                          </button>
                          <button v-else
                            class="w-2/5 md:w-1/4 shadow text-[18px] bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-semibold py-2 rounded-xl"
                            type="submit">
                            บันทึก
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
import ImageCropper from "./ImageCropper.vue";
import $ from "jquery";

export default {
  name: "ShowProfile",
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    ImageCropper,
  },
  data() {
    return {
      isOpen: false,
      editMode: false,
      form: {},
    };
  },
  computed: {
    ...mapGetters(["getUserInfo", "getAllTitles"]),
  },

  methods: {
    ...mapActions(["fetchUserInfo"]),
    openModal() {
      this.form = {};
      this.isOpen = true;
      this.form = this.getUserInfo;
    },
    closeModal() {
      this.isOpen = false;
      this.editMode = false;
    },
    updateProfileInfo() {
      $("#loader").show();
      this.axios
        .post("profile/user/update", this.form)
        .then((response) => {
          if (response.data.success === true) {
            this.closeModal();
            this.$swal({
              icon: "success",
              text: "เพิ่มข้อมูลสำเร็จ!",
              confirmButtonText: "ตกลง",
            }).then(this.$emit("updated"));
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          $("#loader").hide();
        });
    },
    handleCroppedImage(croppedImageData) {
      this.form.image = croppedImageData;
    },
  },

  mounted() { },
};
</script>

<style scoped>
input.profileInput,
select.profileSelect {
  @apply border border-muted w-full p-2 rounded-lg text-[16px] font-normal;
}

label {
  @apply font-semibold text-[16px];
}

span {
  @apply text-[16px] font-normal;
}
</style>
