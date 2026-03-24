<template>
  <main class="w-full bg-white h-full">
    <LoginNav />
    <div class="flex justify-center">
      <div
        class="border-none md:border-dashed md:border-2 border-sky-500 rounded-large mt-10 md:mt-20 bg-white md:py-8 md:px-32">
        <h1 class="font-normal text-center text-primary text-4xl mt-5">
          {{ $t("resetPass") }}
        </h1>
        <form class="mt-8" @submit.prevent="submit" autocomplete="off">
          <div class="mb-2 flex flex-col md:flex-row items-center justify-center">
            <label class="md:inline-block md:w-4/5 w-full text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="name">
              {{ $t("email") }}
            </label>
            <div
              class="placeholder-gray-300 w-[15.5rem] md:w-[29rem] h-11 border-2 border-gray-300 rounded-xl py-2 px-4 text-gray-500 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              id="name">
              {{ form.email }}
            </div>
          </div>
          <div v-if="errors.email" class="block w-full text-center mb-2">
            <em ref="em" class="text-sm" :class="$errorText('email')">{{ errors.email }} <br /></em>
          </div>

          <div class="md:items-center 2 flex flex-col md:flex-row items-center justify-center mb-2">
            <label class="md:inline-block w-full md:w-4/5 text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="password">
              {{ $t("newPassword") }}
            </label>
            <input :class="$errorBorder('password')"
              class="placeholder-gray-300 border-2 border-gray-300 rounded-xl py-2 px-8 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              id="password" type="password" v-model="form.password" autocomplete="off" :placeholder="$t('newPassword')" />
          </div>
          <div v-if="errors.password" class="block w-full text-center mb-2">
            <em class="text-sm" :class="$errorText('password')">{{ errors.password }} <br /></em>
          </div>
          <div class="md:items-center mb-4 flex flex-col md:flex-row items-center justify-center">
            <label class="md:inline-block w-full md:w-4/5 text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="password">
              {{ $t("confirm") + $t("newPassword") }}
            </label>
            <input :class="$errorBorder('password')"
              class="placeholder-gray-300 border-2 border-gray-300 rounded-xl py-2 px-8 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              id="confirmPassword" type="password" v-model="form.password_confirmation" autocomplete="off"
              :placeholder="$t('confirm') + $t('newPassword')" />
          </div>
          <div v-if="errors.password_confirmation" class="block w-full text-center mb-2">
            <em class="text-sm" :class="$errorText('password')">{{ errors.password_confirmation }} <br /></em>
          </div>

          <div class="mb-4 mt-12 flex justify-center md:justify-end">
            <button @click="confirm"
              class="shadow w-4/5 lg:w-80 bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
              type="submit">
              <span v-if="!isLoading"> {{ $t("confirm") }}</span>
              <span v-if="isLoading">
                <div
                  class="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import LoginNav from "@/components/LoginNav.vue";
// import debounce from "lodash/debounce";

var inputData = { email: "", password: "", password_confirmation: "" };

export default {
  name: "login",
  components: { LoginNav },
  data() {
    return {
      isLoading: false,
      errors: { ...inputData },
      form: { ...inputData },
    };
  },
  methods: {
    async confirm() {
      this.isLoading = true;
      await this.axios
        .post("/password/reset", this.form)
        .then((response) => {
          this.$validateMsg(response.data.message);
          if (response.data.success) {
            this.$swal({
              icon: "success",
              title: "Success",
              text: response.data.message,
            });
          }
        })
        .catch((error) => {
          console.log(error.response);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.form.email = urlParams.get("email");
    this.form.token = urlParams.get("token");
  },
};
</script>

<style scoped>
* {
  font-family: "Mitr";
}
</style>
