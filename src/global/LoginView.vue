<template>
  <main class="w-full min-h-screen bg-white">
    <LoginNav />
    <div
      class="px-10 md:p-0 md:flex md:justify-center min-h-[80vh] md:items-center"
    >
      <div
        class="flex flex-col justify-center items-center border-none md:border-dashed md:border-2 border-sky-500 rounded-large mt-10 md:mt-0 bg-white md:py-8 md:w-[47rem]"
      >
        <h1 class="font-normal text-center text-primary text-4xl mt-5">
          {{ $t("login") }}
        </h1>
        <p class="font-normal text-center text-muted text-sm mt-8">
          {{ $t("loginAndStart") }}
        </p>
        <form @submit.prevent="submit" class="mt-8 grid gap-2 w-full">
          <div class="mb-2 gap-4 block md:flex items-baseline md:mx-32">
            <label
              class="w-1/2 text-primary font-normal md:text-right"
              for="name"
            >
              {{ $t("emailUsername") }}
            </label>
            <div class="w-full">
              <input
                :class="$errorBorder('username')"
                class="w-full border border-muted rounded-xl mb-1 py-2 px-4 focus:outline-none focus:bg-white focus:border-sky-500"
                id="name"
                type="text"
                v-model="form.username"
                :placeholder="$t('emailUsername')"
                autocomplete="new-username"
              />
              <em
                class="block"
                :class="$errorText('username')"
                v-if="errors.username"
              >
                {{ errors.username }}<br
              /></em>
            </div>
          </div>
          <div class="md:items-baseline mb-2 gap-4 block md:flex md:mx-32">
            <label
              class="w-1/2 md:inline-block text-primary font-normal md:text-right mb-1 md:mb-0"
              for="password"
            >
              {{ $t("password") }}
            </label>
            <div class="w-full">
              <div class="relative w-ful">
                <input
                  :class="$errorBorder('password')"
                  class="w-full border mb-1 border-muted rounded-xl py-2 px-4 focus:outline-none focus:bg-white focus:border-sky-500"
                  id="password"
                  v-model="form.password"
                  :placeholder="$t('password')"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                />
                <svg
                  v-if="showPassword"
                  @click="showPassword = !showPassword"
                  class="showPassword absolute text-xl text-muted cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
                  />
                </svg>
                <svg
                  v-else
                  @click="showPassword = !showPassword"
                  class="showPassword absolute text-xl text-muted cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M11.83 9L15 12.16V12a3 3 0 0 0-3-3zm-4.3.8l1.55 1.55c-.05.21-.08.42-.08.65a3 3 0 0 0 3 3c.22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53a5 5 0 0 1-5-5c0-.79.2-1.53.53-2.2M2 4.27l2.28 2.28l.45.45C3.08 8.3 1.78 10 1 12c1.73 4.39 6 7.5 11 7.5c1.55 0 3.03-.3 4.38-.84l.43.42L19.73 22L21 20.73L3.27 3M12 7a5 5 0 0 1 5 5c0 .64-.13 1.26-.36 1.82l2.93 2.93c1.5-1.25 2.7-2.89 3.43-4.75c-1.73-4.39-6-7.5-11-7.5c-1.4 0-2.74.25-4 .7l2.17 2.15C10.74 7.13 11.35 7 12 7"
                  />
                </svg>
              </div>

              <em
                class="block"
                :class="$errorText('password')"
                v-if="errors.password"
                >{{ errors.password }} <br
              /></em>
            </div>
          </div>
          <div class="mb-4 mt-12 flex justify-center md:justify-end md:mr-32">
            <button
              class="shadow w-full md:w-80 bg-origin hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
              type="submit"
              :disabled="loading"
            >
              <span v-if="!loading"> {{ $t("login") }}</span>
              <span v-if="loading">
                <div
                  class="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                >
                  <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span
                  >
                </div>
              </span>
            </button>
          </div>
          <p class="clear-both text-center pt-5">
            {{ $t("noAccYet") }}
            <span class="text-danger"
              ><router-link :to="{ name: 'Choose' }">{{
                $t("register")
              }}</router-link></span
            >
          </p>
          <p class="text-danger text-center pt-2">
            <router-link :to="{ name: 'Forgot' }">{{
              $t("forgotPassword")
            }}</router-link>
          </p>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import LoginNav from "@/components/LoginNav.vue";
import { mapGetters, mapActions } from "vuex";
import { debounce } from "lodash";

var inputData = { username: "", password: "" };

export default {
  name: "login",
  components: { LoginNav },
  data() {
    return {
      errors: { ...inputData },
      form: { ...inputData },
      showPassword: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions(["fetchUserInfo"]),

    // submit: debounce(async function () {
    //   this.errors = { ...inputData }
    //   this.loading = true;
    //   await this.axios
    //     .post("/login", this.form)
    //     .then((response) => {
    //       if (response.data.success === true) {
    //         this.$cookies.set("token", response.data.data, "24h");
    //         localStorage.setItem("appLanguage", this.$store.state.authentication.appLanguage)
    //         this.axios.defaults.headers.authorization =
    //           "Bearer " + this.$cookies.get("token");
    //         this.fetchUserInfo().then(async (res) => {
    //           sessionStorage.setItem("user-role", res.data.user.role);
    //           await this.$store.commit("SET_USER_ROLE", res.data.user.role)
    //           let role = this.$store.state.userInfo.role
    //           const app_lang = localStorage.getItem("appLanguage") ? localStorage.getItem("appLanguage") : 'th';
    //           this.$store.commit('setAuthentication', true)
    //           console.log(role);
    //           if (role === 0) {
    //             this.$router.push({ path: `/${app_lang}/company-list` })
    //           } else if (role === 1) {
    //             this.$router.push({ path: `/${app_lang}/dashboard` })
    //           } else if (role === 2) {
    //             this.$router.push({ path: `/${app_lang}/employee-dashboard` })
    //           }
    //           this.loading = false;
    //         })
    //       } else if (response.data.success === false) {
    //         if (this.$errorMsg(response.data.message)) {
    //           this.$swal({
    //             icon: "error",
    //             title: "Error",
    //             text: response.data.message,
    //           });
    //         }
    //         this.loading = false;
    //         this.$validateMsg(response.data.message);
    //       }
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // }, 200),

    submit: () => {
      this.$router.push({ path: `/${app_lang}/dashboard` });
    },
  },
  computed: {
    ...mapGetters(["UserRole"]),
  },
};
</script>

<style scoped>
* {
  font-family: "Mitr";
}

svg.showPassword {
  right: 1rem;
  top: 47%;
  transform: translateY(-50%);
}
</style>
