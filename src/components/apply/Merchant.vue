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
  width: 50%;
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
      <FormItem label="经商地址" prop="merchantAdd">
        <Input v-model="formData.merchantAdd" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="营业执照编号" prop="merchantNo">
        <Input v-model="formData.merchantNo" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="法人姓名" prop="merchantName">
        <Input v-model="formData.merchantName" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="与学生的关系" prop="sysRelation">
        <Select v-model="formData.sysRelation" placeholder="请选择关系" @on-change="onChange">
          <Option :value="relation.relationCode" :key="index" v-for="(relation,index) in relations">{{relation.relationName}}</Option>
        </Select>
      </FormItem>
    </Form>
    <em class="red_font">* 图片上传限制最大为2M</em>
    <div class="images">
      <div class="image">
        <img :src="licencePhoto" alt="营业执照" />
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onPhotoLicence" :on-error="onError">
          <Button>（上传）营业执照</Button>
          <Button class="del_btn" @click="imgDel(1, $event)">删除</Button>
        </Upload>
      </div>
      <div class="image">
        <img :src="facePhoto" alt="营业场所外观照片" />
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onPhotoFace" :on-error="onError">
          <Button>（上传）营业场所外观（含名称）</Button>
          <Button class="del_btn" @click="imgDel(2, $event)">删除</Button>
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
import { mapState } from "vuex";
import config from "@/config";
export default {
  name: "merchant",
  data() {
    return {
      modalDel: false,
      toDelImgType: 0,
      formData: {
        userId: "",
        merchantAdd: "",
        merchantNo: "",
        merchantName: "",
        sysRelation: "",
        photoLicence: "",
        photoFace: ""
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
    licencePhoto() {
      return convertImage(this.formData.photoLicence);
    },
    facePhoto() {
      return convertImage(this.formData.photoFace);
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
          this.formData.photoLicence = ''
          break;
        case 2:
          this.formData.photoFace = ''
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
          merchantAdd: "",
          merchantNo: "",
          merchantName: "",
          sysRelation: "",
          photoLicence: "",
          photoFace: ""
        };
      } else {
        this.formData = data;
      }
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
    onChange() {
      this.$emit("on-change", this.formData);
    },
    onPhotoLicence(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.formData.photoLicence = response.data;
      }
      this.onChange();
    },
    onPhotoFace(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.formData.photoFace = response.data;
      }
      this.onChange();
    }
  },
  mounted() {}
};
</script>


