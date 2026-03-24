<template>
  <main class="w-full min-h-screen bg-white">
    <LoginNav />
    <div class="flex justify-center items-center mt-[90px] ">
      <div
        class="mt-8 md:mt-0 bg-white pt-4 pb-10 md:px-[80px] md:py-8 border-2 border-none border-origin md:border-dotted rounded-large md:w-[50vw]">
        <div class="px-10">
          <div class="md:flex justify-center hidden">
            <img src="@/assets/images/Union.png" alt="" />
          </div>

          <h1 class="font-normal text-center text-primary text-4xl mt-5">
            {{ $t("registerCompany") }}
          </h1>
          <p class="font-normal text-center text-muted text-sm mt-4">
            {{ $t("createAccHere") }}
          </p>
          <form class="mt-8 flex flex-col justify-center items-center gap-3" @submit.prevent="">
            <div class="w-full">
              <div class="w-full md:flex flex-col md:flex-row md:items-center md:justify-center">
                <label
                  class="block md:inline-block w-4/5 md:w-28 text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
                  for="inline-full-name">
                  {{ $t("companyName") }}
                </label>
                <input :class="$errorBorder('company_name')"
                  class="border w-full md:w-4/5 border-gray-200 rounded-xl py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="inline-full-name" type="text" v-model="form.company_name" :placeholder="$t('companyName')"
                  :disabled="loading" required />
              </div>
              <div v-if="errors.company_name" class="block w-full md:text-center mb-2">
                <em class="text-xs">{{ errors.company_name }} <br /></em>
              </div>
            </div>

            <div class="w-full">
              <div class="w-full grid md:flex flex-col md:flex-row md:items-center md:justify-center">
                <label class="md:inline-block w-4/5 md:w-28 text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
                  for="email">
                  {{ $t("email") }}
                </label>
                <input :class="$errorBorder('email')"
                  class="border md:w-4/5 border-gray-200 rounded-xl py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="email" type="email" v-model="form.email" :placeholder="$t('email')" :disabled="loading" required />
              </div>
              <div v-if="errors.email" class="block w-full text-center mb-2">
                <em class="text-sm">{{ errors.email }} <br /></em>
              </div>
            </div>

            <div class="w-full">
              <div class="w-full grid md:flex flex-col md:flex-row md:items-center md:justify-center">
                <label class="md:inline-block w-4/5 md:w-28 text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
                  for="username">
                  {{ $t("userName") }}
                </label>
                <input :class="$errorBorder('username')"
                  class="border md:w-4/5 border-gray-200 rounded-xl py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="username" v-model="form.username" type="text" :placeholder="$t('userName')" :disabled="loading"
                  autocomplete="new-username" />
              </div>
              <div v-if="errors.username" class="block w-full text-center mb-2">
                <em class="text-sm">{{ errors.username }} <br /></em>
              </div>
            </div>

            <div class="w-full">
              <div class="w-full md:flex flex-col md:flex-row items-center justify-center">
                <label class="md:inline-block w-4/5 md:w-28 text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
                  for="password">
                  {{ $t("password") }}
                </label>
                <div class="md:w-4/5 relative">
                  <input :class="$errorBorder('password')"
                    class="border w-full border-gray-200 rounded-xl py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                    id="password" v-model="form.password" :type="password.showPassword ? 'text' : 'password'"
                    :placeholder="$t('password')" :disabled="loading" required autocomplete="new-password" />
                  <svg v-if="password.showPassword" @click="password.showPassword = !password.showPassword"
                    class="absolute text-xl text-muted top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" />
                  </svg>
                  <svg v-else @click="password.showPassword = !password.showPassword"
                    class="absolute text-xl text-muted top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7" />
                  </svg>
                </div>
              </div>
              <div v-if="errors.password" class="block w-full text-center mb-2">
                <em class="text-sm">{{ errors.password }} <br /></em>
              </div>
            </div>
            <div class="w-full">
              <div class="w-full md:flex flex-col md:flex-row items-center justify-center">
                <label class="md:inline-block w-4/5 md:w-28 text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
                  for="passwordConfirm">
                  {{ $t("passwordConfirm") }}
                </label>
                <div class="md:w-4/5 relative">
                  <input :class="$errorBorder('password_confirmation')" v-model="form.password_confirmation"
                    class="w-full border border-gray-200 rounded-xl py-2 px-4 text-primary transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
                    id="password_confirm" :placeholder="$t('passwordConfirm')"
                    :type="password.showConfirmPassword ? 'text' : 'password'" :disabled="loading" required />
                  <svg v-if="password.showConfirmPassword"
                    @click="password.showConfirmPassword = !password.showConfirmPassword"
                    class="absolute text-xl text-muted top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5" />
                  </svg>
                  <svg v-else @click="password.showConfirmPassword = !password.showConfirmPassword"
                    class="absolute text-xl text-muted top-1/2 -translate-y-1/2 right-3 cursor-pointer"
                    xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="currentColor"
                      d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7" />
                  </svg>
                </div>
              </div>
              <div v-if="errors.password_confirmation" class="block w-full text-center mb-2">
                <em class="text-sm">{{ errors.password_confirmation }} <br /></em>
              </div>
            </div>

            <div class="my-4 w-full flex justify-center md:justify-end">
              <button
                class="shadow md:ml-[20%] w-full bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
                type="submit" @click="register" :disabled="loading">
                <span v-if="!loading"> {{ $t("register") }}</span>
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
              {{ $t("alreadyHaveAcc") }}
              <span class="text-danger"><router-link to="login">{{ $t("login") }}</router-link></span>
            </p>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import LoginNav from "@/components/LoginNav.vue";

let inputData = {
  company_name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};
export default {
  components: { LoginNav },
  data() {
    return {
      password: {
        showPassword: false,
        showConfirmPassword: false
      },
      errors: { ...inputData },
      form: { ...inputData },
      loading: false,
    };
  },

  methods: {
    async register() {
      this.loading = true;
      await this.axios
        .post("/company/register", this.form)
        .then((response) => {
          this.$validateMsg(response.data.message);
          if (response.data.success) {
            this.$swal({
              icon: "success",
              title: "Account registered successfully",
              text: response.data.message,
            }).then(() => {
              this.$router.push({ name: "Login" });
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },

  computed: {},

  mounted() {
    console.log(this.form);

  },
};
</script>

<style scoped>
* {
  font-family: "Mitr", sans-serif;
}
</style>
