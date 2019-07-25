export default [
  {
    path: "/regsiter",
    name: "regsiter",
    component: resolve => require(["@/views/Regsiter.vue"], resolve),
    meta: {
      content: 'height=device-height,width=drvice-width,inital-scale=1.0,maximum-scale=1.0,user-scalable=no',
      name: 'viewport'
    }
  },
  {
    path: "/home",
    alias: "/home",
    component: resolve => require(["@/views/Home.vue"], resolve),
    meta: {
      content: '',
      name: 'viewport'
    },
    children: [
      {
        path: "",
        name: "enroll",
        alias: "enroll",
        component: resolve => require(["@/views/Enroll.vue"], resolve)
      },
      {
        path: "userDetail",
        name: "userDetail",
        props: true,
        component: resolve => require(["@/views/UserDetail.vue"], resolve)
      },
      {
        path: "userInfo",
        name: "userInfo",
        component: resolve => require(["@/views/UserInfo.vue"], resolve)
      },
      {
        path: "apply",
        name: "apply",
        component: resolve => require(["@/views/Apply.vue"], resolve)
      },
      {
        path: "applySingle",
        name: "applySingle",
        component: resolve => require(["@/views/ApplySingle.vue"], resolve)
      },
      {
        path: "updatePwd",
        name: "updatePwd",
        component: resolve => require(["@/views/UpdatePwd.vue"], resolve)
      }
    ]
  },
  {
    path: "/admin",
    component: resolve => require(["@/views/Admin.vue"], resolve),
    meta: {
      content: '',
      name: 'viewport'
    },
    children: [
      {
        path: "",
        name: "allot",
        alias: "allot",
        component: resolve => require(["@/views/Allot.vue"], resolve)
      },
      {
        path: "detail",
        name: "detail",
        props: true,
        component: resolve => require(["@/views/UserDetail.vue"], resolve)
      },
      {
        path: "student",
        name: "student",
        props: true,
        component: resolve => require(["@/views/Student.vue"], resolve)
      },
      {
        path: "statics",
        name: "statics",
        props: true,
        component: resolve => require(["@/views/Statics.vue"], resolve)
      },
      {
        path: "plan",
        name: "plan",
        props: true,
        component: resolve => require(["@/views/Plan.vue"], resolve)
      },
      {
        path: "updatePwd",
        name: "updatePwd",
        component: resolve => require(["@/views/UpdatePwd.vue"], resolve)
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: resolve => require(["@/views/Login.vue"], resolve),
    meta: {
      content: 'height=device-height,width=drvice-width,inital-scale=1.0,maximum-scale=1.0,user-scalable=no',
      name: 'viewport'
    }
  },
  {
    path: "/resetPwd",
    name: "resetPwd",
    component: resolve => require(["@/views/ResetPwd.vue"], resolve),
    meta: {
      content: 'height=device-height,width=drvice-width,inital-scale=1.0',
      name: 'viewport'
    }
  },
  {
    path: "/",
    name: "index",
    redirect: { name: 'login' }
  },
  {
    path: "*",
    redirect: "/"
  }
];