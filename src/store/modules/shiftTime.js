import axios from "axios";

const state = {
  breakTimes: [],
  weekdays: [],
};

const mutations = {
  setBreakTimes: (state, payload) => {
    state.breakTimes = payload;
  },
  setWeekdays: (state, payload) => {
    state.weekdays = payload;
  },
};

const actions = {
  fetchBreakTimes({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("break-time-selector")
        .then((response) => {
          resolve(response);
          commit("setBreakTimes", response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  fetchWeekdays({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("weekdays")
        .then((response) => {
          resolve(response);
          commit("setWeekdays", response.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const getters = {
  getAllBreakTimes: (state) => state.breakTimes,
  getAllWeekdays: (state) => state.weekdays,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
