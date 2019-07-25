<style scoped>
@media screen and (max-width: 1024px) {
  .card {
    display: inline-block;
    width: 80%;
    margin: 10%;
  }
}
@media screen and (min-width: 1024px) {
  .card {
    width: 600px;
    display: inline-block;
    margin: 100px 32%;
  }
}
.btn {
  text-align: center;
}
em {
  color: red;
}
</style>
<template>
  <div class="content">
    <Card class="card">
      <p slot="title">用户注册</p>
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="学生姓名" prop="realName">
          <Input v-model="formValidate.realName" placeholder="请输入学生姓名"></Input>
        </FormItem>
        <FormItem label="身份证号" prop="idCard">
          <Input v-model="formValidate.idCard" placeholder="请输入身份证号码"></Input>
        </FormItem>
        <FormItem label="密码" prop="pwd">
          <Input type="password" v-model="formValidate.pwd" placeholder="请输入密码"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="cpwd">
          <Input type="password" v-model="formValidate.cpwd" placeholder="请输入确认密码"></Input>
        </FormItem>
        <FormItem label="手机号码" prop="phone">
          <Input v-model="formValidate.phone" placeholder="请输入手机号码"></Input>
        </FormItem>
        <FormItem label="验证码" prop="code">
          <Row>
            <Col span="19">
            <Input v-model="formValidate.code" placeholder="验证码区分大小写"></Input>
            </Col>
            <Col span="5"> <Button @click="validateCode">获取验证码</Button>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="性别" prop="sex">
          <RadioGroup v-model="formValidate.sex">
            <Radio label="true">男</Radio>
            <Radio label="false">女</Radio>
            <em>  * 请仔细选择学生性别，一经提交，无法修改</em>
          </RadioGroup>
        </FormItem>
        <FormItem label="请选择学段" prop="type">
          <RadioGroup v-model="formValidate.type">
            <Radio label="1">小学</Radio>
            <Radio label="2">中学</Radio>
            <em>  * 请仔细选择学生申报学段，一经提交，无法修改</em>
          </RadioGroup>
        </FormItem>
        <FormItem label="学籍号" prop="studentNo" v-if="formValidate.type == 2">
          <Input v-model="formValidate.studentNo" placeholder="请输入学籍号"></Input>
        </FormItem>
        <FormItem class="btn">
          <Button type="primary" @click="handleSubmit('formValidate')">下一步</Button>
          <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Card>
    <Confirm ref="submitConfirm" name="submitConfirm" :title="confirmTitle" :confirmTxt="confirmTxt" @ok="registerSubmit"></Confirm>

  </div>
</template>
<script>
import { register } from "@/api/user";
import { getSms } from "@/api/system";
import Confirm from "@/components/common/Confirm";
export default {
  name: "register",
  components: {
    Confirm
  },
  data() {
    const studentNoValidator = (rule, value, callback) => {
      if (value === "" && Number(this.formValidate.type) === 2) {
        callback(new Error("请输入学籍号"));
      } else {
        callback();
      }
    };
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (
          !/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(
            this.formValidate.phone
          )
        ) {
           callback(new Error("请输入正确的手机号"));
        }
        callback();
      }
    };
    const validateIdCard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入身份证号"));
      } else {
        if (!/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value)) {
           callback(new Error("请输入正确的身份证号"));
        } else {
          if (value.length === 18) {
            var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            var idCardWiSum = 0;
            for (var i = 0; i < 17; i++) {
                idCardWiSum += value.substring(i, i + 1) * idCardWi[i];
            }
            var idCardMod = idCardWiSum % 11;
            var idCardLast = value.substring(17);
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            var birthday;
            if (idCardMod === 2) {
                if (idCardLast === "X" || idCardLast === "x") {
                  birthday = Number(value.substr(6, 8));
                  if (birthday > 20130831) {
                    callback(new Error("年龄不满足招生要求"));
                  } else {
                    callback();
                  }
                } else {
                    callback(new Error("请输入正确的身份证号"));
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (Number(idCardLast) === idCardY[idCardMod]) {
                  birthday = Number(value.substr(6, 8));
                  if (birthday > 20130831) {
                    callback(new Error("年龄不满足招生要求"));
                  } else {
                    callback();
                  }
                } else {
                    callback(new Error("请输入正确的身份证号"));
                }
            }
          }
        }
      }
    };
    return {
      confirmTxt: '提交确认后，学生性别和申报学段将无法再次修改，请确认填写准确！是否确认继续提交？',
      confirmTitle: '提交确认',
      formValidate: {
        realName: "",
        idCard: "",
        pwd: "",
        cpwd: "",
        phone: "",
        code: "",
        sex: "",
        type: "",
        studentNo: ''
      },
      ruleValidate: {
        realName: [
          {
            required: true,
            message: "学生姓名不能为空",
            trigger: "blur"
          }
        ],
        idCard: [
          {
            required: true,
            message: "身份证号不能为空",
            trigger: "blur"
          },
          { 
            validator: validateIdCard,
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            type: "string",
            min: 6,
            message: "密码长度不能短于6位",
            trigger: "blur"
          },
          {
            type: "string",
            max: 18,
            message: "密码长度不能大于18位",
            trigger: "blur"
          }
        ],
        cpwd: [
          {
            required: true,
            message: "请输入确认密码",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
          //,
          // {
          //   required: true,
          //    pattern: "/^1(?:3d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8d|9d)d{8}$/",
          //    message: "请输入正确的手机号码",
          //    trigger: "blur"
          //  }
        ],
        code: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "请选择学生性别", trigger: "change" }],
        type: [{ required: true, message: "请选择学段", trigger: "change" }],
        studentNo: [
          {
            required: true,
            message: "请输入学籍号",
            trigger: "blur"
          }, {
          validator: studentNoValidator
        }]
      }
    };
  },
  methods: {
    registerSubmit () {
      register(this.formValidate)
        .then(res => {
          if (res.data.code !== 200) {
            // this.$Message.error(res.data.msg);
          } else {
            this.$Message.success("注册成功");
            this.$router.push("/login");
          }
        })
        .catch(error => {
          console.error(error);
          debugger;
        });
    },
    validateCode() {
      if (
        !/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(
          this.formValidate.phone
        )
      ) {
        this.$Message.error("请输入正确的手机号码");
      } else {
        getSms(this.formValidate.phone)
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.success("请求成功");
            }
          })
          .catch(err => {
            console.error(err);
            debugger;
          });
      }
    },
    handleSubmit(name) {
      if (this.formValidate.pwd !== this.formValidate.cpwd) {
        this.$Message.warning("两次输入的密码不一致");
        return false;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$refs.submitConfirm.show()
        } else {
          //this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {}
};
</script>


