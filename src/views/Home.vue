<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
}
.layout-logo {
  width: 50px;
  height: 50px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 8px;
  left: 20px;
  background-image: url("../assets/images/mobile_logo.png");
  background-repeat: round;
}
.layout-title {
  width: 150px;
  height: 50px;
  float: left;
  position: relative;
  top: 8px;
  left: 20px;    
  font-weight: bold;
  font-size: 22px;
  padding-left: 8px;
  line-height: 55px;
  color: white;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.content {
  height: calc(100% - 64px);
}
.layout-body {
  height: 100%;
}

.menu {
  width: 200px;
}

.ivu-layout-header {
  padding: 0px !important;
}
</style>

<template>
  <div class="layout">
    <Layout class="layout-body">
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="exit">
          <div class="layout-logo"></div>
          <div class="layout-title">当阳招生系统</div>
          <div class="layout-nav">
            <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            您好,{{user.realName}}
            </MenuItem>
            <MenuItem name="exit">
            <Icon type="ios-keypad"></Icon>
            退出
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout class="content">
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu :theme="theme3" active-name="1" class="menu" :style="{width: '200px'}" @on-select="onSelect">
            <MenuGroup title="菜单">
              <MenuItem name="/home/enroll">
              <Icon type="md-barcode" /> 查看录取状态
              </MenuItem>
              <MenuItem name="/home/userInfo">
              <Icon type="ios-baseball" /> 修改报名资料
              </MenuItem>
              <MenuItem name="/home/userDetail">
              <Icon type="ios-book" /> 查看报名资料
              </MenuItem>
              <MenuItem name="/home/updatePwd">
              <Icon type="md-cog" /> 修改密码
              </MenuItem>
            </MenuGroup>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>招生系统</BreadcrumbItem>
            <BreadcrumbItem>{{crumbTitle}}</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home",
  data() {
    return {
      theme3: "light",
      crumbTitle: "首页"
    };
  },
  computed: {
    appVersion() {
      return this.$store.getters.appWitnVersion;
    },
    ...mapGetters({ user: "userInfo" })
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    //退出
    exit(name) {
      if (name === "exit") {
        this.handleLogOut()
          .then(() => {
            this.$Message.success("退出成功");
            this.$router.push({ name: "login" });
          })
          .catch(err => {
            console.error("ERROR", err);
            this.$Message.error("退出失败");
          });
      }
    },
    onSelect(name) {
      if (name === "/home/userDetail") {
        this.$router.push({
          name: "userDetail",
          params: { userId: this.user.id }
        });
        this.crumbTitle = "报名资料"
      } else {
        this.$router.push(name);
        switch (name) {
          case "/home/enroll":
            this.crumbTitle = "录取状态"
            break;

          case "/home/userInfo":
            this.crumbTitle = "修改报名资料"
            break;

          case "/home/updatePwd":
            this.crumbTitle = "修改密码"
            break;
        
          default:
            this.crumbTitle = "首页"
            break;
        }
      }
    }
  },
  components: {},
  mounted () {
    /* if (localStorage.getItem("login") === 'first') {
      localStorage.removeItem("login")
      location.reload()
    } */
  }
};
</script>
