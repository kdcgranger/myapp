<style scoped>
.guard > .image-content,
.house > .image-content {
  display: inline-block;
  width: 25%;
  height: 150px;
  border: #ccc solid thin;
  text-align: center;
}
.house > .image-content {
  width: 20%;
}
.image-content > img {
  display: inline-block;
  width: 100%;
  height: 150px;
}
.ivu-card > .ivu-card-body > p {
  height: 30px;
  line-height: 30px;
}
.ivu-card > .ivu-card-body > p > span:first-of-type {
  margin-right: 20px;
}
.buttons {
  padding: 20px 0 20px 40%;
}
</style>
<template>
  <div>
    <Card>
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        学生简介
      </p>
      <a href="#" slot="extra" @click.prevent="changeLimit" v-if="sysuser.type!==1&&sysuser.type!==2">
        <Icon type="ios-loop-strong"></Icon>
        返回
      </a>
      <p><span>学生名字 :</span><span>{{sysuser.realName}}</span></p>
      <p><span>学生身份证号 :</span><span>{{sysuser.idCard}}</span></p>
      <p><span>学生性别 :</span><span>{{sysuser.sex}}</span></p>
      <p><span>学生类别 :</span><span>{{sysuser.role}}</span></p>
      <p><span>学籍号码 :</span><span>{{sysuser.studentNo}}</span></p>
      <p><span>申请类型 :</span><span>{{apply.type}}</span></p>
    </Card>
    <Card>
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        监护人信息
      </p>
      <p><span>父亲名字 :</span><span>{{guarder.fatherName}}</span></p>
      <p><span>父亲身份证号 :</span><span>{{guarder.fatherNo}}</span></p>
      <p><span>父亲电话 :</span><span>{{guarder.fatherPhone}}</span></p>
      <p><span>母亲名字 :</span><span>{{guarder.motherName}}</span></p>
      <p><span>母亲身份证号 :</span><span>{{guarder.motherNo}}</span></p>
      <p><span>母亲电话 :</span><span>{{guarder.motherPhone}}</span></p>
      <p><span>其他人名字 :</span><span>{{guarder.otherName}}</span></p>
      <p><span>与学生关系 :</span><span>{{transRelation(guarder.otherRelation)}}</span></p>
      <p><span>其他人身份证号 :</span><span>{{guarder.otherNo}}</span></p>
      <p><span>其他人电话 :</span><span>{{guarder.otherPhone}}</span></p>
      <div class="guard">
        <div class="image-content">
          <img :src="guarder.photoBirth" @click="showImageTool(guarder.photoBirth)">
        </div>
        <div class="image-content">
          <img :src="guarder.photoIndex" @click="showImageTool(guarder.photoIndex)">
        </div>
        <div class="image-content">
          <img :src="guarder.photoStudent" @click="showImageTool(guarder.photoStudent)">
        </div>
        <div class="image-content">
          <img :src="guarder.photoOther" @click="showImageTool(guarder.photoOther)">
        </div>
      </div>
    </Card>
    <Card v-if="apply.applyType===1">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        学位申请【军人】
      </p>
      <p><span>所属部队 :</span><span>{{soldier.army}}</span></p>
      <p><span>证件编号 :</span><span>{{soldier.armyNo}}</span></p>
      <div class="guard">
        <div class="image-content">

        </div>
        <div class="image-content">
          <img :src="soldier.armyPhoto" @click="showImageTool(soldier.armyPhoto)">
        </div>
        <div class="image-content">
          <img :src="soldier.armyPhotoTicket" @click="showImageTool(soldier.armyPhotoTicket)">
        </div>
        <div class="image-content">

        </div>
      </div>
    </Card>
    <Card v-if="apply.applyType===2">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        学位申请【房产】
      </p>
      <p><span>房产证地址 :</span><span>{{house.houseAddr}}</span></p>
      <p><span>房产编号 :</span><span>{{house.houseNo}}</span></p>
      <p><span>房屋所有人姓名 :</span><span>{{house.houseOwer}}</span></p>
      <p><span>房屋所有人身份证号码 :</span><span>{{house.houseCard}}</span></p>
      <p><span>与学生关系 :</span><span>{{transRelation(house.sysRelation)}}</span></p>
      <div class="house">
        <div class="image-content">
          <img :src="house.housePhotoAddr" @click="showImageTool(house.housePhotoAddr)">
        </div>
        <div class="image-content">
          <img :src="house.housePhotoNo" @click="showImageTool(house.housePhotoNo)">
        </div>
        <div class="image-content">
          <img :src="house.photoRelationOne" @click="showImageTool(house.photoRelationOne)">
        </div>
        <div class="image-content">
          <img :src="house.photoRelationTwo" @click="showImageTool(house.photoRelationTwo)">
        </div>
        <div class="image-content">
          <img :src="house.photoOtherData" @click="showImageTool(house.photoOtherData)">
        </div>
      </div>
    </Card>
    <Card v-if="apply.applyType===3">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        学位申请【户口】
      </p>
      <p><span>户口首页地址 :</span><span>{{houseHold.householdAddr}}</span></p>
      <p><span>户主姓名 :</span><span>{{houseHold.householdName}}</span></p>
      <p><span>户主身份证号 :</span><span>{{houseHold.householdNo}}</span></p>
      <p><span>与学生关系 :</span><span>{{transRelation(houseHold.sysRelation)}}</span></p>

    </Card>
    <Card v-if="apply.applyType===4">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        学位申请【经商】
      </p>
      <p><span>经商地址 :</span><span>{{merchant.merchantAdd}}</span></p>
      <p><span>营业执照编码 :</span><span>{{merchant.merchantNo}}</span></p>
      <p><span>法人姓名 :</span><span>{{merchant.merchantName}}</span></p>
      <p><span>与学生关系 :</span><span>{{transRelation(merchant.sysRelation)}}</span></p>
      <div class="guard">
        <div class="image-content">

        </div>
        <div class="image-content">
          <img :src="merchant.photoLicence" @click="showImageTool(merchant.photoLicence)">
        </div>
        <div class="image-content">
          <img :src="merchant.photoFace" @click="showImageTool(merchant.photoFace)">
        </div>
        <div class="image-content">

        </div>
      </div>
    </Card>
    <Card v-if="apply.applyType===5">
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        学位申请【务工】
      </p>
      <p><span>务工单位名称 :</span><span>{{worker.workerCompany}}</span></p>
      <p><span>务工单位地址 :</span><span>{{worker.workerAddr}}</span></p>
      <p><span>务工者姓名 :</span><span>{{worker.workerName}}</span></p>
      <p><span>与学生关系 :</span><span>{{transRelation(worker.sysRelation)}}</span></p>
      <div class="guard">
        <div class="image-content">
          <img :src="worker.pactPhotoAddr" @click="showImageTool(worker.pactPhotoAddr)">
        </div>
        <div class="image-content">
          <img :src="worker.pactPhotoSign" @click="showImageTool(worker.pactPhotoSign)">
        </div>
        <div class="image-content">
          <img :src="worker.photoSocialSecurity" @click="showImageTool(worker.photoSocialSecurity)">
        </div>
        <div class="image-content">
          <img :src="worker.photoOtherData" @click="showImageTool(worker.photoOtherData)">
        </div>
      </div>
    </Card>
    <div class="buttons" v-if="role==6 || role==5 || role==4 || role==3">
      <Button type="primary" @click="approve" v-if="role==4 || role==3">初审通过</Button>
      <Button type="primary" @click="approve" v-if="role==5">复审通过</Button>
      <Button type="warning" @click="approveNot" style="margin: 0 10px" v-if="role==4 || role==3">初审不通过</Button>
      <Button type="warning" @click="approveNot" v-if="role==5" style="margin: 0 10px">复审不通过</Button>
      <!-- <Button type="error" @click="disMiss" v-if="role==5 || role==4 || role==3">驳回修改</Button> -->
      <Button type="primary" @click="goBack">返回</Button>
    </div>
    <Dismiss ref="dismiss" name="dismiss" @ok="dismissAllotConfirm"></Dismiss>
    <div v-if="imageToolShow">
      <ImageTool ref="imageTool" name="imageTool" :url="imgUrl" @close="imageToolHide"></ImageTool>
    </div>
    <Confirm ref="submitConfirm" name="submitConfirm" :title="confirmTitle" :confirmTxt="confirmTxt" @ok="dismissAllot"></Confirm>
  </div>
