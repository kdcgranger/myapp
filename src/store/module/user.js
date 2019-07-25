import { setToken, getToken } from "@/lib/util";
import { login, logout } from "@/api/user";
const state = {
  token: getToken(),
  user: {}
};
const getters = {
  userInfo: state => {
    return state.user;
  }
};
const mutations = {
  /**
   * 设置token
   * @param {*} state
   * @param {token数据} data
   */
  setToken(state, data) {
    state.token = data;
    setToken(data);
  },
  /**
   * 设置用户信息
   * @param {*} state
   * @param {*} data
   */
  setUser(state, data) {
    state.user = data;
  }
};

const actions = {
  // 登录
  handleLogin({ commit }, { idCard, pwd }) {
    idCard = idCard.trim();
    return new Promise((resolve, reject) => {
      login({
        idCard,
        pwd
      })
        .then(res => {
          const data = res.data;
          if (
            typeof data.token !== "undefined" &&
            typeof data.data !== "undefined"
          ) {
            //这里是调用mutations里的设置token方法
            commit("setToken", data.token);
            commit("setUser", data.data);
          }
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  /**
   * 检查token是否有效
   * @param {*} param0 
   * @param {*} param1 
   */
  check({ commit }, { token }) {

  },
  // 退出登录
  handleLogOut({ state, commit }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit("setToken", "");
          commit("setUser", {});
          resolve();
        })
        .catch(err => {
          reject(err);
        });
      // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
      // commit('setToken', '')
      // commit('setAccess', [])
      // resolve()
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
