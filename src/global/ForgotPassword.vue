<template>
  <div class="w-full h-screen bg-white">
    <LoginNav />
    <div class="relative flex justify-center items-center min-h-[65vh]">
      <div class="mt-8 md:mt-0 bg-white px-5 pb-10 md:px-20 md:py-8 md:w-[40rem] w-full">
        <h1 class="font-normal text-center text-primary text-4xl mt-5">
          {{ $t("forgotPassword") }}
        </h1>
        <p class="font-normal text-center text-muted text-sm mt-4">
          {{ $t("sendPassResetMail") }}
        </p>
        <form @submit.prevent="submit" class="mt-8 flex flex-col md:justify-center md:items-center">
          <div class="mb-1 w-full flex flex-col md:flex-row md:items-center md:justify-center">
            <label class="md:inline-block w-auto text-primary font-normal mb-1 md:mb-0 pr-4" for="email">
              {{ $t("email") }}
            </label>
            <input id="email" type="text" ref="input" :class="`${errors.success == true ? 'border-green-500' : ''} ${errors.success == false ? 'border-red-500' : ''
              }`"
              class="border md:w-4/5 rounded-xl border-gray-300 py-3 md:py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              v-model="form.email" :placeholder="$t('email')" :disabled="loading" required />
          </div>
          <div class="block w-full text-center mb-2">
            <em :class="`${errors.success ? 'text-green-500' : 'text-red-500'}`">{{ errors.email }} <br /></em>
          </div>
          <div class="mb-4 mt-10 w-full flex md:justify-end justify-center">
            <button
              class="shadow mr-[1.45rem] w-full md:w-[24rem] bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
              type="submit" :disabled="loading">
              <span v-if="!loading"> {{ $t("confirm") }}</span>
              <span v-if="loading">
                <div
                  class="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                  <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                </div>
              </span>
            </button>
          </div>

          <p class="clear-both text-center pt-5">
            {{ $t("returnMain") }}
            <span class="text-danger"><router-link to="login">{{ $t("here") }}</router-link></span>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginNav from "@/components/LoginNav.vue";

export default {
  components: { LoginNav },
  data() {
    return {
      errors: {
        email: "",
        status: "",
      },
      form: {
        email: "",
      },
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      await this.axios
        .post("/password/forget/send-email", this.form)
        .then((response) => {
          this.status = response.status;
          if (this.$errorMsg(response.data.message)) {
            this.errors.email = response.data.message;
            this.errors.success = response.data.success;
          } else {
            this.$validateMsg(response.data.message);
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Mitr", sans-serif;
}
</style>