</template>
<script>
import { getUserInfo } from "@/api/user";
import { convertImage, convertApplyType } from "@/lib/util";
import Dismiss from "@/components/allot/Dismiss";
import ImageTool from "@/components/common/ImageTool";
import { getRelation } from "@/api/system";
import Confirm from "@/components/common/Confirm";
import {
  dismissApply,
  approveApply
} from "@/api/app.js";
export default {
  name: "userDetail",
  props: {
    userId: [String],
    pageNum: [String, Number],
    pageSize: [String, Number]
  },
  data() {
    return {
      confirmTitle: '驳回确认',
      confirmTxt: '将要对学生资料进行驳回，是否确认继续？',
      params: {},
      relations: [],
      studentId: "",
      user: {
        sysuser: {},
        guarderInfo: {},
        soldierInfo: {},
        houseInfo: {},
        householdInfo: {},
        workerInfo: {},
        merchantInfo: {}
      },
      selectedUserId: [],
      approveNotFlag: false,
      role: localStorage.getItem("role"),
      imgUrl: "",
      imageToolShow: false
    };
  },
  computed: {
    sysuser() {
      let user = $.extend({}, this.user.sysuser);
      user.role = user.type === 1 ? "小学" : "中学";
      user.sex = user.sex ? "男" : "女";
      return user;
    },
    //监护人信息
    guarder() {
      let guarderInfo = $.extend({}, this.user.guarderInfo);
      guarderInfo.photoBirth = convertImage(guarderInfo.photoBirth);
      guarderInfo.photoIndex = convertImage(guarderInfo.photoIndex);
      guarderInfo.photoStudent = convertImage(guarderInfo.photoStudent);
      guarderInfo.photoOther = convertImage(guarderInfo.photoOther);
      return guarderInfo;
    },
    //军人信息
    soldier() {
      let soldierInfo = $.extend({}, this.user.soldierInfo);
      soldierInfo.armyPhoto = convertImage(soldierInfo.armyPhoto);
      soldierInfo.armyPhotoTicket = convertImage(soldierInfo.armyPhotoTicket);
      return soldierInfo;
    },
    //房产信息
    house() {
      let houseInfo = $.extend({}, this.user.houseInfo);
      houseInfo.housePhotoAddr = convertImage(houseInfo.housePhotoAddr);
      houseInfo.housePhotoNo = convertImage(houseInfo.housePhotoNo);
      houseInfo.photoRelationOne = convertImage(houseInfo.photoRelationOne);
      houseInfo.photoRelationTwo = convertImage(houseInfo.photoRelationTwo);
      houseInfo.photoOtherData = convertImage(houseInfo.photoOtherData);
      return houseInfo;
    },
    //户口信息
    houseHold() {
      let householdInfo = $.extend({}, this.user.householdInfo);
      return householdInfo;
    },
    //经商
    merchant() {
      let merchantInfo = $.extend({}, this.user.merchantInfo);
      merchantInfo.photoLicence = convertImage(merchantInfo.photoLicence);
      merchantInfo.photoFace = convertImage(merchantInfo.photoFace);
      return merchantInfo;
    },
    //务工
    worker() {
      let workerInfo = $.extend({}, this.user.workerInfo);
      workerInfo.pactPhotoAddr = convertImage(workerInfo.pactPhotoAddr);
      workerInfo.pactPhotoSign = convertImage(workerInfo.pactPhotoSign);
      workerInfo.photoSocialSecurity = convertImage(
        workerInfo.photoSocialSecurity
      );
      workerInfo.photoOtherData = convertImage(workerInfo.photoOtherData);
      return workerInfo;
    },
    //申请信息
    apply() {
      let applyInfo = $.extend({}, this.user.applyInfo);
      applyInfo.type = convertApplyType(applyInfo.applyType);
      return applyInfo;
    }
  },
  methods: {
    transRelation(code) {
      let relationName = ''
      this.relations.forEach(e => {
        if (e.relationCode === code) {
          relationName = e.relationName
        }
      })
      return relationName
    },
    queryUserInfo() {
      getUserInfo(this.studentId)
        .then(res => {
          if (res.data.code === 200) {
            this.user = res.data.data;
          }
        })
        .catch(err => {
          console.error(err);
          this.$Message.error("获取系统信息出错");
        });
    },
    changeLimit() {
      this.$router.push("/admin/allot");
    },
    disMiss() {
      this.selectedUserId = [this.sysuser.id];
      this.showDismissDialog();
      this.approveNotFlag = false;
    },
    goBack () {
      this.$router.push({
        path: "/admin/allot",
        query: {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      });
    },
    showDismissDialog() {
      this.$refs.dismiss.show();
    },
    dismissAllotConfirm (param) {
      this.params = param
      this.$refs.submitConfirm.show()
    },
    dismissAllot() {
      let data
      if (Number(this.role) === 5) {
        data = {
          checkReason: this.params.checkReason + this.approveNotFlag ? "（复审不通过）" : "",
          checkResult: 6,
          studentIds: this.selectedUserId
        };
      } else if (Number(this.role) === 3 || Number(this.role) === 4) {
        data = {
          checkReason: this.params.checkReason + this.approveNotFlag ? "（初审不通过）" : "",
          checkResult: 5,
          studentIds: this.selectedUserId
        };
      }
      dismissApply(data)
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.success("驳回成功");
          }
          //刷新界面
          this.search();
        })
        .catch(() => {
          //this.$Message.error("操作失败");
        });
    },
    approve() {
      approveApply([this.sysuser.id])
      .then(res => {
        if (res.data.code === 200) {
          if (Number(this.role) === 5) {
            this.$Message.success("复审通过成功");
          } else {
            this.$Message.success("初审通过成功");
          }
        }
        //刷新界面
        this.search();
      })
      .catch(() => {
        //this.$Message.error("操作失败");
      });
    },
    approveNot() {
      this.selectedUserId = [this.sysuser.id];
      this.showDismissDialog();
      this.approveNotFlag = true;
    },
    showImageTool(url) {
      this.imageToolShow = true;
      this.imgUrl = url;
      //this.$refs.imageTool.url = url;
    },
    imageToolHide() {
      console.log(2)
      this.imageToolShow = false;
    },
    getRelation () {
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
    if (typeof this.userId !== "undefined") {
      localStorage.setItem("userId", this.userId);
    }
    this.studentId =
      typeof this.userId !== "undefined"
        ? this.userId
        : localStorage.getItem("userId");

    this.queryUserInfo();
    /* $("img").click(function() {
      this.$refs.imageTool.$refs.show = true;
    }) */
    /* $("body").click(function () {
      $(".image_tool").hide();
    }) */
    this.getRelation()
  },
  components: {
    Dismiss,
    ImageTool,
    Confirm
  }
};
</script>


