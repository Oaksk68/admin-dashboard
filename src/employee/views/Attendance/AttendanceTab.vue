<template>
  <div class="">
    <ul class="flex justify-start items-center pl-4 mt-8">
      <li class="cursor-pointer py-2">
        <a class="company-nav px-10 py-3 font-medium" v-on:click="toggleTabs(1)" v-bind:class="{
          'text-mute bg-lightgray': openTab !== 1,
          'text-origin bg-white': openTab === 1,
        }">
          ประวัติการ เข้า-ออก งาน
        </a>
      </li>
    </ul>
    <div class="">
      <div class="tab-content tab-space">
        <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
          <Attendance />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Attendance from "./Attendance.vue";

export default {
  components: { Attendance },
  data() {
    return {
      openTab: 1,
    };
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber;
    },
  },
};
</script>

<style scoped>
* {
  font-family: "Prompt", sans-serif;
}

a.company-nav {
  border-radius: 17% 46% 0% 10% / 41% 100% 10% 0%;
}
</style>
