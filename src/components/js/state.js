import { ref, computed } from "vue";

export let collapsed = ref(localStorage.getItem("expanded") === "true");
export const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
  localStorage.setItem("expanded", collapsed.value);
};

export let SIDEBAR_WIDTH = `275px`;
export let SIDEBAR_WIDTH_COLLAPSED = `53px`;
export const sidebarWidth = computed(
  () => `${collapsed.value ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH}`
);
