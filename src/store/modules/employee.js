import axios from "axios";

const state = {
  departments: [],
  positions: [],
  shiftTimes: [],
  attStatus: [],
};

const mutations = {
  setDepartments: (state, payload) => {
    state.departments = payload;
  },
  setShiftTimes: (state, payload) => {
    state.shiftTimes = payload;
  },
  setAttStatus: (state, payload) => {
    state.attStatus = payload;
  },
  setPositions: (state, payload) => {
    state.positions = payload;
  },
};

const actions = {
  fetchDepartments({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("get-departments")
        .then((response) => {
          resolve(response);
          commit("setDepartments", response.data.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  fetchPositions({ commit }, departmentId) {
    console.log(departmentId);
    return new Promise((resolve, reject) => {
      axios
        .get(`positions-by-department/${departmentId}`)
        .then((res) => {
          resolve(res);
          commit("setPositions", res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetchShiftTimes({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("get-shifttimes")
        .then((response) => {
          resolve(response);
          commit("setShiftTimes", response.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },

  fetchAttStatus({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("get-attendance-status")
        .then((response) => {
          resolve(response);

          commit("setAttStatus", response.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const getters = {
  getAllDepartments: (state) => state.departments,
  getAllShiftTimes: (state) => state.shiftTimes,
  getAttStatus: (state) => state.attStatus,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
