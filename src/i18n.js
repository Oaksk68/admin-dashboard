import { createI18n } from "vue-i18n";
import store from "@/store/store";
import enLocale from "./locales/en.json";
import thLocale from "./locales/th.json";

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  return {
    en: enLocale,
    th: thLocale,
  };
//   const messages = {};
//   locales.keys().forEach((key) => {
//     const matched = key.match(/([A-Za-z0-9-_]+)\./i);
//     if (matched && matched.length > 1) {
//       const locale = matched[1];
//       messages[locale] = locales(key).default;
//     }
//   });
//   return messages;
}

export default createI18n({
  locale: store.getters.getAppLanguage,
  fallbackLocale: "th",
  messages: loadLocaleMessages(),
});
