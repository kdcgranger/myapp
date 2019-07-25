<style scoped>
.card {
  width: 600px;
  display: inline-block;
  margin: 100px 32%;
  text-align: center;
}
</style>
<template>
  <div>
    <Card class="card">
      <p slot="title">重置密码</p>
      <div>
        <Form ref="formValidate" :model="formData" :rules="ruleValidate" :label-width="80">
          <FormItem label="学生姓名" prop="realName">
            <Input v-model="formData.realName" placeholder="学生姓名"></Input>
          </FormItem>
          <FormItem label="身份证号" prop="idcard">
            <Input v-model="formData.idcard" placeholder="身份证号"></Input>
          </FormItem>
          <FormItem label="手机号" prop="phone">
            <Input v-model="formData.phone" placeholder="手机号"></Input>
          </FormItem>
          <FormItem label="验证码" prop="code">
            <Row>
              <Col span="19">
              <Input v-model="formData.code" placeholder="验证码"></Input>
              </Col>
              <Col span="5"> <Button @click="validate">获取验证码</Button>
              </Col>
            </Row>

          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
            <Button style="margin-left: 8px" @click="reset">重置</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
import { getSms } from "@/api/system";
import { resetPwd } from "@/api/user";
export default {
  name: "resetPwd",
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (
          !/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(
            value
          )
        ) {
          callback(new Error("请输入正确的手机号"));
        }
        callback();
      }
    };
    return {
      formData: {
        realName: "",
        idcard: "",
        phone: "",
        code: ""
      },
      ruleValidate: {
        realName: [
          {
            required: true,
            message: "必须填写学生姓名",
            trigger: "blur"
          }
        ],
        idcard: [
          {
            required: true,
            message: "必须填写身份证号",
            trigger: "blur"
          }
        ],
        phone: [
          {
            required: true,
            message: "必须填写手机号",
            trigger: "blur"
          },
          { validator: validatePhone, trigger: "blur" }
        ],
        code: [
          {
            required: true,
            message: "必须填写验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    validate() {
      if (
        !/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(
          this.formData.phone
        )
      ) {
        this.$Message.error("请输入正确的手机号码");
      } else {
        getSms(this.formData.phone)
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
    reset () {
      this.formData = {
        realName: "",
        idcard: "",
        phone: "",
        code: ""
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          resetPwd(this.formData)
            .then(res => {
              if (res.data.code === 200) {
                this.$Message.success("密码重置成功");
                this.$router.push("/login");
              }
            })
            .catch(err => {
              console.error(err);
              this.$Message.error("重置失败，请稍后再试");
            });
        }
      });
    }
  }
};
</script>


