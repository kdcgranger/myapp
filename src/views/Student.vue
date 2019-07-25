<style scoped>
.tail {
  margin-top: 20px;
}
</style>
<template>
  <div>
    <Form ref="formData" :model="formData" inline>
      <FormItem prop="学生名字">
        <Input type="text" v-model="formData.studentName" placeholder="学生名字">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="身份证号">
        <Input type="text" v-model="formData.idCard" placeholder="身份证号">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit">搜索</Button>
      </FormItem>
    </Form>
    <Table stripe :columns="columns" :data="tableData"></Table>
    <Row class="tail">
      <Col span="18">

      </Col>
      <Col span="6" push="18">
      <Page :total="pager.total" show-total @on-change="onPagerChange" />
      </Col>
    </Row>
  </div>
</template>
<script>
import { enrollStudent } from "@/api/app";
import { convertApplyType, convertApplyStatu } from "@/lib/util";
export default {
  name: "student",
  data() {
    return {
      formData: {
        studentName: "",
        idCard: ""
      },
      columns: [
        {
          title: "序号",
          key: "index",
          align: "center",
          width: 80
        },
        {
          title: "学生名字",
          key: "studentName",
          align: "center",
          minWidth: 100
        },
        {
          title: "身份证号",
          key: "idcard",
          align: "center",
          width: 180
        },
        {
          title: "申请类型",
          key: "applyType",
          align: "center",
          width: 120
        },
        {
          title: "申请时间",
          key: "applyTime",
          align: "center",
          width: 160
        },
        {
          title: "审核时间",
          key: "allotTime",
          align: "center",
          width: 160
        },
        {
          title: "审核状态",
          key: "applyStatus",
          align: "center",
          minWidth: 150
        }
      ],
      dataTbale: {},
      pager: {
        total: 0,
        pageSize: 10,
        current: 1
      }
    };
  },
  computed: {
    tableData() {
      let data = [];
      debugger;
      $.each(this.dataTbale, function(index, item) {
        let temp = $.extend({}, item);
        temp.index = index + 1;
        temp.applyType = convertApplyType(item.applyType);
        temp.applyStatus = convertApplyStatu(item.applyStatus);
        data.push(temp);
      });
      return data;
    }
  },
  methods: {
    search() {
      enrollStudent({
        studentName: this.formData.studentName,
        idCard: this.formData.idCard,
        pageSize: this.pager.pageSize,
        pageNum: this.pager.current
      })
        .then(res => {
          debugger;
          if (res.data.code === 200) {
            this.dataTbale = res.data.data.list;
            this.pager.total = res.data.data.total;
            this.pager.current = res.data.data.pageNum;
          }
        })
        .catch(() => {
          this.$Message.error("操作失败");
        });
    },
    handleSubmit() {
      this.pager.current = 1;
      this.search();
    },
    onPagerChange(pageNum) {
      this.pager.current = pageNum;
      this.search();
    }
  },
  mounted() {
    this.search();
  }
};
</script>


