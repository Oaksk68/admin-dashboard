<template>
  <div>
    <div class="relative flex items-center justify-between mx-5 md:justify-around py-3">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/images/Onela_Logo.svg" alt="" width="150" height="150" />
      </router-link>
      <LanguageSwitcher />
    </div>
  </div>
</template>

<script>
import LanguageSwitcher from "./LanguageSwitcher.vue";

export default {
  components: { LanguageSwitcher },
  name: "loginNav",
};
</script>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.dropdown-fade-enter,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
