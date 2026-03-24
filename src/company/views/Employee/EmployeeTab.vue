<template>
  <div class="relative">
    <ul v-if="!employee && !editInformation" class="flex justify-start items-center md:ml-4 mt-8">
      <li class="cursor-pointer py-2">
        <a class="tab px-10 py-3 font-medium" v-on:click="toggleTabs(1)" v-bind:class="{
          'text-mute bg-lightgray': openTab !== 1,
          'text-origin bg-white': openTab === 1,
        }">
          {{ $t('employee') }}
        </a>
      </li>
    </ul>
    <div class="md:px-4 flex-auto">
      <div v-if="!employee && !editInformation" class="tab-content tab-space">
        <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
          <EmployeeView @set-employee-data="employeeData" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeView from "./EmployeeView.vue";

export default {
  components: { EmployeeView },
  data() {
    return {
      openTab: 1,
      employee: false,
      editInformation: false,
    };
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber;
    },
    employeeData(value) {
      this.employee = value;
    },
    editEmployeeInformation(value) {
      this.editInformation = value;
      this.employee = false;
    },
    goBackHome(value) {
      if (value == true) {
        this.employee = false;
        this.editInformation = false;
      }
    },
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
