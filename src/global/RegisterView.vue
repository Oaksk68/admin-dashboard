<template>
  <main class="w-full min-h-screen bg-white">
    <LoginNav />
    <div class="flex justify-center items-center mt-[90px]">
      <div
        class="mt-8 md:mt-0 bg-white pt-4 pb-10 md:py-8 md:border md:border-dotted border-origin rounded-large md:w-[50vw]">
        <div class="md:flex justify-center hidden">
          <img src="@/assets/images/people.png" alt="" />
        </div>

        <h1 class="font-normal text-center text-primary text-4xl mt-5">
          {{ $t("registerEmployee") }}
        </h1>
        <p class="font-normal text-center text-muted text-sm mt-4">
          {{ $t("createAccHere") }}
        </p>
        <form class="mt-8 flex flex-col justify-center items-center" @submit.prevent="register">
          <div class="mb-4 w-full md:w-[25rem] flex flex-col md:flex-row items-center">
            <label class="md:inline-block w-full md:w-28 text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="full-name">
              {{ $t("companyName") }}
            </label>
            <select id="companies"
              class="border w-full md:w-full border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              required>
              <option value="" selected disabled hidden>
                {{ $t("registerEmployee") }}
              </option>
              <option v-for="company in getRegiCompanies" :key="company.id" :value="company.id">
                {{ company.name }}
              </option>
            </select>
          </div>
          <div class="mb-4 w-full md:w-[25rem] flex flex-col md:flex-row md:items-center md:justify-center">
            <label class="md:inline-block w-full md:w-28 text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password">
              {{ $t("email") }}
            </label>
            <input
              class="border md:w-full border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              id="อีเมล" type="email" :placeholder="$t('email')" required />
          </div>
          <div class="mb-4 w-full md:w-[25rem] flex flex-col md:flex-row md:items-center md:justify-center">
            <label class="md:inline-block w-full md:w-28 text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="inline-password">
              {{ $t("fname") }}
            </label>
            <input
              class="border md:w-full border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              id="{{ $t('name') }}" type="text" :placeholder="$t('fname')" required />
          </div>
          <div class="mb-4 w-full md:w-[25rem] flex flex-col md:flex-row md:items-center md:justify-center">
            <label class="md:inline-block w-full md:w-28 text-primary font-normal md:text-right mb-1 md:mb-0 pr-4"
              for="นามสกุล">
              {{ $t("surname") }}
            </label>
            <input
              class="border md:w-full border-gray-200 rounded-xl py-2 px-4 text-gray-700 transition ease-in-out duration-500 focus:outline-none focus:bg-white focus:border-sky-500"
              id="นามสกุล" type="text" :placeholder="$t('surname')" />
          </div>
          <div class="my-4 w-full md:w-[25rem] flex justify-center md:mr-1">
            <button
              class="shadow md:ml-[22%] bg-origin w-full hover:bg-sky-700 transition-all duration-500 text-white font-normal py-2 rounded-xl"
              type="submit">
              {{ $t("register") }}
            </button>
          </div>
          <p class="clear-both text-center pt-5">
            {{ $t("alreadyHaveAcc") }}
            <span class="text-danger"><router-link to="login">{{ $t("login") }}</router-link></span>
          </p>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import LoginNav from "@/components/LoginNav.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  components: { LoginNav },
  data() {
    return {
      form: {

      }
    };
  },
  methods: {
    ...mapActions(["fetchRegiCompanies"]),
    register() {
      this.axios.post('/employee/register').then((res) => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    }
  },
  computed: {
    ...mapGetters(["getRegiCompanies"]),
  },
  mounted() {
    this.fetchRegiCompanies();
  },
};
</script>

<style scoped>
* {
  font-family: "Mitr", sans-serif;
}
</style>
