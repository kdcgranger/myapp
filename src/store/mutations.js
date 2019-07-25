import vue from "vue";
const mutations = {
  //修改一个已经存在的值
  changeName(state, data) {
    state.appName = data;
    console.log("-------------------调用mutations方法了" + data);
  },
  //增加一个不存在的值
  setNewKV(state, data) {
    /**
     * 这样设置不会生效   state.appVersion="未知名版本";
     */

    vue.set(state, "appVersion", "未知名版本");
  },
  //存储用户信息
  setUserInfo(state, data) {
    state.user = data;
  }
};
/**
 * 1)   mutations里的方法使用 this.$store.commit("方法名", "参数");的方式调用，
 *      也可以使用this.$store.commit({ type: "changeName", appName: "dfdsf" });形式调用
 * 2)   mutations必须是同步函数
 */
export default mutations;
