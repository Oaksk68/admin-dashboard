<template>
  <div class="relative">
    <ul class="flex justify-start items-center md:ml-4 mt-8">
      <li v-if="!state" class="cursor-pointer py-2">
        <a class="tab px-10 py-3 font-medium" v-on:click="toggleTabs(1)" v-bind:class="{
          'text-mute bg-lightgray': openTab !== 1,
          'text-origin bg-white': openTab === 1,
        }">
          เวลางาน
        </a>
      </li>
      <li v-if="state" class="cursor-pointer mt-8 flex">
        <a class="tab md:px-10 md:py-3 font-medium px-4 py-1.5" v-on:click="toggleTabs(1)" v-bind:class="{
          'text-mute bg-lightgray': openTab !== 1,
          'text-origin bg-white': openTab === 1,
        }">
          <span>เงื่อนไข <br class="md:hidden" />
            ลงชื่อเข้างาน</span>
        </a>
      </li>
      <li v-if="state" class="cursor-pointer mt-8 flex">
        <a class="tab md:px-10 md:py-3 font-medium px-4 py-1.5" v-on:click="toggleTabs(2)" v-bind:class="{
          'text-mute bg-lightgray': openTab !== 2,
          'text-origin bg-white': openTab === 2,
        }">
          <span>เงื่อนไข<br class="md:hidden" />
            ลงชื่อออกงาน</span>
        </a>
      </li>
    </ul>

    <div class="md:px-4 flex-auto">
      <div class="tab-content tab-space">
        <div v-if="!state" v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
          <CheckInTime v-on:condSignUp="updateParent" />
        </div>
        <div v-else>
          <div v-bind:class="{ hidden: openTab !== 1, block: openTab === 1 }">
            <ConditionSignUp :passShiftTimeId="shifttime_id" />
            <h1 class="absolute top-[-10px] md:left-8">
              <span @click="state = false" class="text-muted cursor-pointer" :to="{ path: '/company/checkin' }">เวลางาน >
                เงื่อนไขลงชื่อเข้างาน
              </span>
            </h1>
          </div>
          <div v-bind:class="{ hidden: openTab !== 2, block: openTab === 2 }">
            <ConditionSignOut :passShiftTimeId="shifttime_id" />
            <h1 class="absolute top-[-10px] md:left-8">
              <span @click="state = false" class="text-muted cursor-pointer" :to="{ path: '/company/checkin' }">เวลางาน >
                เงื่อนไขลงชื่อออกงาน
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckInTime from "./CheckInTime.vue";
import ConditionSignUp from "./ConditionSignUp.vue";
import ConditionSignOut from "./ConditionSignOut.vue";

export default {
  components: { CheckInTime, ConditionSignUp, ConditionSignOut },
  data() {
    return {
      openTab: 1,
      state: null,
      shifttime_id: "",
    };
  },
  methods: {
    toggleTabs: function (tabNumber) {
      this.openTab = tabNumber;
    },
    updateParent(newState, id) {
      this.shifttime_id = id;
      this.state = newState;
    },
  },
};
</script>

<style scoped>
li,
a.tab {
  border-radius: 17% 46% 0% 10% / 41% 100% 10% 0%;
  transition: all 0.3s ease;
}
</style>
