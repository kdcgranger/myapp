<style scoped>
.dismiss {
  margin-bottom: 10px;
  text-align: center;
}
</style>
<template>
  <div>
    <Modal
      v-model="isShow"
      title="驳回申请"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <RadioGroup
        v-model="reason.dismissType"
        class="dismiss"
        @on-change="onChange"
      >
        <Radio
          label="1"
          size="large"
        >
          <span>提交材料不符合招生区域</span>
        </Radio>
        <!--
        <Radio label="2" size="large">
          <span>不在招生区域</span>
        </Radio>-->
        <Radio
          label="3"
          size="large"
        >
          <span>补充材料</span>
        </Radio>
      </RadioGroup>
      <Input
        v-model="reason.checkReason"
        type="textarea"
        :rows="4"
        placeholder="其他原因请在此填写"
      />
    </Modal>
  </div>
</template>
<script>
export default {
  name: "dismiss",
  data() {
    return {
      isShow: false,
      reason: { dismissType: 0, checkReason: "" }
    };
  },
  watch: {
    dismissType: function(val, oldVal) {}
  },
  methods: {
    onChange(data) {
      switch (data) {
        case "1":
          this.reason.checkReason = "提交材料不符合招生区域";
          break;

        case "2":
          this.reason.checkReason = "不在招生区域";
          break;

        case "3":
          this.reason.checkReason = "补充材料";
          break;

        default:
          break;
      }
    },
    initData(param) {
      this.reason = param;
    },
    clear() {
      this.reason = { dismissType: 0, checkReason: "" };
    },
    show() {
      this.clear();
      this.isShow = true;
    },
    close() {
      this.show = false;
    },
    ok() {
      this.$emit("ok", this.reason);
    },
    cancel() {}
  }
};
</script>


