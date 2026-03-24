<template>
  <div class="">
    <ul class="flex justify-start items-end md:ml-4 mt-8">
      <li class="cursor-pointer">
        <div class="tab md:px-10 px-1 py-3 font-medium text-xs lg:text-sm" v-on:click="toggleTabs(1)" v-bind:class="{
          'text-mute bg-lightgray': openTab !== 1,
          'text-origin bg-white': openTab === 1,
        }">
          <a class="">
            {{ $t('company_info') }}

          </a>
        </div>
      </li>
      <li class="cursor-pointer">
        <div class="tab md:px-10 px-3 py-3 font-medium text-xs lg:text-sm" v-on:click="toggleTabs(2)" v-bind:class="{
          'text-mute bg-lightgray': openTab !== 2,
          'text-origin bg-white': openTab === 2,
        }">
          <a class="">
            {{ $t('enterpriseLevel') }}
          </a>
        </div>
      </li>
      <li class="cursor-pointer">
        <div class="tab md:px-10 px-3 py-3 font-medium text-xs md:text-sm" v-on:click="toggleTabs(3)" v-bind:class="{
          'text-mute bg-lightgray': openTab !== 3,
          'text-origin bg-white': openTab === 3,
        }">
          <a>
            {{ $t('extend_service') }}
          </a>
        </div>
      </li>
    </ul>
    <div class="md:mx-4 flex-auto">
      <div class="tab-content tab-space">
        <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
          <CompanyInfo :passApiData="apiData" />
        </div>
        <div v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }">
          <Enterprise :passApiData="apiData" />
        </div>
        <div v-bind:class="{ hidden: openTab !== 3, block: openTab === 3 }">
          <Extend :passApiData="apiData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CompanyInfo from "./CompanyInfo.vue";
import Enterprise from "./EnterpriseView.vue";
import Extend from "./ExtendService.vue";

export default {
  components: { CompanyInfo, Enterprise, Extend },
  data() {
    return {
      openTab: sessionStorage.companyTab,
      apiData: null,
    };
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber;
    },
  },
  watch: {
    openTab(tabVal) {
      sessionStorage.companyTab = tabVal;
    },
  },

  mounted() {
    this.openTab = parseInt(sessionStorage.companyTab) || 1;
    this.axios
      .get("company/profile")
      .then((response) => {
        if (response.data.success === true) {
          this.apiData = response.data.data;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
* {
  font-family: "Prompt", sans-serif;
}

a.tab {
  border-radius: 17% 46% 0% 10% / 41% 100% 10% 0%;
  transition: all 0.3s ease;
}
</style>
