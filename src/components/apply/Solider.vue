<style scoped>
.content {
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 2%;
  text-align: center;
}
img {
  height: 200px;
  width: 350px;
}
.red_font {
  color: red;
  margin: 10px 0;
  display: inline-block;
}
</style>
<template>
  <div class="content">
    <Form ref="armyData" :model="armyData" label-position="left" :label-width="100">
      <FormItem label="所属部队" prop="army">
        <Input v-model="armyData.army" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="证件编号" prop="armyNo">
        <Input v-model="armyData.armyNo" @on-change="onChange"></Input>
      </FormItem>
    </Form>
    <em class="red_font">* 图片上传限制最大为2M</em>
    <Row class="images">
      <Col span="12">
      <img :src="armyPhoto" alt="证件照" />
      <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onArmy" :on-error="onError">
        <Button>（上传）证件照</Button>
          <Button class="del_btn" @click="imgDel(1, $event)">删除</Button>
      </Upload>
      </Col>
      <Col span="12">
      <img :src="ticketPhoto" alt="部队证明材料" />
      <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onTicket" :on-error="onError">
        <Button>（上传）部队证明材料</Button>
          <Button class="del_btn" @click="imgDel(2, $event)">删除</Button>
      </Upload>
      </Col>
    </Row>
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
  name: "solider",
  data() {
    return {
      modalDel: false,
      toDelImgType: 0,
      armyData: {
        army: "",
        armyNo: "",
        armyPhoto: "",
        armyPhotoTicket: ""
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
  computed: {
    ...mapState(["token"]),
    armyPhoto() {
      return convertImage(this.armyData.armyPhoto);
    },
    ticketPhoto() {
      return convertImage(this.armyData.armyPhotoTicket);
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
          this.armyData.armyPhoto = ''
          break;
        case 2:
          this.armyData.armyPhotoTicket = ''
          break;
      
        default:
          break;
      }
      this.modalDel = false;
    },
    initData(data) {
      if (typeof data === "undefined" || data === null) {
        this.armyData = {
          army: "",
          armyNo: "",
          armyPhoto: "",
          armyPhotoTicket: ""
        };
      } else {
        this.armyData = data;
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
      this.$emit("on-change", this.armyData);
    },
    onArmy(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.armyData.armyPhoto = response.data;
      }
      this.$emit("on-change", this.armyData);
    },
    onTicket(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.armyData.armyPhotoTicket = response.data;
      }
      this.$emit("on-change", this.armyData);
    }
  }
};
</script>


