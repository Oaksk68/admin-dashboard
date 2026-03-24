import axios from "axios";

const state = {
  user: {},
  titles: [],
  role: null,
};

const mutations = {
  setUserInfo: (state, payload) => {
    state.user = payload;
  },
  setTitles: (state, payload) => {
    state.titles = payload;
  },
  SET_USER_ROLE: (state, payload) => {
    state.role = payload;
    console.log("user_role_inside_vuex", state.role);
  },
};

const actions = {
  fetchUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("profile/user")
        .then((response) => {
          resolve(response);
          commit("setUserInfo", response.data.user);
          commit("SET_USER_ROLE", response.data.user.role);
          commit("setTitles", response.data.titles);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

const getters = {
  getUserInfo: (state) => state.user,
  getAllTitles: (state) => state.titles,
  UserRole: (state) => state.role,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
