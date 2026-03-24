<template>
  <div class="block md:flex relative">
    <SideBar />
    <div class="main-content-wrapper"
      :style="{ 'margin-left': sidebarWidth, transition: 'all 0.3s ease', 'width': mainContentWidth }">
      <div id="mainContent" class="">
        <TopBar />
        <router-view />
      </div>
    </div>
    <Teleport to="body">
      <div id="loader" class="w-full min-h-screen bg-black/40 fixed z-[9999] top-0" style="display: none">
        <pulse-loader class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" :color="color"></pulse-loader>
      </div>
    </Teleport>
  </div>
</template>

<script>
import SideBar from "@/components/SideBar.vue";
import { sidebarWidth } from "@/components/js/state";
import TopBar from "@/components/TopBar.vue";
import $ from 'jquery'

export default {
  name: "Main Content",
  components: { SideBar, TopBar },
  data() {
    return {
      sidebarWidth,
      color: '#36A1EA',
    };
  },
  computed: {
    mainContentWidth() {
      return `calc(100% - ${this.sidebarWidth})`
    }
  },

  mounted() {
    // console.log(this.sidebarWidth);
    // $('#loader').show()
    // this.fetchUserInfo().then((res) => {
    //   this.$store.commit("set_usr_role", res.data.user.role)
    //   let role = this.$store.state.authentication.usr_role
    //   console.log(role);
    //   if (role == 0) {
    //     this.$router.push({ path: `/${localStorage.getItem("appLanguage")}/company-list` })
    //   } else if (role == 1) {
    //     this.$router.push({ name: 'dashboard' })
    //   } else if (role == 2) {
    //     this.$router.push({ path: `/${localStorage.getItem("appLanguage")}/employee-dashboard` })
    //   }
    // })
  }
};
</script>

<style>
body {
  background: #e7f0fc;
}

#mainContent {
  box-sizing: border-box;
  max-width: 1620px;
  margin-left: auto;
  margin-right: auto;
}

.main-content-wrapper {
  padding: 0 16px;
}

@media only screen and (max-width: 767px) {
  #mainContent {
    margin-left: 0 !important;
  }

  .main-content-wrapper {
    margin-left: 0 !important;
    width: 100% !important;
    padding: 0px 10px;
  }
}
</style>
