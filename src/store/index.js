import Vue from "vue";
import Vuex from "vuex";
import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
import user from "./module/user";
import saveInLocal from "./plugins/saveInLocal";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions,
  modules: {
    user
  },
  //使用插件
  plugins: [saveInLocal]
});
