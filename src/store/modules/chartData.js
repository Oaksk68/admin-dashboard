import axios from "axios";

const state = {
  dataLoading: true,
  douchartData: "",
  yearlyDouchartData: "",
};

const mutations = {
  setDouchartData: (state, payload) => {
    state.douchartData = payload;
  },
  setYearlyDouchartData: (state, payload) => {
    state.yearlyDouchartData = payload;
  },
  setLoading(state, loading) {
    state.dataLoading = loading;
  },
};

const actions = {
  fetchEmpDouchartData({ commit }, payload) {
    axios
      .post("emp-yearly-graph", payload)
      .then((res) => {
        commit("setDouchartData", res.data.message);
        commit("setLoading", false);
        console.log(state.douchartData);
      })
      .catch((err) => console.log(err));
  },
  fetchYearlyDouchartData({ commit }, payload) {
    axios
      .post("report/yearly-graph", payload)
      .then((res) => {
        commit("setYearlyDouchartData", res.data.message);
        commit("setLoading", false);
        console.log(state.dataLoading);
      })
      .catch((err) => console.log(err));
  },
};

const getters = {
  getDouchartData: (state) => state.douchartData,
  YEARLY_GRAPH_DATA: (state) => state.yearlyDouchartData,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
