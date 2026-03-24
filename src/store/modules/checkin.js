import axios from "axios";

const state = {
  fineType: "",
  shiftTimeData: {},
};

const mutations = {
  setFineType: (state, payload) => {
    state.fineType = payload;
  },
  setShiftTimeData: (state, payload) => {
    state.shiftTimeData = payload;
  },
};

const actions = {
  fetchFineType({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("finetype-selector")
        .then((response) => {
          resolve(response);
          commit("setFineType", response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  fetchCheckIn({ commit }, id) {
    return new Promise((resolve, reject) => {
      axios
        .get("shifttime/edit/" + id)
        .then((response) => {
          resolve(response);
          commit("setShiftTimeData", response.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const getters = {
  getFineType: (state) => state.fineType,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
