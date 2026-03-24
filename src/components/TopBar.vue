<template>
  <div v-if="!$route.meta.hideMenu" class="md:m-2 flex items-center px-2 md:px-0 mt-2">
    <ChangePasswordModal ref="chgPwdModal"></ChangePasswordModal>

    <showProfile ref="showProfileModal" @updated="updated"></showProfile>

    <button class="md:hidden" @click="isExpanded">
      <font-awesome-icon class="text-3xl px-2 md:px-4 text-origin duration-200 hover:text-blue-400 active:text-blue-300"
        icon="fa-solid fa-bars" />
    </button>
    <div
      class="text-primary shadow-lg w-full flex md:justify-between items-center bg-white md:py-0 md:px-2 py-2 pl-1 pr-0 rounded-full md:h-14">
      <div class="flex justify-between items-center w-full">
        <div class="flex justify-center items-center">
          <img class="hidden lg:block w-12 h-12 rounded-full border-2 border-origin p-0.5"
            :src="`${$img_path}${getUserInfo?.image}`" alt="user_profile_image" @click="this.open = true" />
          <Menu v-slot="{ open }" as="div" class="relative">
            <MenuButton
              class="boxShadow block lg:hidden text-white hover:bg-sky-100 duration-300 focus:ring-2 focus:outline-none  rounded-full text-sm text-center items-center">
              <img class="w-12 h-12 rounded-full border-2 border-origin p-0.5 cursor-pointer"
                :src="`${$img_path}${getUserInfo?.image}`" alt="user_profile_image" @click="this.open = true" />
            </MenuButton>
            <div v-show="open">
              <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems static
                  class="absolute left-0 top-[60px] z-10 bg-white divide-y divide-gray-100 rounded-xl shadow w-40 dark:bg-gray-700">
                  <MenuItem class="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li @click="this.$refs.chgPwdModal.openModal()"
                    class="block px-2 py-2 rounded-xl hover:bg-calendarBg hover:text-origin cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-key" class="w-1/4" />
                    <span>เปลี่ยนรหัสผ่าน</span>
                  </li>
                  </MenuItem>
                  <MenuItem class="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li @click="this.$refs.showProfileModal.openModal()"
                    class="block px-2 py-2 rounded-xl hover:bg-calendarBg hover:text-origin cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-user" class="w-1/4" />
                    <span>โปรไฟล์</span>
                  </li>
                  </MenuItem>
                  <MenuItem>
                  <li @click="logout"
                    class="block px-2 py-2 rounded-xl hover:bg-calendarBg hover:text-origin cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="pl-[0.1rem] w-1/4" />
                    <span>ออกจากระบบ</span>
                  </li>
                  </MenuItem>
                </MenuItems>
              </transition>
            </div>
          </Menu>
          <div class=" greeting font-medium block lg:flex justify-center items-center ml-1 gap-2">
            <h1 class="">สวัสดี,</h1>
            <h1 class="text-lightBlue text-nowrap">
              {{ getUserInfo.firstname }} {{ getUserInfo?.lastname }}
            </h1>
            <h1 class="whitespace-nowrap">
              วันนี้คุณจะทำอะไรก่อนดี ?
            </h1>
          </div>
        </div>

        <div class="flex md:flex-row flex-row-reverse items-center">
          <LanguageSwitcher class="md:p-2 h-full" />
          <!-- notification -->
          <Menu as="div" class="relative">
            <MenuButton
              class="boxShadow group relative text-primary md:mr-2 hover:bg-sky-100 duration-300 focus:ring-2 focus:outline-none focus:ring-blue-300 rounded-full text-sm text-center items-center">
              <h1
                class="absolute md:-right-1 md:-top-1 right-[3px] -top-[2px] text-xxs group-hover:animate-bounce leading-3 rounded-full border-2 border-white bg-red-400 text-white p-0.5">
                99
              </h1>
              <font-awesome-icon class="w-6 h-6 m-2 mx-2.5" icon="fa-solid fa-bell"></font-awesome-icon>
            </MenuButton>
            <transition enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0">
              <MenuItems
                class="absolute right-3 top-[55px] z-10 bg-white divide-y divide-gray-100 rounded-xl shadow w-40 dark:bg-gray-700">
                <MenuItem class="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li @click="chgPwdModal = true"
                  class="block px-2 py-2 rounded-xl hover:bg-calendarBg hover:text-origin cursor-pointer">
                </li>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>

          <Menu v-slot="{ open }" as="div" class="relative">
            <MenuButton
              class="boxShadow hidden md:inline text-white p-[10px] hover:bg-sky-100 duration-300 focus:ring-2 focus:outline-none focus:ring-blue-300 rounded-full text-sm text-center items-center">
              <img class="w-6 h-6" src="@/assets/images/editblack.svg" alt="" />
            </MenuButton>
            <div v-show="open">
              <transition enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out" leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
                <MenuItems static
                  class="absolute right-2 top-[55px] z-10 bg-white divide-y divide-gray-100 rounded-xl shadow w-40 dark:bg-gray-700">
                  <MenuItem class="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li @click="this.$refs.chgPwdModal.openModal()"
                    class="block px-2 py-2 rounded-xl hover:bg-calendarBg hover:text-origin cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-key" class="w-1/4" />
                    <span>เปลี่ยนรหัสผ่าน</span>
                  </li>
                  </MenuItem>
                  <MenuItem class="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li @click="this.$refs.showProfileModal.openModal()"
                    class="block px-2 py-2 rounded-xl hover:bg-calendarBg hover:text-origin cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-user" class="w-1/4" />
                    <span>โปรไฟล์</span>
                  </li>
                  </MenuItem>
                  <MenuItem>
                  <li @click="logout"
                    class="block px-2 py-2 rounded-xl hover:bg-calendarBg hover:text-origin cursor-pointer">
                    <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" class="pl-[0.1rem] w-1/4" />
                    <span>ออกจากระบบ</span>
                  </li>
                  </MenuItem>
                </MenuItems>
              </transition>
            </div>
          </Menu>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { collapsed, toggleSidebar, sidebarWidth } from "./js/state";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import showProfile from "./ShowProfile.vue";
