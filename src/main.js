import { createApp, reactive } from "vue/dist/vue.esm-bundler.js";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import i18n from "./i18n";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import VueCookies from "vue-cookies";
import "./interceptors/axios";
import VueClickAway from "vue3-click-away";
import axios from "axios";
import VueAxios from "vue-axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import BaseModal from "@/components/CustomModal/BaseModal.vue";
import Modal from "@/components/CustomModal/Modal.vue";
import VPagination from "@hennge/vue3-pagination";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
import "@/assets/tailwind.css";
import "@/assets/css/main.css";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import VueGoogleMaps from "@fawmi/vue-google-maps";
import { globalProperties } from "./globalProperties";
import {
  faBars,
  faBuilding,
  faTableColumns,
  faUserGroup,
  faMobile,
  faListCheck,
  faHeartPulse,
  faCalendar,
  faChartSimple,
  faArrowRightFromBracket,
  faBriefcase,
  faUser,
  faBuildingLock,
  faDesktop,
  faCaretDown,
  faCaretUp,
  faSearch,
  faFilter,
  faRotateLeft,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faEyeSlash,
  faEye,
  faCircleCheck,
  faSquareCheck,
  faSquareXmark,
  faXmark,
  faX,
  faKey,
  faBell,
  faMobileScreenButton,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";

import { faMessage } from "@fortawesome/free-regular-svg-icons";

library.add(
  faUser,
  faBars,
  faBuilding,
  faTableColumns,
  faUserGroup,
  faMobile,
  faListCheck,
  faHeartPulse,
  faCalendar,
  faChartSimple,
  faArrowRightFromBracket,
  faBriefcase,
  faUser,
  faBuildingLock,
  faDesktop,
  faCaretDown,
  faCaretUp,
  faSearch,
  faFilter,
  faRotateLeft,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faEyeSlash,
  faEye,
  faCircleCheck,
  faSquareCheck,
  faSquareXmark,
  faKey,
  faBell,
  faXmark,
  faMobileScreenButton,
  faFileLines,
  faX,
  faMessage
);

const app = createApp(App);
globalProperties(app);

const swalOptions = {
  confirmButtonColor: "#36A1EA",
  cancelButtonColor: "#F56666",
};

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiredAuth)) {
//     next();
//   } else {
//     next();
//   }
// });

app
  .component("font-awesome-icon", FontAwesomeIcon)
  .component("VueDatePicker", VueDatePicker)
  .component("BaseModal", BaseModal)
  .component("Modal", Modal)
  .component("VPagination", VPagination)
  .component("PulseLoader", PulseLoader)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyD0gCBmbqPir9lGawFtjJmDKgqpKxSw3FY",
      libraries: "places",
    },
    autobindAllEvents: false,
    installComponents: true,
  })
  .use(i18n)
  .use(VueClickAway)
  .use(router, app)
  .use(store)
  .use(VueSweetalert2, swalOptions)
  .use(VueAxios, axios)
  .use(VueCookies)
  .mount("#app");
