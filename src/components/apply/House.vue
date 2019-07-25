<style scoped>
.content {
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 2%;
  text-align: center;
}
img {
  height: 200px;
  width: 200px;
}
.images > .image {
  display: inline-block;
  width: 30%;
  padding: 10px;
  border: 1px solid #dedede;
  margin: 10px;
  min-width: 350px;
}
.red_font {
  color: red;
  margin: 10px 0;
  display: inline-block;
}
</style>
<template>
  <div class="content">
    <Form ref="houseData" :model="houseData" :rules="ruleValidate" label-position="left" :label-width="140">
      <FormItem label="房产证地址" prop="houseAddr">
        <Input v-model="houseData.houseAddr" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="房产编号/购房合同号" prop="houseNo">
        <Input v-model="houseData.houseNo" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="房屋所有人姓名" prop="houseOwer">
        <Input v-model="houseData.houseOwer" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="房屋所有人身份证号" prop="houseCard">
        <Input v-model="houseData.houseCard" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="与学生的关系" prop="sysRelation">
        <Select v-model="houseData.sysRelation" placeholder="请选择关系" @on-change="onChange">
          <Option :value="relation.relationCode" :key="index" v-for="(relation,index) in relations">{{relation.relationName}}</Option>
        </Select>
      </FormItem>
    </Form>
    <em class="red_font">* 图片上传限制最大为2M</em>
    <div class="images">
      <div class="image">
        <img :src="addrPhoto" alt="房产地址页" />
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onHousePhotoAddr" :on-error="onError">
          <Button>（上传）房产证（或购房合同）地址页</Button>
          <Button class="del_btn" @click="imgDel(1, $event)">删除</Button>
        </Upload>
      </div>
      <div class="image">
        <img :src="noPhoto" alt="房产证编号页" />
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onHousePhotoNo" :on-error="onError">
          <Button>（上传）房产证号（或购房合同备案号）页</Button>
          <Button class="del_btn" @click="imgDel(2, $event)">删除</Button>
        </Upload>
      </div>
      <div class="image">
        <img :src="onePhoto" alt="关系证明一" />
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onPhotoRelationOne" :on-error="onError">
          <Button>（上传）关系证明一</Button>
          <Button class="del_btn" @click="imgDel(3, $event)">删除</Button>
        </Upload>
      </div>
      <div class="image">
        <img :src="twoPhoto" alt="关系证明二" />
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onPhotoRelationTwo" :on-error="onError">
          <Button>（上传）关系证明二</Button>
          <Button class="del_btn" @click="imgDel(4, $event)">删除</Button>
        </Upload>
      </div>
      <div class="image">
        <img :src="otherPhoto" alt="其他材料" />
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onPhotoOtherData" :on-error="onError">
          <Button>（上传）其他材料</Button>
          <Button class="del_btn" @click="imgDel(5, $event)">删除</Button>
        </Upload>
      </div>
    </div>
    <Modal v-model="modalDel" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>删除确认</span>
        </p>
        <div style="text-align:center">
            <p>是否确认删除图片？</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long @click="imgDelConfirm">删除</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import { convertImage } from "@/lib/util";
