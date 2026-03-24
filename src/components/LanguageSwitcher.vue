<template>
  <div v-click-away="clickAway">
    <div class="relative">
      <Menu>
        <MenuButton>
          <button
            class="flex justify-around p-2 items-center md:border-2 md:p-2 h-10 lg:max-w-44 rounded-large md:hover:bg-sky-100 transition-all duration-500"
            @click="toggleVisibility" @keydown.space.exact.prevent="toggleVisibility" @keydown.esc.exact="hideDropdown"
            @keydown.shift.tab="hideDropdown" @keydown.up.exact.prevent="startArrowKeys"
            @keydown.down.exact.prevent="startArrowKeys">
            <div>
              <img v-if="imageSource == 'th'" src="@/assets/images/th.png" alt="thailand flag"
                class="w-10 h-6 rounded-md mx-2 md:mx-0" />
              <img v-else-if="imageSource == 'en'" src="@/assets/images/en.png" alt="english flag"
                class="w-10 h-6 rounded-md mx-2 md:mx-0" />
            </div>
            <!-- <img :src="`/src/assets/images/${imageSource}.png`" alt="flag" class="w-10 h-6 rounded-md" /> -->
            <!-- <span class="ml-2">ภาษาไทย</span> -->
            <span class="hidden md:inline-block md:visible ml-2 font-normal bg-transparent">{{ $t("code") }}</span>
            <font-awesome-icon icon="fa-solid fa-caret-down" class="hidden md:inline md:ml-4" />
          </button>
        </MenuButton>
        <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-out"
          leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
          <MenuItems
            class="absolute normal-case z-[9999] font-normal right-1 lg:right-0 bg-white shadow overflow-hidden w-44 rounded-3xl border mt-1 py-1 lg:z-[60]">
            <MenuItem>
            <span @click="setLocale('th')"
              class="flex items-center px-3 py-3 hover:bg-sky-200 rounded-2xl cursor-pointer">
              <img src="@/assets/images/th.png" alt="thailand flag" class="w-10 h-6 rounded-md" />
              <span class="ml-4 bg-transparent font-normal">ภาษาไทย</span>
            </span>
            </MenuItem>
            <MenuItem>
            <span @click="setLocale('en')"
              class="flex items-center px-3 py-3 hover:bg-sky-200 rounded-2xl cursor-pointer">
              <img src="@/assets/images/en.png" alt="english flag" class="w-10 h-6 rounded-md" />
              <span class="ml-4 bg-transparent font-normal">English</span>
            </span>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
  </div>
</template>

<script>
import store from "@/store/store";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";

export default {
  components: { Menu, MenuButton, MenuItems, MenuItem },
  data() {
    return {
      isVisible: false,
      focusedIndex: 0,
    };
  },
  methods: {
    clickAway() {
      this.isVisible = false;
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    hideDropdown() {
      this.isVisible = false;
      this.focusedIndex = 0;
    },
    startArrowKeys() {
      if (this.isVisible) {
        // this.$refs.account.focus()
        this.$refs.dropdown.children[0].children[0].focus();
      }
    },
    focusPrevious(isArrowKey) {
      this.focusedIndex = this.focusedIndex - 1;
      if (isArrowKey) {
        this.focusItem();
      }
    },
    focusNext(isArrowKey) {
      this.focusedIndex = this.focusedIndex + 1;
      if (isArrowKey) {
        this.focusItem();
      }
    },
    focusItem() {
      this.$refs.dropdown.children[this.focusedIndex].children[0].focus();
    },
    setLocale(locale) {
      this.$i18n.locale = locale;
      store.commit("setAppLanguage", locale);
      sessionStorage.setItem("locale", locale);
      this.$router.push({
        params: { lang: locale },
      });
      this.hideDropdown();
      // this.$forceUpdate();
    },
  },

  computed: {
    imageSource() {
      return (`${this.$i18n.locale}`)
    }
  }

};
</script>

<style scoped>
* {
  font-family: "Mitr", sans-serif;
}
</style>
