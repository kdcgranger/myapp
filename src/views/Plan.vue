<style scoped>
.card {
  width: 600px;
  margin-left: 20%;
}
.tip_cls {
  margin-left: 20px;
  color: #949494;
}
</style>
<template>
    <div>
        <Card class="card" shadow bordered>
            <p slot="title">系统设置</p>
            <Form ref="form" :model="formData" :label-width="130" :rules="ruleValidate">
                <FormItem label="开始注册时间" prop="registerStart">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date" v-model="formData.registerStart"></DatePicker>
                </FormItem>
                <FormItem label="结束注册时间" prop="registerEnd">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date" v-model="formData.registerEnd"></DatePicker>
                </FormItem>
                <FormItem label="开始审核时间" prop="checkStart">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date" v-model="formData.checkStart"></DatePicker>
                </FormItem>
                <FormItem label="结束审核时间" prop="checkEnd">
                    <DatePicker type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="Select date" v-model="formData.checkEnd"></DatePicker>
                </FormItem>
                <FormItem label="审核开关">
                    <i-switch v-model="formData.checkStatu" size="large">
                        <span slot="open">On</span>
                        <span slot="close">Off</span>
                    </i-switch>
                </FormItem>
                <FormItem label="登录开关">
                    <i-switch v-model="formData.schoolLoginStatu" size="large">
                        <span slot="open">On</span>
                        <span slot="close">Off</span>
                    </i-switch>
                    <span class="tip_cls">* 关闭后学校管理员将无法登录</span>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
                </FormItem>
            </Form>
        </Card>
        <Confirm ref="submitConfirm" name="submitConfirm" :title="confirmTitle" :confirmTxt="confirmTxt" @ok="updateSubmit"></Confirm>
    </div>
</template>
<script>
import { getPlan, updatePlan } from "@/api/system";
import { DateTimeFormat } from "@/lib/tools";
import Confirm from "@/components/common/Confirm";
export default {
  components: {
    Confirm
  },
  name: "plan",
  data() {
    return {
      confirmTitle: '是否确认提交',
      confirmTxt: '登录开关关闭，学校管理员将无法登录，是否确认继续提交？',
      formData: {
        schoolLoginStatu: true,
        checkStatu: true,
        registerStart: "",
        registerEnd: "",
        checkStart: "",
        checkEnd: ""
      },
      ruleValidate: {
        registerStart: [
          {
            required: true,
            type: "date",
            message: "开始注册日日期不能为空",
            trigger: "blur"
          }
        ],
        registerEnd: [
          {
            required: true,
            type: "date",
            message: "结束注册日日期不能为空",
            trigger: "blur"
          }
        ],
        checkStart: [
          {
            required: true,
            type: "date",
            message: "开始审核日日期不能为空",
            trigger: "blur"
          }
        ],
        checkEnd: [
          {
            required: true,
            type: "date",
            message: "结束审核日日期不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    queryPlan() {
      getPlan()
        .then(res => {
          if (res.data.code === 200) {
            this.formData = res.data.data;
          }
        })
        .catch(() => {
          this.$Message.error("获取系统信息失败");
        });
    },
    updateSubmit () {
      let data = this.format(this.formData);
      updatePlan(data)
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.success("修改成功，将在3秒钟后刷新页面");
            // 提交后再次修改js报错
            setTimeout(() => {
              location.reload()
            }, 3000)
          }
        })
        .catch(() => {
          this.$Message.error("获取系统信息失败");
        });
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!this.formData.schoolLoginStatu) {
            this.$refs.submitConfirm.show()
          } else {
            this.updateSubmit()
          }
        }
      });
    },
    format(data) {
      data.registerStart = DateTimeFormat(data.registerStart);
      data.registerEnd = DateTimeFormat(data.registerEnd);
      data.checkStart = DateTimeFormat(data.checkStart);
      data.checkEnd = DateTimeFormat(data.checkEnd);
      return data;
    },
    handleReset() {}
  },
  mounted() {
    this.queryPlan();
  }
};
</script>

