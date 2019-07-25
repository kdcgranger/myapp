<style scoped>
.content {
  background-image: url("../assets/images/enroll_bg.jpg");
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}
@media screen and (max-width: 1024px) {
  .left {
    display: inline-block;
    width: 0%;
  }
  .right {
    display: inline-block;
    width: 90%;
    padding-top: 10%;
    margin-left: 5%;
  }
  .form {
    width: 100%;
  }
}
@media screen and (min-width: 1024px) {
  .left {
    display: inline-block;
    width: 70%;
  }
  .right {
    display: inline-block;
    width: 30%;
    padding-top: 15%;
  }
  .form {
    width: 80%;
  }
}
.form>>>.ivu-card > .ivu-card-body {
  padding-top: 10%;
  padding-right: 15%;
}
.btn {
  margin-top: 20px;
}
.ivu-row .ivu-col a {
  color: #ccc;
}
.qr_cls {
  width: 130px;
  height: 130px;
  background-image: url("../assets/images/dy_qrc.png");
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-repeat: round;
}
</style>
<template>
  <div class="content" :style="mobileStyle">
    <div class="qr_cls" v-if="!isMobile"></div>
    <div class="left"></div>
    <div class="right">
      <div class="form">
        <Card>
          <row>
            <Col span="24" style="text-align:center;padding-bottom:20px">
              如果没有注册，请先点击<router-link to="/regsiter" style="color:#2d8cf0"> 注册账号</router-link>
            </Col>
          </row>
          <Form :model="formData" label-position="right" :label-width="85">
            <FormItem :label="loginName">
              <Input v-model="formData.idCard" placeholder="请输入学生身份证号或管理员账号" style="margin-top:5px"></Input>
            </FormItem>
            <FormItem label="密码">
              <Input type="password" v-model="formData.pwd" @on-enter="handleSubmit" placeholder="请输入登录密码"></Input>
            </FormItem>
          </Form>
          <row>
            <Col span="24" style="text-align:center;padding-bottom:20px">
              <router-link to="/resetPwd" style="color:#2d8cf0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;忘记密码</router-link>
            </Col>
          </row>
        </Card>
        <Button type="primary" class="btn" long @click="handleSubmit">登录</Button>
      </div>
    </div>
    <div class="wxtip" id="JweixinTip" v-if="isAndroidWeiXin">
      <span class="wxtip-icon"></span>
      <p class="wxtip-txt">点击右上角<br/>选择在浏览器中打开</p>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "login",
  data() {
    return {
      loginName: '学生身份证号管理员账号',
      formData: {
        idCard: "",
        pwd: ""
      },
      isMobile: false,
      isAndroidWeiXin: false,
      mobileStyle: ''
    };
  },
  methods: {
    ...mapActions(["handleLogin"]),
    validate() {
      if (
        this.formData.idCard === "" ||
        this.formData.idCard.trim().length === 0
      ) {
        this.$Message.error("身份证号/账号不能为空");
        return false;
      }
      if (this.formData.pwd === "" || this.formData.pwd.trim().length === 0) {
        this.$Message.error("密码不能为空");
        return false;
      }
      return true;
    },
    handleSubmit() {
      if (this.validate()) {
        this.handleLogin({
          idCard: this.formData.idCard,
          pwd: this.formData.pwd
        })
          .then(res => {
            if (res.code === 200) {
              localStorage.setItem("role", res.data.type)
              if (this.isMobile) {
                localStorage.setItem("login", 'first')
              }
              if (res.data.type === 1 || res.data.type === 2) {
                this.$router.push("/home");
              } else {
                this.$router.push("/admin");
              }
            }
          })
          .catch(err => {
            console.log(err);
            this.$Message.error("网络异常，请稍后再试");
          });
      }
    }
  },
  mounted() {
    //  $("body").css({
    //  "background-image": "url('http://localhost:8080/static/login-bg.jpg')",
    //   "background-size": "cover"
    //  });
    this.isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
    this.isAndroidWeiXin = !!/MicroMessenger/i.test(navigator.userAgent) && (navigator.userAgent.indexOf('Android') > -1)
    if (this.isMobile) {
      this.mobileStyle = "width:" + window.screen.width + "px;" + "height:" + window.screen.height + "px;"
      // this.mobileStyle = "width:" + (document.body.offsetWidth * 0.8) + "px;"
    }
  }
};
</script>
<style scoped>
.wxtip{background: rgba(0,0,0,0.8); text-align: center; position: fixed; left:0; top: 0; width: 100%; height: 100%; z-index: 998; display: block;}
/* .wxtip-icon{width: 52px; height: 67px; background: url() no-repeat; display: block; position: absolute; right: 20px; top: 20px;} */
.wxtip-txt{margin-top: 107px; color: #fff; font-size: 16px; line-height: 1.5;}
</style>

