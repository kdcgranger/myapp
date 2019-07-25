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
  width: 25%;
  padding: 10px;
  border: 1px solid #dedede;
  margin: 10px;
  min-width: 280px;
}
.red_font {
  color: red;
  margin: 10px 0;
  display: inline-block;
}
</style>
<template>
  <div class="content">
    <Form ref="formData" :model="formData" label-position="left" :label-width="140">
      <FormItem label="务工者姓名" prop="workerName">
        <Input v-model="formData.workerName" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="务工单位地址" prop="workerAddr">
        <Input v-model="formData.workerAddr" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="务工单位名称" prop="workerCompany">
        <Input v-model="formData.workerCompany" @on-change="onChange"></Input>
      </FormItem>
      <!-- <FormItem label="房屋所有人身份证号" prop="armyNo">
        <Input v-model="formData.armyNo" @on-change="onChange"></Input>
      </FormItem> -->
      <FormItem label="与学生的关系" prop="sysRelation">
        <Select v-model="formData.sysRelation" placeholder="请选择关系" @on-change="onChange">
          <Option :value="relation.relationCode" :key="index" v-for="(relation,index) in relations">{{relation.relationName}}</Option>
        </Select>
      </FormItem>
    </Form>
    <em class="red_font">* 图片上传限制最大为2M</em>
    <div class="images">
      <div class="image">
        <img :src="pactPhoto" alt="劳动合同地址页" />
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onPactPhotoAddr" :on-error="onError">
          <Button>（上传）劳动合同地址页</Button>
          <Button class="del_btn" @click="imgDel(1, $event)">删除</Button>
        </Upload>
      </div>
      <div class="image">
        <img :src="signPhoto" alt="合同双方签字页" />
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onPactPhotoSign" :on-error="onError">
          <Button>（上传）合同双方签字页</Button>
          <Button class="del_btn" @click="imgDel(2, $event)">删除</Button>
        </Upload>
      </div>
      <div class="image">
        <img :src="socialPhoto" alt="社保证明" />
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onPhotoSocialSecurity" :on-error="onError">
          <Button>（上传）社保证明</Button>
          <Button class="del_btn" @click="imgDel(3, $event)">删除</Button>
        </Upload>
      </div>
      <div class="image">
        <img :src="otherPhoto" alt="其他材料" />
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onPhotoOtherData" :on-error="onError">
          <Button>（上传）其他材料</Button>
          <Button class="del_btn" @click="imgDel(4, $event)">删除</Button>
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
  name: "worker",
  data() {
    return {
      modalDel: false,
      toDelImgType: 0,
      formData: {
        userId: "",
        workerName: "",
        workerAddr: "",
        workerCompany: "",
        sysRelation: "",
        pactPhotoAddr: "",
        pactPhotoSign: "",
        photoSocialSecurity: "",
        photoOtherData: ""
      },
      upload: {
        // accept: ".jpg,.JPG,.JPEG,.jpeg,.png,.PNG",
        accept: '',
        headers: {
          token: this.token
        },
        url: config.fileUploadUrl,
        maxSize: 2048,
        name: "multipartFile",
        showUpload: false
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
    pactPhoto() {
      return convertImage(this.formData.pactPhotoAddr);
    },
    signPhoto() {
      return convertImage(this.formData.pactPhotoSign);
    },
    socialPhoto() {
      return convertImage(this.formData.photoSocialSecurity);
    },
    otherPhoto() {
      return convertImage(this.formData.photoOtherData);
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
          this.formData.pactPhotoAddr = ''
          break;
        case 2:
          this.formData.pactPhotoSign = ''
          break;
        case 3:
          this.formData.photoSocialSecurity = ''
          break;
        case 4:
          this.formData.photoOtherData = ''
          break;
      
        default:
          break;
      }
      this.modalDel = false;
    },
    initData(data) {
      if (typeof data === "undefined" || data === null) {
        this.formData = {
          userId: "",
          workerName: "",
          workerAddr: "",
          workerCompany: "",
          sysRelation: "",
          pactPhotoAddr: "",
          pactPhotoSign: "",
          photoSocialSecurity: "",
          photoOtherData: ""
        };
      } else {
        this.formData = data;
      }
    },
    onChange() {
      this.$emit("on-change", this.formData);
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
    onPactPhotoAddr(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.formData.pactPhotoAddr = response.data;
      }
      this.onChange();
    },
    onPactPhotoSign(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.formData.pactPhotoSign = response.data;
      }
      this.onChange();
    },
    onPhotoSocialSecurity(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.formData.photoSocialSecurity = response.data;
      }
      this.onChange();
    },
    onPhotoOtherData(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.formData.photoOtherData = response.data;
      }
      this.onChange();
    }
  },
  mounted() {}
};
</script>


