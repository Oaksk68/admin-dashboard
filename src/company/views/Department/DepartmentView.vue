<template>
  <div class="">
    <ul class="flex justify-start items-center ml-2 mt-8">
      <li class="cursor-pointer py-2">
        <a class="tab px-10 py-3 font-medium" v-on:click="toggleTabs(1)" v-bind:class="{
          'text-mute bg-lightgray': openTab !== 1,
          'text-origin bg-white': openTab === 1,
        }">
          {{ $t('department') }}
        </a>
      </li>
      <li class="cursor-pointer">
        <a class="tab px-10 py-3 font-medium" v-on:click="toggleTabs(2)" v-bind:class="{
          'text-mute bg-lightgray': openTab !== 2,
          'text-origin bg-white': openTab === 2,
        }">
          {{ $t('position') }}
        </a>
      </li>
    </ul>
    <div class="px-2 flex-auto">
      <div class="tab-content tab-space">
        <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
          <DepartmentInfo @changeTab="toggleTabs" />
        </div>
        <div v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }">
          <Position :passDepartId="department_id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DepartmentInfo from "./DepartmentInfo.vue";
import Position from "./PositionView.vue";

export default {
  components: { DepartmentInfo, Position },
  data() {
    return {
      openTab: 1,
      department_id: "",
    };
  },
  methods: {
    toggleTabs(tabNumber, id) {
      this.department_id = id;
      this.openTab = tabNumber;
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
}
</style>
