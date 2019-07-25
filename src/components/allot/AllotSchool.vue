<style scoped>
.dismiss {
  margin-bottom: 10px;
  text-align: center;
}
</style>
<template>
    <div>
        <Modal v-model="isShow" title="分配学校" @on-ok="ok" @on-cancel="cancel">
            <Row>
                <Col span="4">选择学校
                </Col>
                <Col span="20"> <Select v-model="school" style="width:200px">
                    <Option v-for="item in schools" :value="item.id" :key="item.id">{{ item.schoolName }}</Option>
                </Select>
                </Col>
            </Row>
        </Modal>
    </div>
</template>
<script>
export default {
  name: "dismiss",
  data() {
    return {
      isShow: false,
      school: ""
    };
  },
  props: {
    schools: {
      type: Array,
      required: true
    }
  },
  methods: {
    initData(param) {
      this.school = param;
    },
    clear() {
      this.school = "";
    },
    show() {
      this.clear();
      this.isShow = true;
    },
    close() {
      this.show = false;
    },
    ok() {
      this.$emit("ok", this.school);
    },
    cancel() {}
  }
};
</script>


