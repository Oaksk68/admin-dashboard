import axios from "axios";

const state = {
  packages: {},
};

const mutations = {
  setPackages: (state, payload) => {
    state.packages = payload;
  },
};

const actions = {
  async fetchPackages({ commit }) {
    const res = await axios.get("/get_packages");
    commit("setPackages", res.data.message);
    return res.data.message;
  },
};

const getters = {
  pkgs: (state) => state.packages,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
