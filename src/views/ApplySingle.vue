<style scoped>
.tail {
  text-align: center;
  margin-top: 50px;
}
</style>
<template>
  <div>
    <div v-if="regType === 1">
      <Solider ref="solider" name="solider" @on-change="onSoliderChange"></Solider>
    </div>
    <div v-if="regType === 2">
      <House ref="houseInfo" name="houseInfo" :relations="relations" @on-change="onHouseChange"></House>
    </div>
    <div v-if="regType === 3">
      <HouseHold ref="householdInfo" name="householdInfo" :relations="relations" @on-change="onHouseholdChange"></HouseHold>
    </div>
    <div v-if="regType === 4">
      <Merchant ref="merchantInfo" name="merchantInfo" :relations="relations" @on-change="onMerchantChange"></Merchant>
    </div>
    <div v-if="regType === 5">
      <Worker ref="workerInfo" name="workerInfo" :relations="relations" @on-change="onWorkerChange"></Worker>
    </div>
    <div class="tail">
      <Button type="primary" @click="handleSubmit('formValidate')">提交申请</Button>
      <Button @click="handleReset()" style="margin-left: 8px">重置</Button>
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
  name: "applySingle",
  data() {
    return {
      relations: [],
      userData: {},
      regType: this.$route.query.type
    };
  },
  computed: {
    ...mapGetters({ user: "userInfo" })
  },
  methods: {
    handleSubmit() {
      var vaildObj;
      switch (this.regType) {
        case 1:
          vaildObj = this.$refs.solider.$refs.armyData;
          break;

        case 2:
          vaildObj = this.$refs.houseInfo.$refs.houseData;
          break;

        case 3:
          vaildObj = this.$refs.householdInfo.$refs.formData;
          break;

        case 4:
          vaildObj = this.$refs.merchantInfo.$refs.formData;
          break;
          
        case 5:
          vaildObj = this.$refs.workerInfo.$refs.formData;
          break;
      
        default:
          vaildObj = this.$refs.solider.$refs.armyData;
          break;
      }
      vaildObj.validate(valid => {
        if (valid) {
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
        }
      })
    },
    handleReset() {
      switch (this.regType) {
        case 1:
          this.$refs.solider.$refs.armyData.resetFields()
          break;

        case 2:
          this.$refs.houseInfo.$refs.houseData.resetFields();
          break;

        case 3:
          this.$refs.householdInfo.$refs.formData.resetFields();
          break;

        case 4:
          this.$refs.merchantInfo.$refs.formData.resetFields();
          break;
          
        case 5:
          this.$refs.workerInfo.$refs.formData.resetFields();
          break;
      
        default:
          break;
      }
      //this.$refs[name].resetFields();
    },
    //获取用户信息
    getUser() {
      getUserInfo(this.user.id)
        .then(res => {
          this.userData = res.data.data;
          this.refreshChildView();
        })
        .catch(err => {
          console.log(err)
          this.$Message.warning("获取系统数据失败，请稍后再试");
        });
    },
    //刷新子组件页面
    refreshChildView() {
      switch (this.regType) {
        case 1:
          this.$refs.solider.initData(this.userData.soldierInfo);
          break;

        case 2:
          this.$refs.houseInfo.initData(this.userData.houseInfo);
          break;

        case 5:
          this.$refs.workerInfo.initData(this.userData.workerInfo);
          break;

        case 3:
          this.$refs.householdInfo.initData(this.userData.householdInfo);
          break;
          
        case 4:
          this.$refs.merchantInfo.initData(this.userData.merchantInfo);
          break;
      
        default:
          break;
      }
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


