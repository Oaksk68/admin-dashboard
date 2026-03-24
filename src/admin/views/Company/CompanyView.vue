<template>
  <div class="">
    <div class="py-2 ml-4">
      <h1 class="">
        <Router-Link :to="{ name: 'CompanyList' }" class="text-muted cursor-pointer">พนักงาน > แก้ไขข้อมูล
        </Router-Link>
      </h1>
    </div>
    <ul class="flex justify-start items-end md:ml-4 md:mt-2">
      <li class="cursor-pointer">
        <div class="tab md:px-10 px-3 py-3 text-xs md:text-sm font-medium" :class="{
          'text-mute bg-lightgray': openTab !== 1,
          'text-origin bg-white': openTab === 1,
        }" v-on:click="toggleTabs(1)">
          <a class="">
            {{ $t('company_info') }}
          </a>
        </div>
      </li>
      <li class="cursor-pointer">
        <div class="tab md:px-10 px-3 py-3 font-medium text-xs md:text-sm" v-on:click="toggleTabs(2)" v-bind:class="{
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
          <a class="">
            {{ $t('extend_service') }}
          </a>
        </div>
      </li>
    </ul>
    <div class="md:px-4 flex-auto">
      <div class="tab-content tab-space">
        <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
          <CompanyInfo :passApiData="apiData" />
        </div>
        <div v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }">
          <Enterprise :passApiData="apiData" @reload-company-profile="getCompanyProfile" />
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
import $ from 'jquery';

export default {
  components: { CompanyInfo, Enterprise, Extend },
  data() {
    return {
      openTab: 1,
      apiData: null,
      loading: true,
      color: "#36A1EA",
      size: "20px",
    };
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber;
    },
    getCompanyProfile(id) {
      $('#loader').show()
      this.loading = true;
      this.axios
        .get("company/profile/" + this.$route.params.id)
        .then((response) => {
          if (response.data.success === true) {
            this.apiData = response.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        }).finally(() => {
          $('#loader').hide()
        });
    }
  },
  // watch: {
  //   openTab(tabVal) {
  //     sessionStorage.companyTab = tabVal;
  //   },
  // },

  mounted() {
    // this.openTab = parseInt(sessionStorage.companyTab) || 1;
    this.getCompanyProfile();
  },
};
</script>

<style scoped>
* {
  font-family: "Prompt", sans-serif;
}

tab {
  border-radius: 17% 46% 0% 10% / 41% 100% 10% 0%;
  transition: all 0.3s ease;
}
</style>
