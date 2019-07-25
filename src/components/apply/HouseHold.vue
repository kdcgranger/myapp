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
    <Form ref="formData" :model="formData" :rules="ruleValidate" label-position="left" :label-width="100">
      <FormItem label="户口首页地址" prop="householdAddr">
        <Input v-model="formData.householdAddr" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="户主姓名" prop="householdName">
        <Input v-model="formData.householdName" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="户主身份证号" prop="householdNo">
        <Input v-model="formData.householdNo" @on-change="onChange"></Input>
      </FormItem>
      <FormItem label="与学生的关系" prop="sysRelation">
        <Select v-model="formData.sysRelation" placeholder="请选择关系" @on-change="onChange">
          <Option :value="relation.relationCode" :key="index" v-for="(relation,index) in relations">{{relation.relationName}}</Option>
        </Select>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "houseHold",
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
      formData: {
        householdAddr: "",
        householdName: "",
        householdNo: "",
        sysRelation: ""
      },
      ruleValidate: {
        householdNo: [
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
  computed: {},
  methods: {
    initData(data) {
      if (typeof data === "undefined" || data === null) {
        this.formData = {
          householdAddr: "",
          householdName: "",
          householdNo: "",
          sysRelation: ""
        };
      } else {
        this.formData = data;
      }
    },
    onChange() {
      this.$emit("on-change", this.formData);
    }
  },
  mounted() {}
};
</script>


