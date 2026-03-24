<template>
  <h1 class="text-center text-3xl py-5 text-primary">แก้ไขโปรไฟล์ผู้ใช้งาน</h1>
  <div class="flex justify-center items-center min-h-80">
    <div class="text-center border-2 border-dashed border-primary rounded-xl bg-calendarBg">
      <img class="block m-auto px-24 pt-16 pb-24" src="@/assets/images/Vector.png" alt="" />
      <p class="pb-6">ขนาดแนะนำ 300 x 300</p>
    </div>
  </div>

  <form action="submit" class="my-7">
    <div class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center">
      <label class="inline-block w-24 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="name">
        {{ $t("prefix") }}
      </label>
      <select
        class="w-48 sm:w-80 border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
        id="name" v-model="form.title_id" required>
        <option value="" selected hidden>{{ $t("prefix") }}</option>
        <option v-for="(title, index) in userTitles" :key="index" :value="title.id">
          {{ title.title }}
        </option>
      </select>
    </div>
    <div class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center">
      <label class="inline-block w-24 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="name">
        {{ $t("fname") }}
      </label>
      <input
        class="w-48 sm:w-80 border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
        id="name" type="text" v-model="form.firstname" :placeholder="$t('fname')" />
    </div>
    <div class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center">
      <label class="inline-block w-24 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="surname">
        {{ $t("surname") }}
      </label>
      <input
        class="w-48 sm:w-80 border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
        id="surname" type="text" v-model="form.lastname" :placeholder="$t('surname')" />
    </div>
    <div class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center">
      <label class="inline-block w-24 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="userName">
        {{ $t("userName") }}
      </label>
      <input
        class="w-48 sm:w-80 border border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
        id="userName" type="text" v-model="form.username" :placeholder="$t('userName')" />
    </div>
    <div class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center">
      <label class="inline-block w-24 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="email">
        {{ $t("email") }}
      </label>
      <input
        class="w-48 sm:w-80 border border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
        id="email" type="email" :placeholder="$t('email')" v-model="form.email" />
    </div>
    <div class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center">
      <label class="inline-block w-24 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="phone">
        {{ $t("phone") }}
      </label>
      <input
        class="w-48 sm:w-80 border border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
        id="phone" type="number" :placeholder="$t('phone')" v-model="form.phone" />
    </div>
    <div class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center">
      <label class="inline-block w-24 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="birthday">
        {{ $t("birthday") }}
      </label>
      <VueDatePicker :format="$format"
        class="w-48 sm:w-80 text-muted rounded-xl focus:ring-blue-500 focus:border-blue-500" v-model="form.birthdate"
        :teleport="true" :enable-time-picker="false" />
    </div>
    <div class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center">
      <label class="inline-block w-24 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="placeName">
        {{ $t("placeName") }}
      </label>
      <input
        class="w-48 sm:w-80 border border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
        id="placeName" type="text" :placeholder="$t('placeName')" v-model="form.address" />
    </div>
    <div class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center">
      <label class="inline-block w-24 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="latitude">
        {{ $t("latitude") }}
      </label>
      <input
        class="w-48 sm:w-80 border border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
        id="latitude" type="number" :placeholder="$t('latitude')" v-model="form.lat" />
    </div>
    <div class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center">
      <label class="inline-block w-24 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="longitude">
        {{ $t("longitude") }}
      </label>
      <input
        class="w-48 sm:w-80 border border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
        id="longitude" type="number" :placeholder="$t('longitude')" v-model="form.lng" />
    </div>
    <div class="md:flex md:items-center mb-4 align-middle flex flex-row items-center justify-center">
      <label class="inline-block w-24 text-gray-700 font-normal mb-1 md:mb-0 pr-4" for="radius">
        {{ $t("radius") }}
      </label>
      <input
        class="w-48 sm:w-80 border border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
        id="radius" type="number" :placeholder="$t('radius')" v-model="form.radius" />
    </div>

    <div class="my-4 flex justify-around">
      <button @click="$emit('closeModal')"
        class="w-1/3 border border-danger text-danger font-normal py-2 rounded-xl hover:bg-danger hover:text-white transition-all duration-500"
        type="button">
        ยกเลิก
      </button>
      <button @click="updateUser"
        class="shadow w-1/3 bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
        type="button">
        แก้ไข
      </button>
    </div>
  </form>
</template>

<script>

export default {
  name: "EditProfile",
  emits: ["closeModal", "updated"],
  props: ["userInfo", "userTitles"],
  data() {
    return {
      form: {},
    };
  },

  methods: {
    updateUser() {
      this.axios
        .post("profile/user/update", this.form)
        .then((response) => {
          if (response.data.success === true) {
            this.$swal({
              icon: "success",
              text: "เพิ่มข้อมูลสำเร็จ!",
            }).then(this.$emit("updated"));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  watch: {
    userInfo(val) {
      if (val) {
        this.form = val;
      }
    },
  },

  mounted() {
    this.form = this.userInfo;
    console.log($('#loader'))
  },
};
</script>

<style scoped></style>
