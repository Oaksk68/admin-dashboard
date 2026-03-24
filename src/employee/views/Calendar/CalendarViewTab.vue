<template>
  <div class="">
    <ul class="flex justify-start items-center md:ml-4 mt-8">
      <li class="cursor-pointer py-2">
        <a class="company-nav px-10 py-3 font-medium" v-on:click="toggleTabs(1)" v-bind:class="{
          'text-mute bg-lightgray': openTab !== 1,
          'text-origin bg-white': openTab === 1,
        }">
          ปฎิทิน
        </a>
      </li>
    </ul>
    <div class="md:px-4 flex-auto">
      <div class="tab-content tab-space">
        <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
          <CalendarInfo />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CalendarInfo from "./CalendarInfo.vue";

export default {
  components: { CalendarInfo },
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
