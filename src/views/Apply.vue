<style scoped>
.tail {
  text-align: center;
  margin-top: 50px;
}
</style>
<template>
  <div>
    <Tabs type="card">
      <Tag color="default" slot="extra">请选择对应的身份进行学位申报</Tag>
      <TabPane label="军人">
        <Solider ref="solider" name="solider" @on-change="onSoliderChange"></Solider>
      </TabPane>
      <TabPane label="房产">
        <House ref="houseInfo" name="houseInfo" :relations="relations" @on-change="onHouseChange"></House>
      </TabPane>
      <TabPane label="户口">
        <HouseHold ref="householdInfo" name="householdInfo" :relations="relations" @on-change="onHouseholdChange"></HouseHold>
      </TabPane>
      <TabPane label="经商">
        <Merchant ref="merchantInfo" name="merchantInfo" :relations="relations" @on-change="onMerchantChange"></Merchant>
      </TabPane>
      <TabPane label="务工">
        <Worker ref="workerInfo" name="workerInfo" :relations="relations" @on-change="onWorkerChange"></Worker>
      </TabPane>
    </Tabs>
    <div class="tail">
      <Button type="primary" @click="handleSubmit('formValidate')">提交申请</Button>
      <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getRelation } from "@/api/system";
import { getUserInfo, updateApplyInfo } from "@/api/user";
import Solider from "@/components/apply/Solider";
import House from "@/components/apply/House";
import HouseHold from "@/components/apply/HouseHold";
import Merchant from "@/components/apply/Merchant";
import Worker from "@/components/apply/Worker";
export default {
  name: "apply",
  data() {
    return {
      relations: [],
      userData: {}
    };
  },
  computed: {
    ...mapGetters({ user: "userInfo" })
  },
  methods: {
    handleSubmit() {
      updateApplyInfo(this.userData)
        .then(res => {
          if (res.data.code !== 200) {
            // this.$Message.error(res.data.msg);
          } else {
            this.$Message.success("监护人信息填写成功");
            this.$router.push("/home/enroll");
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    handleReset() {},
    //获取用户信息
    getUser() {
      getUserInfo(this.user.id)
        .then(res => {
          this.userData = res.data.data;
          this.refreshChildView();
        })
        .catch(() => {
          this.$Message.warning("获取系统数据失败，请稍后再试");
        });
    },
    //刷新子组件页面
    refreshChildView() {
      this.$refs.solider.initData(this.userData.soldierInfo);
      this.$refs.houseInfo.initData(this.userData.houseInfo);
      this.$refs.workerInfo.initData(this.userData.workerInfo);
      this.$refs.householdInfo.initData(this.userData.householdInfo);
      this.$refs.merchantInfo.initData(this.userData.merchantInfo);
    },
    //改变军人材料
    onSoliderChange(param) {
      this.userData = { soldierInfo: param };
      this.refreshChildView();
    },
    //房产信息改变
    onHouseChange(param) {
      this.userData = { houseInfo: param };
      this.refreshChildView();
    },
    //户口信息改变
    onHouseholdChange(param) {
      //   this.userData.householdInfo = param;
      this.userData = { householdInfo: param };
      this.refreshChildView();
    },
    //经商信息改变
    onMerchantChange(param) {
      //  this.userData.merchantInfo = param;
      this.userData = { merchantInfo: param };
      this.refreshChildView();
    },
    //务工信息改变
    onWorkerChange(param) {
      //  this.userData.workerInfo = param;
      this.userData = { workerInfo: param };
      this.refreshChildView();
    },
    queryRelation() {
      getRelation()
        .then(res => {
          this.relations = res.data.data;
        })
        .catch(err => {
          console.log(err);
          this.$Message.warning("获取系统数据失败，请稍后再试");
        });
    }
  },
  mounted() {
    this.getUser();
    this.queryRelation();
  },
  components: {
    Solider,
    House,
    HouseHold,
    Merchant,
    Worker
  }
};
</script>


