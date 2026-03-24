import axios from "axios";

const state = {
  leaveDays: null,
  demoDate: {
    date: new Date(),
  },
};

const mutations = {
  setLeaveDays: (state, payload) => {
    state.leaveDays = payload;
  },
};

const actions = {
  fetchLeaveDays({ commit }, date) {
    return new Promise((resolve, reject) => {
      axios
        .post("holidays-leaves", date)
        .then((response) => {
          resolve(response);
          commit("setLeaveDays", response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  getLeaveDays: (state) => state.leaveDays,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