import { mapGetters, mapActions } from "vuex";
import $ from 'jquery';
import ChangePasswordModal from "./ChangePasswordModal.vue";

export default {
  name: "TopBar",
  components: {
    LanguageSwitcher,
    showProfile,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    ChangePasswordModal
  },
  data() {
    return {
      collapsed,
      toggleSidebar,
      sidebarWidth,
      sideBar: true,
      loading: false,
      forgotPassword: false,
      chgPwdModal: false,
      showProfileModalState: false,
      open: false,
      errors: {
        email: "",
        status: "",
      },
      form: {
        email: "",
      },
      userInfo: {},
      userTitles: [],
    };
  },

  methods: {
    ...mapActions(['fetchUserInfo']),

    isExpanded() {
      this.companyMenu = false;
      this.statMenu = false;
      this.toggleSidebar();
    },

    updated() {
      this.fetchUserInfo()
    },

    logout() {
      this.axios
        .post("/logout", {})
        .then((response) => {
          if (response.data.success == true) {
            this.$cookies.set("token", "");
            this.$store.commit("setAuthentication", false);
            this.$store.commit("setUserInfo", '')
            // sessionStorage.setItem("user-role", "")
            this.$store.commit("SET_USER_ROLE", null);
            this.axios.defaults.headers.authorization = "";
            this.$router.push({ name: "Login" });
          } else if (response.data.success == false) {
            this.message = "You are unauthenticated. Please login again";
            this.showModal = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  computed: {
    ...mapGetters(['getUserInfo'])
  },

  mounted() {
  },
};
</script>

<style scoped>
* {
  font-family: "Prompt", sans-serif;
}

div#editForm::-webkit-scrollbar {
  width: 6px;
  overflow: hidden;
  position: absolute;
  right: 0;
}

div#editForm::-webkit-scrollbar-track {
  background-color: transparent;
}

div#dropdown {
  inset: 0px auto auto -10px !important;
}

.greeting h1 {
  @apply xl:text-[26px] lg:text-[18px] text-[10px] font-medium;
}
</style>
