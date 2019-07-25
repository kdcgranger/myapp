<style scoped>
.item-title {
  margin-right: 10px;
}
.item-title-content {
  margin-left: 20px;
}
.tail {
  margin-top: 20px;
}
.btn {
  margin-left: 10px;
}
.table-content {
  overflow: auto;
}
.ivu-table-cell {
  padding-left: 5px !important;
  padding-right: 5px !important;
}
</style>
<template>
  <div>
    <Form ref="formData" :model="formData" inline>
      <!-- <FormItem prop="user" v-if="user.type!=3&&user.type!=4">
        <span class="item-title">审核学校</span>
        <Select v-model="formData.checkSchool" style="width:200px">
          <Option value="">全部学校</Option>
          <Option v-for="item in schools" :value="item.id" :key="item.id">{{ item.schoolName }}</Option>
        </Select>
      </FormItem> -->
      <FormItem prop="user">
        <span class="item-title  item-title-content">申请状态</span>
        <Select v-model="formData.applyStatus" style="width:200px">
          <Option :value="-1">全部状态</Option>
          <Option v-for="item in applyStatus" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="user">
        <span class="item-title  item-title-content">申请类型</span>
        <Select v-model="formData.applyType" style="width:200px">
          <Option :value="-1">全部类型</Option>
          <Option v-for="item in applyTypes" :value="item.code" :key="item.code">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="user" v-if="role == 5 || role == 6">
        <span class="item-title item-title-content">分配学校</span>
        <Select v-model="formData.allotSchool" style="width:200px">
          <Option value="">全部学校</Option>
          <Option v-for="item in schools" :value="item.id" :key="item.id">{{ item.schoolName }}</Option>
        </Select>
      </FormItem>
      <FormItem prop="user">
        <span class="item-title  item-title-content">学生姓名</span>
        <Input v-model="formData.studentName" style="width:200px" />
        </Input>
      </FormItem>
      <FormItem prop="user">
        <span class="item-title">学生身份证号码</span>
        <Input v-model="formData.idcard" style="width:200px" />
      </FormItem>
      <FormItem>
        <Button type="primary" @click="search">搜索</Button>
        <Button type="primary" @click="reset" style="margin-left:10px">重置</Button>
      </FormItem>
    </Form>
    <div class="table-content">
      <Table class="table" border ref="selection" @on-selection-change="onSelectionChange" stripe tooltip :columns="columns" :data="dataTable"></Table>
    </div>
    <Row class="tail">
      <Col span="12">
      <Button @click="showDismissDialog">批量驳回</Button>
      <Button class="btn" @click="approve" v-if="role == 5">通过审核</Button>
      <Button class="btn" @click="showAllotDialog" v-if="role == 5">批量分配学校</Button>
      <Button class="btn" @click="enrollSubmit(7)" v-if="role == 6">预录取</Button>
      <Button class="btn" @click="enrollSubmit(8)" v-if="role == 6">录取</Button>
      <Button class="btn" @click="export2Excel">导出数据</Button>
      </Col>
      <Col span="12">
      <Page :total="pager.total" :page-size="pager.pageSize" :current="pager.current" show-total show-sizer show-elevator :page-size-opts=[10,20,50,100,200,500,1000] @on-change="onPagerChange" @on-page-size-change="onPageSizeChange"/>
      </Col>
    </Row>
    <Dismiss ref="dismiss" name="dismiss" @ok="dismissAllot"></Dismiss>
    <AllotSchool ref="allotSchool" name="allotSchool" :schools="schools" @ok="allotSchool"></AllotSchool>
    <Adjust ref="adjust" name="adjust" @ok="adjustAllot"></Adjust>
    <Confirm ref="enrollSubmit" name="enrollSubmit" :title="confirmTitle" :confirmTxt="confirmTxt" @ok="approve"></Confirm>
  </div>
