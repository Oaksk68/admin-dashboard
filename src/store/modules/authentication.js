import axios from "axios";

const state = {
  authenticated: false,
  regiCompanies: [],
  // usr_role: null,
  appLanguage:
    localStorage.getItem("appLanguage") ||
    import.meta.env.VITE_APP_I18N_LOCALE ||
    "th",
};

const mutations = {
  setAuthentication(state, status) {
    state.authenticated = status;
    sessionStorage.setItem("authenticated", status);
    console.log(state.authenticated);
  },
  setAppLanguage(state, language) {
    state.appLanguage = language;
    localStorage.setItem("appLanguage", language);
  },
  setRegiCompanies(state, payload) {
    state.regiCompanies = payload;
  },
  // set_usr_role(state, payload) {
  //   state.usr_role = payload;
  // },
};
const actions = {
  fetchRegiCompanies({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("allowed-regi-companies")
        .then((response) => {
          resolve(response);
          commit("setRegiCompanies", response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  getAppLanguage: (state) => state.appLanguage,
  getRegiCompanies: (state) => state.regiCompanies,
  authStatus: (state) => state.authenticated,
};

export default {
  state,
  mutations,
  actions,
  getters,
  // plugins: [
  //   createPersistedState({
  //     paths: ["usr_role"],
  //   }),
  // ],
};
