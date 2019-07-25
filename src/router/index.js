import Vue from "vue";
import Router from "vue-router";
import routers from "./router";
import {
  getToken
} from '@/lib/util'
Vue.use(Router);
const router = new Router({
  //mode: "history",
  routes: routers
});
//登陆界面
const LOGIN_PAGE_NAME = 'login';
//注册界面
const REGISTER_PAGE_NAME = 'regsiter';
//重置密码页面
const RESET_PAGE_NAME = 'resetPwd';

//全局前置守卫,如果没有登录就跳转到登陆页面
router.beforeEach((to, from, next) => {
  if (to.meta.name) {
    let viewPorts = document.getElementsByName("viewport")
    $.each(viewPorts, function(index, e) {
      document.getElementsByTagName('head')[0].removeChild(e)
    })
    let head = document.getElementsByTagName('head');
    let meta = document.createElement('meta');
    meta.content = to.meta.content;
    meta.name = to.meta.name;
    head[0].appendChild(meta)
  }
  const token = getToken()
  if (!token) {
    // 未登录且要跳转的页面是登录页、注册页面和忘记密码页面
    if (to.name === LOGIN_PAGE_NAME || to.name === REGISTER_PAGE_NAME || to.name === RESET_PAGE_NAME) {
      next();
    } else {
      //未登录且登陆页面需要权限
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    }
  } else {
    //已登录，可以去任意页面
    next();
  }
});
//全局后置钩子
router.afterEach((to, from) => {
  // ...
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    const hackIframe = document.createElement('iframe');
    hackIframe.style.display = 'none';
    hackIframe.src = '/public/index.html?r=' + Math.random();
    document.body.appendChild(hackIframe);
    setTimeout(_ => {
        document.body.removeChild(hackIframe)
        if (localStorage.getItem("login") === 'first') {
          localStorage.removeItem("login")
          location.reload()
        }
    }, 500)
  }
});
export default router;