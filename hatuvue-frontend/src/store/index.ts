import { createStore } from "vuex";

export default createStore({
  state: {
    sideMenu: false,
  },
  getters: {},
  mutations: {
    toggleSideMenu(state) {
      state.sideMenu = !state.sideMenu;
    },
    setSideMenu(state, payload) {
      state.sideMenu = payload;
    },
  },
  actions: {
    toggleSideMenu({ commit }) {
      commit("toggleSideMenu");
    },
    setSideMenu({ commit }, payload) {
      commit("setSideMenu", payload);
    },
  },
  modules: {},
});
