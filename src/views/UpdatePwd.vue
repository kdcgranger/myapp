<style scoped>
.content {
  padding: 0% 5%;
}
</style>
<template>
  <div class="content">
    <Form :model="formData" :label-width="80">
      <FormItem label="原始密码">
        <Input v-model="formData.oldPwd" placeholder="请输入密码"></Input>
      </FormItem>
      <FormItem label="新密码">
        <Input v-model="formData.newPwd" placeholder="请输入新密码"></Input>
      </FormItem>
      <FormItem label="确认密码">
        <Input v-model="formData.cPwd" placeholder="请输入确认密码"></Input>
      </FormItem>
      <FormItem>
        <Button @click="submit" type="primary">确定</Button>
        <!-- <Button style="margin-left: 8px">取消</Button> -->
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { updatePwd } from "@/api/user";
export default {
  name: "updatePwd",
  data() {
    return {
      formData: {
        oldPwd: "",
        newPwd: "",
        cPwd: ""
      }
    };
  },
  computed: {
    ...mapGetters({ user: "userInfo" })
  },
  methods: {
    submit() {
      if (this.formData.cPwd !== this.formData.newPwd) {
        this.$Message.warning("两次输入的密码不一致");
        return false;
      }
      updatePwd({ oldPwd: this.formData.oldPwd, newPwd: this.formData.newPwd })
        .then(res => {
          debugger;
          if (res.data.code === 200) {
            this.$Message.success("修改成功，请重新登录");
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>


