import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import iView from "iview";
import "iview/dist/styles/iview.css";
import bus from "@/lib/bus";
Vue.use(iView);
Vue.config.productionTip = false;
//添加全局消息总线
Vue.prototype.$bus = bus;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
