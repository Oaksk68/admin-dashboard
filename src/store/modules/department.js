import axios from "axios";

const state = {
  enterprise_level: [],
  managers: [],
  id: "",
};

const mutations = {
  setEnterpriseLevel: (state, payload) => {
    state.enterprise_level = payload;
  },
  setManagers: (state, payload) => {
    state.managers = payload;
  },
  setId: (state, payload) => {
    state.id = payload;
  },
};

const actions = {
  fetchEnterpriseLevel({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("orglevels")
        .then((response) => {
          resolve(response);
          commit("setEnterpriseLevel", response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  fetchManagers({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("department-managers")
        .then((response) => {
          resolve(response);
          commit("setManagers", response.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const getters = {
  getEnterpriseLevel: (state) => state.enterprise_level,
  getManagers: (state) => state.managers,
  getId: (state) => state.id,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