import config from "@/config";
import { mapState } from "vuex";
export default {
  name: "house",
  data() {
    const validateIdCard = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入身份证号"));
      } else {
        if (!/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(value)) {
           callback(new Error("请输入正确的身份证号"));
        } else {
          if (value.length === 18) {
            var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
            var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
            var idCardWiSum = 0;
            for (var i = 0; i < 17; i++) {
                idCardWiSum += value.substring(i, i + 1) * idCardWi[i];
            }
            var idCardMod = idCardWiSum % 11;
            var idCardLast = value.substring(17);
            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod === 2) {
                if (idCardLast === "X" || idCardLast === "x") {
                    callback();
                } else {
                    callback(new Error("请输入正确的身份证号"));
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (Number(idCardLast) === idCardY[idCardMod]) {
                    callback();
                } else {
                    callback(new Error("请输入正确的身份证号"));
                }
            }
          }
        }
      }
    };
    return {
      uploadList: ['test'],
      modalDel: false,
      toDelImgType: 0,
      houseData: {
        userId: "",
        houseAddr: "",
        houseNo: "",
        houseOwer: "",
        houseCard: "",
        sysRelation: "",
        housePhotoAddr: "",
        housePhotoNo: "",
        photoRelationOne: "",
        photoRelationTwo: "",
        photoOtherData: "",
        householdNo: ""
      },
      upload: {
        // accept: ".jpg,.JPG,.JPEG,.jpeg,.png,.PNG",
        accept: '',
        headers: {
          token: this.token
        },
        data: '123',
        url: config.fileUploadUrl,
        maxSize: 2048,
        name: "multipartFile",
        showUpload: false
      },
      ruleValidate: {
        houseCard: [
          { 
            validator: validateIdCard,
            trigger: "blur"
          }
        ]
      }
    };
  },
  props: {
    relations: {
      type: Array,
      require: false
    }
  },
  computed: {
    ...mapState(["token"]),
    addrPhoto() {
      return convertImage(this.houseData.housePhotoAddr);
    },
    noPhoto() {
      return convertImage(this.houseData.housePhotoNo);
    },
    onePhoto() {
      return convertImage(this.houseData.photoRelationOne);
    },
    twoPhoto() {
      return convertImage(this.houseData.photoRelationTwo);
    },
    otherPhoto() {
      return convertImage(this.houseData.photoOtherData);
    }
  },
  methods: {
    imgDel (type, e) {
      this.modalDel = true;
      this.toDelImgType = type
      e.stopPropagation()
    },
    imgDelConfirm () {
      switch (this.toDelImgType) {
        case 1:
          this.houseData.housePhotoAddr = ''
          break;
        case 2:
          this.houseData.housePhotoNo = ''
          break;
        case 3:
          this.houseData.photoRelationOne = ''
          break;
        case 4:
          this.houseData.photoRelationTwo = ''
          break;
      
        default:
          this.houseData.photoOtherData = ''
          break;
      }
      this.modalDel = false;
    },
    initData(data) {
      if (typeof data === "undefined" || data === null) {
        this.houseData = {
          userId: "",
          houseAddr: "",
          houseNo: "",
          houseOwer: "",
          houseCard: "",
          sysRelation: "",
          housePhotoAddr: "",
          housePhotoNo: "",
          photoRelationOne: "",
          photoRelationTwo: "",
          photoOtherData: "",
          householdNo: ""
        };
      } else {
        this.houseData = data;
      }
    },
    onChange() {
      this.$emit("on-change", this.houseData);
    },
    handleMaxSize() {
      this.$Message.error("上传图片的大小不能超过2M");
    },
    handleFormatError() {
      this.$Message.error("只能上传jpg或者png格式的文件");
    },
    onError() {
      this.$Message.error("上传失败，请稍后再试");
    },
    onHousePhotoAddr(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.houseData.housePhotoAddr = response.data;
      }
      this.onChange();
    },
    onHousePhotoNo(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.houseData.housePhotoNo = response.data;
      }
      this.onChange();
    },
    onPhotoRelationOne(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.houseData.photoRelationOne = response.data;
      }
      this.onChange();
    },
    onPhotoRelationTwo(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.houseData.photoRelationTwo = response.data;
      }
      this.onChange();
    },
    onPhotoOtherData(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.houseData.photoOtherData = response.data;
      }
      this.onChange();
    },
    handleBeforeUpload (file) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      const _this = this
      reader.onloadend = function (e) {
        file.url = reader.result
        _this.uploadList = []
        _this.uploadList.push(file.url)
        _this.upload.data = file.url
        console.log(file)
      }
    }
  },
  mounted() {}
};
</script>


