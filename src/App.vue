<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex';

export default {

  methods: {
    ...mapActions(['fetchUserInfo']),
  },

  // created() {
  //   if (this.$cookies.get("token")) {
  //     this.fetchUserInfo().then((res) => {
  //       this.$store.commit("SET_USER_ROLE", res.data.user.role)
  //       this.$store.commit('setAuthentication', true)
  //       console.log(this.$store.state.userInfo.role);
  //       // const app_lang = localStorage.getItem("appLanguage")
  //       // const path = sessionStorage.getItem("path")
  //       // const storedParams = sessionStorage.getItem('params')
  //       // let role = res.data.user.role
  //       // console.log(storedParams);
  //       // // console.log(role);
  //       // if (role === 0) {
  //       //   this.$router.push({ name: path, params: JSON.parse(storedParams) })
  //       // } else if (role === 1) {
  //       //   this.$router.push({ name: path, params: JSON.parse(storedParams) })
  //       // } else if (role === 2) {
  //       //   this.$router.push({ name: path, params: JSON.parse(storedParams) })
  //       // }
  //     })
  //   } else {
  //     this.$router.push({ name: 'Home', params: { lang: `${this.$store.state.authentication.appLanguage}` } })
  //   }
  // },

  async mounted() {
    var self = this;
    this.axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        if (error.response) {
          console.log(error.response);
          if (error.response.status == 401) {
            console.error("error 401, Unauthenticated")
            self.$router.push({ name: "Login", params: { lang: 'th' } });
            self.$store.commit("setAuthentication", false);
          }
          if (error.response.status == 422) {
            console.error("Error 422");
            self.$swal({
              icon: "error",
              title: "Error",
              text: error.response.data.message,
            });
          }
        }
      }
    );
  },
};
</script>

<style>
.box {
  box-shadow: 4px 4px 15px 0px rgba(0, 0, 0, 0.25),
    0px 0px 10px 0px rgba(0, 65, 109, 0.2) inset;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

* {
  font-family: "Prompt", sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: white;
}

main {
  flex: 1 1 0;
  position: relative;
  width: 100%;
}

@media screen and (max-width: 768px) {
  #sideBar {
    margin-left: 0 !important;
  }
}

@media screen and (max-width: 1024px) {
  .holiday {
    height: 55px;
    width: 55px;
  }
}
</style>
