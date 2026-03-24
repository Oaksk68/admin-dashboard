import axios from "axios";

const state = {
  companies: {},
};

const mutations = {
  SET_COMPANIES: (state, payload) => {
    state.companies = payload;
  },
};

const actions = {
  fetchCompanyList({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .post("companies")
        .then((res) => {
          resolve(res);
          console.log(res);
          commit("SET_COMPANIES", res.data.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

const getters = {
  companyList: (state) => state.companies,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
