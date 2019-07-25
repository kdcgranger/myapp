<style scoped>
.content {
  padding: 0% 5%;
}
.content > .left {
  display: inline-block;
  width: 70%;
}
.content > .right {
  display: inline-block;
  width: 30%;
  text-align: center;
}
img {
  height: 100px;
  width: 200px;
}
.img-group {
  margin-bottom: 20px;
}
.red_font {
  color: red;
  margin: 10px 0;
  display: inline-block;
}
</style>
<template>
  <div class="content">
    <div class="left">
      <Form ref="formData" :model="formData" :rules="ruleValidate" label-position="left" :label-width="120">
        <FormItem label="父亲姓名" prop="fatherName">
          <Input v-model="formData.fatherName"></Input>
        </FormItem>
        <FormItem label="父亲身份证号" prop="fatherNo">
          <Input v-model="formData.fatherNo"></Input>
        </FormItem>
        <FormItem label="父亲电话" prop="fatherPhone">
          <Input v-model="formData.fatherPhone"></Input>
        </FormItem>
        <FormItem label="母亲姓名" prop="motherName">
          <Input v-model="formData.motherName"></Input>
        </FormItem>
        <FormItem label="母亲身份证号" prop="motherNo">
          <Input v-model="formData.motherNo"></Input>
        </FormItem>
        <FormItem label="母亲电话" prop="motherPhone">
          <Input v-model="formData.motherPhone"></Input>
        </FormItem>
        <FormItem label="其他人姓名" prop="otherName">
          <Input v-model="formData.otherName"></Input>
        </FormItem>
        <FormItem label="其他人关系" prop="otherRelation">
          <Select v-model="formData.otherRelation" placeholder="请选择关系">
            <Option :value="relation.relationCode" :key="index" v-for="(relation,index) in relations">{{relation.relationName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="其他人身份证号" prop="otherNo">
          <Input v-model="formData.otherNo"></Input>
        </FormItem>
        <FormItem label="其他电话" prop="otherPhone">
          <Input v-model="formData.otherPhone"></Input>
        </FormItem>
        <FormItem label="请选择申请类型" prop="applyType">
          <RadioGroup v-model="formData.applyType">
            <Radio :label="1">军人</Radio>
            <Radio :label="2">房产</Radio>
            <Radio :label="3">户口</Radio>
            <Radio :label="4">经商</Radio>
            <Radio :label="5">务工</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem :style="{'text-align': 'center'}">
          <Button type="primary" @click="handleSubmit('formData')">下一步</Button>
          <Button @click="handleReset('formData')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
    <div class="right">
      <em class="red_font">* 图片上传限制最大为2M</em>
      <div class="img-group">
        <img :src="birthPhoto">
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onBirth" :on-error="onError">
          <Button>（上传）出生证明</Button>
          <Button class="del_btn" @click="imgDel(1, $event)">删除</Button>
        </Upload>
      </div>
      <div class="img-group">
        <img :src="indexPhoto">
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onIndex" :on-error="onError">
          <Button>（上传）户口本首页</Button>
          <Button class="del_btn" @click="imgDel(2, $event)">删除</Button>
        </Upload>
      </div>
      <div class="img-group">
        <img :src="studentPhoto">
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onStudent" :on-error="onError">
          <Button>（上传）学生页</Button>
          <Button class="del_btn" @click="imgDel(3, $event)">删除</Button>
        </Upload>
      </div>
      <div class="img-group">
        <img :src="otherPhoto">
        <Upload :name="upload.name" :show-upload-list="upload.showUpload" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :action="upload.url" :headers="upload.headers" :accept="upload.accept" :max-size="upload.maxSize" :on-success="onOther" :on-error="onError">
          <Button>（上传）其他页</Button>
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
import { updateUserInfo, getUserInfo } from "@/api/user";
import { getRelation } from "@/api/system";
import { mapState, mapGetters } from "vuex";
import config from "@/config";
export default {
  name: "userInfo",
  data() {
    const validatePhone = (rule, value, callback) => {
      if ((value === "" || value === null) && rule.field === "otherPhone") {
        if (!this.formData) {
          callback();
        } else if (!this.formData.otherRelation) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      } else {
        if (
          !/^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/.test(
            value
          )
        ) {
           callback(new Error("请输入正确的手机号"));
        }
        callback();
      }
    };
    const validateIdCard = (rule, value, callback) => {
      if ((value === "" || value === null) && rule.field === "otherNo") {
        if (!this.formData) {
          callback();
        } else if (!this.formData.otherRelation) {
          callback();
        } else {
          callback(new Error("请输入正确的身份证号"));
        }
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
      modalDel: false,
      toDelImgType: 0,
      formData: {
        fatherName: "",
        fatherNo: "",
        fatherPhone: "",
        motherName: "",
        motherNo: "",
        motherPhone: "",
        otherName: "",
        otherRelation: "",
        otherNo: "",
        otherPhone: "",
        photoBirth: "",
        photoIndex: "",
        photoStudent: "",
        photoOther: "",
        applyType: ""
      },
      relations: [],
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
      },
      ruleValidate: {
        fatherNo: [
          /* {
            required: true,
            message: "身份证号不能为空",
            trigger: "blur"
          }, */
          { 
            validator: validateIdCard,
            trigger: "blur"
          }
        ],
        fatherPhone: [
          /* {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }, */
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        motherNo: [
          /* {
            required: true,
            message: "身份证号不能为空",
            trigger: "blur"
          }, */
          { 
            validator: validateIdCard,
            trigger: "blur"
          }
        ],
        motherPhone: [
          /* {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }, */
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ],
        otherNo: [
          /* {
            required: true,
            message: "身份证号不能为空",
            trigger: "blur"
          }, */
          { 
            validator: validateIdCard,
            trigger: "blur"
          }
        ],
        otherPhone: [
          /* {
            required: true,
            message: "请输入手机号码",
            trigger: "blur"
          }, */
          {
            validator: validatePhone,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapState(["token"]),
    ...mapGetters({ user: "userInfo" }),
    birthPhoto() {
      return convertImage(this.formData.photoBirth);
    },
    indexPhoto() {
      return convertImage(this.formData.photoIndex);
    },
    studentPhoto() {
      return convertImage(this.formData.photoStudent);
    },
    otherPhoto() {
      return convertImage(this.formData.photoOther);
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
          this.formData.photoBirth = ''
          break;
        case 2:
          this.formData.photoIndex = ''
          break;
        case 3:
          this.formData.photoStudent = ''
          break;
        case 4:
          this.formData.photoOther = ''
          break;
      
        default:
          break;
      }
      this.modalDel = false;
    },
    handleMaxSize() {
      this.$Message.error("上传图片的大小不能超过2M");
    },
    handleFormatError() {
      this.$Message.error("只能上传jpg或者png格式的文件");
    },
    onError(error, file, fileList) {
      console.error("-----------------------> 上传失败的原因为 " + error);
      this.$Message.error("上传失败，请稍后再试");
    },
    //出生页
    onBirth(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.formData.photoBirth = response.data;
      }
    },
    //户口本首页
    onIndex(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.formData.photoIndex = response.data;
      }
    },
    //学生页
    onStudent(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.formData.photoStudent = response.data;
      }
    },
    //其他页
    onOther(response, file, fileList) {
      if (response.code === 200) {
        this.$Message.success("上传成功");
        this.formData.photoOther = response.data;
      }
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    handleSubmit(name) {
      if (!this.formData.applyType) {
        this.$Message.error("请选择申请类型");
        return false;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          updateUserInfo(this.formData)
          .then(res => {
            if (res.data.code !== 200) {
              // this.$Message.error(res.data.msg);
            } else {
              this.$Message.success("监护人信息填写成功");
              this.$router.push({
                path: "/home/applySingle",
                query: {
                  type: this.formData.applyType
                }
              });
            }
          })
          .catch(err => {
            console.error(err);
          });
        }
      })
    }
  },
  mounted() {
    getRelation()
      .then(res => {
        this.relations = res.data.data;
      })
      .catch(err => {
        console.log(err);
        this.$Message.warning("获取系统数据失败，请稍后再试");
      });
    getUserInfo(this.user.id)
      .then(res => {
        this.formData = res.data.data.guarderInfo;
        this.formData.applyType = res.data.data.applyInfo.applyType;
      })
      .catch(err => {
        console.log(err);
        this.$Message.warning("获取系统数据失败，请稍后再试");
      });
  }
};
</script>

