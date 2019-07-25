<style scoped>
.card>>>.ivu-card-body > p {
  height: 50px;
  line-height: 50px;
  border-bottom: #ccc solid thin;
}
.title {
  text-align: right;
  margin-right: 50px;
  display: inline-block;
  width: 100px;
}
</style>
<template>
  <div class="content">
    <Card class="card">
      <p slot="title">当前录取状态为 【{{applyStatu}}】</p>
      <p v-if="enroll.applyStatus===8">
        <span class="title">预录取学校为:</span>
        <span>{{enroll.allotSchoolName}}</span>
      </p>
      <p v-if="enroll.applyStatus===9">
        <span class="title">录取学校为:</span>
        <span>{{enroll.allotSchoolName}}</span>
      </p>
      <p>
        <span class="title">审核意见为:</span>
        <span>{{enroll.allotReason}}</span>
      </p>
      <p>
        <span class="title">学生姓名:</span>
        <span>{{user.realName}}</span>
      </p>
      <p>
        <span class="title">学生身份证号:</span>
        <span>{{user.idCard}}</span>
      </p>
      <p>
        <span class="title">学生身性别:</span>
        <span>{{gender}}</span>
      </p>
      <p>
        <span class="title">联系电话:</span>
        <span>{{user.phone}}</span>
      </p>
      <p>
        <span class="title">学位申请类型:</span>
        <span>{{applyType}}</span>
      </p>
      <p>
        <span class="title">初始申请时间:</span>
        <span>{{user.createTime}}</span>
      </p>
    </Card>
  </div>
</template>
<script>
import { queryApply } from "@/api/app";
import { mapGetters } from "vuex";
import { convertApplyType, convertApplyStatu } from "@/lib/util";
export default {
  name: "enroll",
  data() {
    return {
      enroll: {}
    };
  },
  computed: {
    ...mapGetters({ user: "userInfo" }),
    gender() {
      return this.user.sex === true ? "男" : "女";
    },
    applyType() {
      return convertApplyType(this.enroll.applyType);
    },
    applyStatu() {
      return convertApplyStatu(this.enroll.applyStatus);
    }
  },
  methods: {
    queryEnroll() {
      queryApply(this.user.id).then(res => {
        if (res.data.code === 200) {
          this.enroll = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.queryEnroll();
  }
};
</script>