</template>
<script>
import { getSchool } from "@/api/system.js";
import Confirm from "@/components/common/Confirm";
import {
  queryCheckInfo,
  dismissApply,
  schoolAllot,
  approveApply
} from "@/api/app.js";
import { convertApplyType, convertApplyStatu, convertApplyAddr, convertCorporater, convertCorporaterNum } from "@/lib/util";
import Dismiss from "@/components/allot/Dismiss";
import AllotSchool from "@/components/allot/AllotSchool";
import Adjust from "@/components/allot/Adjust";
import config from "@/config";
import { mapGetters } from "vuex";
import { download } from "@/api/app";
export default {
  name: "allot",
  data() {
    return {
      enrollType: 0,
      confirmTitle: '',
      confirmTxt: '',
      formData: {
        checkSchool: "",
        allotSchool: "",
        applyType: -1,
        applyStatus: -1,
        studentName: "",
        idcard: ""
      },
      schools: [],
      applyTypes: config.applyType,
      columns: [
        {
          type: "selection",
          width: 50,
          align: "center"
        },
        {
          title: "序号",
          key: "index",
          align: "center",
          width: 80
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          width: 85
        },
        {
          title: "身份证号",
          key: "idcard",
          align: "center",
          width: 160
        },
        {
          title: "监护人1",
          key: "guardian1",
          align: "center",
          width: 85
        },
        {
          title: "监护人2",
          key: "guardian2",
          align: "center",
          width: 85
        },
        {
          title: "联系电话1",
          key: "guardianPhone1",
          align: "center",
          width: 120
        },
        {
          title: "联系电话2",
          key: "guardianPhone2",
          align: "center",
          width: 120
        },
        {
          title: "房屋所有人/户主/法人姓名",
          key: "corporate",
          align: "center",
          minWidth: 80
        },
        {
          title: "身份证号/房产编号/购房合同编号/营业执照编号",
          key: "corporaterNum",
          align: "center",
          minWidth: 85
        },
        {
          title: "申请类型",
          key: "applyType",
          align: "center",
          width: 70
        },
        /* {
          title: "申请时间",
          key: "applyTime",
          align: "center",
          width: 100
        },
        {
          title: "审核学校",
          key: "checkSchoolName",
          align: "center",
          width: 100
        }, */
        {
          title: "审核状态",
          key: "applyStatus",
          align: "center",
          width: 100
        },
        {
          title: "申请信息",
          key: "applyAddr",
          align: "center",
          minWidth: 160
        },
        /* {
          title: "分配学校",
          key: "allotSchoolName",
          align: "center",
          width: 100
        },
        {
          title: "审核时间",
          key: "allotTime",
          align: "center",
          width: 100
        },
        {
          title: "审核描述",
          key: "allotReason",
          align: "center",
          minWidth: 80
        }, */
        {
          title: "Action",
          key: "action",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params);
                    }
                  }
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: this.role === 6 ? "none" : "initial"
                  },
                  on: {
                    click: () => {
                      this.adjust(params);
                    }
                  }
                },
                "审核"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: this.role === 3 || this.role === 4 ? "none" : "initial"
                  },
                  on: {
                    click: () => {
                      this.allot(params);
                    }
                  }
                },
                "分配学校"
              )/* ,
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.disMiss(params);
                    }
                  }
                },
                "驳回"
              ) */
            ]);
          }
        }
      ],
      tableData: [],
      pager: {
        total: 0,
        pageSize: this.$route.query.pageSize || 10,
        current: this.$route.query.pageNum || 1
      },
      selectedUserId: [],
      selectedUsers: [],
      role: Number(localStorage.getItem("role")),
      applyStatus: (Number(localStorage.getItem("role")) === 3 || Number(localStorage.getItem("role")) === 4) ? config.applyStateSchool : config.applyStateAdmin
    };
  },
  computed: {
    ...mapGetters({ user: "userInfo" }),
    dataTable() {
      var results = [];
      let _that = this
      $.each(this.tableData, function(index, item) {
        results.push(
          $.extend({}, item, {
            //studentType: item.studentType === 1 ? "小学" : "中学",
            index: index + 1 + _that.pager.pageSize * (_that.pager.current - 1),
            //index: index + 1 + (this.pager.current - 1) * this.pager.pageSize
            applyType: convertApplyType(item),
            applyStatus: convertApplyStatu(item.applyInfo.applyStatus, this.role),
            userId: item.sysuser.id,
            studentName: item.sysuser.realName,
            idcard: item.sysuser.idCard,
            guardian1: item.guarderInfo.fatherName,
            guardianPhone1: item.guarderInfo.fatherPhone,
            guardian2: item.guarderInfo.motherName,
            guardianPhone2: item.guarderInfo.motherPhone,
            checkTeacherName: item.applyInfo.checkTeacherName,
            applyAddr: convertApplyAddr(item),
            corporate: convertCorporater(item),
            corporaterNum: convertCorporaterNum(item)
          })
        );
      });
      return results;
    }
  },
  methods: {
    enrollSubmit (type) {
      if (this.selectedUsers.length < 1) {
        this.$Message.error("请先选择学生");
      } else {
        if (this.selectedUsers.filter(e => {
          return e.applyInfo.applyStatus !== type
        }).length > 0) {
          if (type === 7) {
            this.$Message.error("非复审通过的学生不能进行预录取操作");
          } else {
            this.$Message.error("非预录取的学生不能进行录取操作");
          }
        } else {
          if (type === 7) {
            this.confirmTitle = '预录取确认'
            this.confirmTxt = '将要对选中的学生进行预录取，是否确认继续？'
          } else {
            this.confirmTitle = '录取确认'
            this.confirmTxt = '将要对选中的学生进行录取，是否确认继续？'
          }
          this.$refs.enrollSubmit.show()
        }
      }
    },
    //查询学校
    querySchool() {
      getSchool().then(res => {
        this.schools = res.data.data;
      });
    },
    //搜索
    search() {
      this.getCheckInfo();
    },
    reset() {
      this.formData = {
        checkSchool: "",
        allotSchool: "",
        applyType: -1,
        applyStatus: -1,
        studentName: "",
        idcard: ""
      }
    },
    //下载
    download() {
      download(this.selectedUserId)
        .then()
        .catch(err => {
          console.log(err);
          this.$Message.error("下载失败");
        });
    },
    export2Excel() {
      if (this.selectedUserId.length < 1) {
        this.$Message.error("请选择要导出的行");
        return false;
      }
      this.$refs.selection.exportCsv({
          filename: '导出文件',
          columns: this.columns.filter((col, index) => index < 11 && index > 0),
          data: this.transCharactor(this.dataTable.filter((data, index) => this.selectedUserId.indexOf(data.userId) > -1))
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    transCharactor(dataList) {
      $.each(dataList, function(index, e) {
        for (var v in e) {
          e[v] = "\t" + (e[v] || "").toString()
        }
      })
      return dataList
    },
    //查看审核情况
    getCheckInfo() {
      let params = {
        applyStatus: this.formData.applyStatus,
        applyType: this.formData.applyType,
        //checkSchoolId: this.formData.checkSchool,
        idCard: this.formData.idcard,
        checkSchoolId: this.formData.allotSchool,
        studentName: this.formData.studentName,
        pageSize: this.pager.pageSize,
        pageNum: this.pager.current < 1 ? 1 : this.pager.current
      };
      queryCheckInfo(params)
        .then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data.list;
            this.pager.total = res.data.data.total;
            this.pager.current = res.data.data.pageNum;
            // 页面选中已取消但是选中数据还存在bug
            this.selectedUsers = []
            this.selectedUserId = []
          } else {
            console.log("----------------");
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    //查看学生详情
    show(param) {
      this.$router.push({
        name: "detail",
        params: {
          userId: param.row.userId,
          pageNum: this.pager.current,
          pageSize: this.pager.pageSize
        }
      });
    },
    //选中的数据发生变化时
    onSelectionChange(selection) {
      let userIds = [];
      let selectedUsers = []
      $.each(selection, function(index, item) {
        userIds.push(item.userId);
        selectedUsers.push(item)
      });
      this.selectedUserId = userIds;
      this.selectedUsers = selectedUsers
    },
    //显示驳回窗口
    showDismissDialog() {
      if (this.selectedUserId.length === 0) {
        this.$Message.warning("请先选择数据");
        return false;
      }
      this.$refs.dismiss.show();
    },
    //驳回申请
    disMiss(param) {
      if (typeof param !== "undefined") {
        this.selectedUserId = [param.row.userId];
      }
      this.showDismissDialog();
    },
    //关闭驳回申请弹窗
    dismissAllot(param) {
      let data = {
        checkReason: param.checkReason,
        checkResult: 0,
        studentIds: this.selectedUserId
      };
      dismissApply(data)
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.success("操作成功");
          }
          //刷新界面
          this.search();
        })
        .catch(() => {
          this.$Message.error("操作失败");
        });
    },
    //显示分配学校的弹窗
    showAllotDialog() {
      if (this.selectedUserId.length === 0) {
        this.$Message.warning("请先选择数据");
        return false;
      }
      this.$refs.allotSchool.show();
    },
    adjust(param) {
      if (typeof param !== "undefined") {
        this.selectedUserId = [param.row.userId];
      }
      this.$refs.adjust.show();
    },
    adjustAllot(param) {
      let data = {
        checkReason: param.checkReason,
        checkResult: 0,
        studentIds: this.selectedUserId
      };
      if (param.dismissType === "4") {
        approveApply(this.selectedUserId)
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.success("预审通过成功");
          }
          //刷新界面
          this.search();
        })
        .catch(() => {
          //this.$Message.error("操作失败");
        });
      } else {
        dismissApply(data)
          .then(res => {
            if (res.data.code === 200) {
              this.$Message.success("审核成功");
            }
            //刷新界面
            this.search();
          })
          .catch(() => {
            this.$Message.error("操作失败");
          });
      }
    },
    //单个分配学校
    allot(param) {
      this.selectedUserId = [param.row.userId];
      this.showAllotDialog();
    },
    //分配学校
    allotSchool(param) {
      let data = {
        schoolId: param,
        studentIds: this.selectedUserId
      };
      schoolAllot(data)
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.success("操作成功");
          }
          //刷新界面
          this.search();
        })
        .catch(() => {
          this.$Message.error("操作失败");
        });
    },
    //页码改变时
    onPagerChange(pageNum) {
      this.pager.current = pageNum;
      this.search();
    },
    onPageSizeChange (pageSize) {
      this.pager.pageSize = pageSize
      this.search();
    },
    //通过审核
    approve() {
      if (this.selectedUserId.length === 0) {
        this.$Message.warning("请先选择学生");
        return false;
      }
      approveApply(this.selectedUserId)
        .then(res => {
          if (res.data.code === 200) {
            this.$Message.success("操作成功");
          }
          //刷新界面
          this.search();
        })
        .catch(() => {
          this.$Message.error("操作失败");
        });
    }
  },
  mounted() {
    this.querySchool();
    this.getCheckInfo();
    if (this.role === 5 || this.role === 6) {
      this.columns.splice(12, 0, {
          title: "审核人",
          key: "checkTeacherName",
          align: "center",
          width: 100
        })
    }
  },
  components: {
    Dismiss,
    AllotSchool,
    Adjust,
    Confirm
  }
};
</script>


