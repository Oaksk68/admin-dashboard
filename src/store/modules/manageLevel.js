import axios from "axios";

const state = {
  managementLevels: [],
};

const mutations = {
  setManagementLevels(state, payload) {
    state.managementLevels = payload;
  },
};
const actions = {
  fetchManagementLevels({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("management-level-selector")
        .then((response) => {
          resolve(response);
          commit("setManagementLevels", response.data.data);
        })
        .then((err) => {
          reject(err);
        });
    });
  },
};

const getters = {
  getManagementLevels: (state) => state.managementLevels,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
