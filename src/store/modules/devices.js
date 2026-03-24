import axios from "axios";

const state = {
  deviceCate: "",
  typeSelector: "",
};

const mutations = {
  setDeviceCate: (state, payload) => {
    state.deviceCate = payload;
  },
  setTypeSelector: (state, payload) => {
    state.typeSelector = payload;
  },
};

const actions = {
  fetchDeviceCate({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("get-device-category")
        .then((response) => {
          resolve(response);
          commit("setDeviceCate", response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  fetchTypeSelector({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("device-category-type-selector")
        .then((response) => {
          resolve(response);
          commit("setTypeSelector", response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  getDeviceCate: (state) => state.deviceCate,
  getTypeSelector: (state) => state.typeSelector,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
