<style scoped>
b {
  padding: 30px;
  line-height: 35px;
  font-size: 13px;
}
</style>
<template>
  <div>
    <Modal v-model="isShow" :title="title" @on-ok="ok" @on-cancel="cancel">
      <b>{{confirmTxt}}</b>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "confirm",
  data() {
    return {
      isShow: false
    };
  },
  props: {
    confirmTxt: String,
    title: String
  },
  methods: {
    show() {
      // this.clear();
      this.isShow = true;
    },
    close() {
      this.show = false;
    },
    ok() {
      this.$emit("ok");
    },
    cancel() {
    }
  }
};
</script>


