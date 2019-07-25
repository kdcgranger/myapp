<style scoped>
#pieChart {
  width: 100%;
  height: 400px;
  display: none;
}
#pillarChart {
  /* width: 700px;
  height: 400px;
  display: inline-block; */
}
.school_type {
  font-size: 18px;
  font-weight: bold;
  margin: 20px 0;
}
</style>
<template>
  <div>
    <div id="pieChart"></div>
    <br>
    <div id="pillarChart">
      <row>
        <Col span="11">
        <p class="school_type">小学注册报名数据详情</p>
        <Table
          class="table"
          border
          ref="selection"
          stripe
          tooltip
          :columns="regcolumns"
          :data="primaryRegTableData"
        ></Table>
        <p class="school_type">中学注册报名数据详情</p>
        <Table
          class="table"
          border
          ref="selection"
          stripe
          tooltip
          :columns="regcolumns"
          :data="middleRegTableData"
        ></Table>
        </Col>
        <Col
          span="2"
          style="width:5%;height:500px"
        >
        </Col>
        <Col span="11">
        <p class="school_type">小学已分配的学生数据详情</p>
        <Table
          class="table"
          border
          ref="selection"
          stripe
          tooltip
          :columns="columns"
          :data="primaryCkTableData"
        ></Table>
        <p class="school_type">中学已分配的学生数据详情</p>
        <Table
          class="table"
          border
          ref="selection"
          stripe
          tooltip
          :columns="columns"
          :data="middleCkTableData"
        ></Table>
        </Col>
      </row>
    </div>
  </div>
</template>
<script>
import { queryStatics, queryCheckedStatics } from "@/api/system";
var echarts = require("echarts");
export default {
  name: "static",
  data() {
    return {
      columns: [
        {
          title: "序号",
          key: "indexNum",
          align: "center",
          minWidth: 50
        },
        {
          title: "学校名称",
          key: "school_name",
          align: "center",
          minWidth: 150
        },
        {
          title: "军人类型",
          key: "junren",
          align: "center",
          minWidth: 50
        },
        {
          title: "房产类型",
          key: "fangchan",
          align: "center",
          minWidth: 50
        },
        {
          title: "户口类型",
          key: "hukou",
          align: "center",
          minWidth: 50
        },
        {
          title: "务工类型",
          key: "wugong",
          align: "center",
          minWidth: 50
        },
        {
          title: "经商类型",
          key: "jingshang",
          align: "center",
          minWidth: 50
        },
        {
          title: "其他类型",
          key: "otherNum",
          align: "center",
          minWidth: 50
        },
        {
          title: "合计",
          key: "total_num",
          align: "center",
          minWidth: 50
        }
      ],
      regcolumns: [
        {
          title: "序号",
          key: "indexNum",
          align: "center",
          minWidth: 50
        },
        {
          title: "学校名称",
          key: "school_name",
          align: "center",
          minWidth: 150
        },
        {
          title: "军人类型",
          key: "junren",
          align: "center",
          minWidth: 50
        },
        {
          title: "房产类型",
          key: "fangchan",
          align: "center",
          minWidth: 50
        },
        {
          title: "户口类型",
          key: "hukou",
          align: "center",
          minWidth: 50
        },
        {
          title: "务工类型",
          key: "wugong",
          align: "center",
          minWidth: 50
        },
        {
          title: "经商类型",
          key: "jingshang",
          align: "center",
          minWidth: 50
        },
        {
          title: "合计",
          key: "total_num",
          align: "center",
          minWidth: 50
        }
      ],
      primaryRegTableData: [],
      middleRegTableData: [],
      primaryCkTableData: [],
      middleCkTableData: []
    };
  },
  methods: {
    //查询统计数据
    query() {
      queryStatics().then(res => {
        if (res.data.code === 200) {
          this.pieChart(res.data.data);
          res.data.data.forEach((e, index) => {
            e["otherNum"] =
              e.total_num -
              e.fangchan -
              e.hukou -
              e.jingshang -
              e.junren -
              e.wugong;
            if (e.school_name.indexOf("中") > -1) {
              e["indexNum"] = this.middleRegTableData.length + 1;
              this.middleRegTableData.push(e);
            } else {
              e["indexNum"] = this.primaryRegTableData.length + 1;
              this.primaryRegTableData.push(e);
            }
          });
          // this.pillarChart(res.data.data);
        }
      });
      queryCheckedStatics().then(res => {
        if (res.data.code === 200) {
          res.data.data.forEach((e, index) => {
            e["otherNum"] =
              e.total_num -
              e.fangchan -
              e.hukou -
              e.jingshang -
              e.junren -
              e.wugong;
            if (e.school_name.indexOf("中") > -1) {
              e["indexNum"] = this.middleCkTableData.length + 1;
              this.middleCkTableData.push(e);
            } else {
              e["indexNum"] = this.primaryCkTableData.length + 1;
              this.primaryCkTableData.push(e);
            }
          });
          // this.pillarChart(res.data.data);
        }
      });
    },
    //绘制饼图
    pieChart(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("pieChart"));
      let datas = [];
      let schools = [];
      let totals = 0;
      $.each(data, (index, item) => {
        if (typeof item.school_name !== "undefined") {
          schools.push(item.school_name);
          datas.push(item.total_num);
          totals += item.total_num;
        }
      });
      let option = {
        title: {
          text: "当阳各学校招生情况",
          subtext: ""
        },
        tooltip: {
          trigger: "item",
          // formatter: "<br/>{b} : {c} ({d}%)"
          formatter: function(data) {
            return (
              data.name +
              "：" +
              data.value +
              "（" +
              ((data.value * 100) / totals).toFixed(2) +
              "%）"
            );
          }
        },
        xAxis: {
          type: "category",
          data: schools,
          axisTick: {
            alignWidthLabel: true,
            interval: 0
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: datas,
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            itemStyle: {
              normal: {
                color: "#5AB1EF"
              }
            }
          }
        ]
      };

      /* let serie = {
        name: "录取人数",
        type: "pie",
        radius: "55%",
        center: ["60%", "70%"],
        data: [],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      } */
      // 绘制图表
      myChart.setOption(option);
    },
    //绘制柱状图
    pillarChart(data) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("pillarChart"));

      let option = {
        title: {
          text: "当阳各学校招生情况",
          subtext: ""
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: ["军人", "房产", "户口", "经商", "务工"]
        },
        grid: {
          left: "3%",
          right: "8%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          minInterval: 1
        },
        yAxis: {
          type: "category",
          data: []
        },
        series: [
          {
            name: "军人",
            type: "bar",
            stack: "总量",
            data: [],
            label: {
              normal: {
                show: true,
                position: "insideLeft",
                formatter: function(v) {
                  return v.value || "";
                }
              }
            },
            itemStyle: {
              normal: {
                color: "red"
              }
            }
          },
          {
            name: "房产",
            type: "bar",
            stack: "总量",
            //barWidth: "50px",
            data: [],
            label: {
              normal: {
                show: true,
                position: "insideLeft",
                formatter: function(v) {
                  return v.value || "";
                }
              }
            },
            itemStyle: {
              normal: {
                color: "orange"
              }
            }
          },
          {
            name: "户口",
            type: "bar",
            stack: "总量",
            data: [],
            label: {
              normal: {
                show: true,
                position: "insideLeft",
                formatter: function(v) {
                  return v.value || "";
                }
              }
            },
            itemStyle: {
              normal: {
                color: "yellowgreen"
              }
            }
          },
          {
            name: "经商",
            type: "bar",
            stack: "总量",
            data: [],
            label: {
              normal: {
                show: true,
                position: "insideLeft",
                formatter: function(v) {
                  return v.value || "";
                }
              }
            },
            itemStyle: {
              normal: {
                color: "green"
              }
            }
          },
          {
            name: "务工",
            type: "bar",
            stack: "总量",
            data: [],
            label: {
              normal: {
                show: true,
                position: "insideLeft",
                formatter: function(v) {
                  return v.value || "";
                }
              }
            },
            itemStyle: {
              normal: {
                color: "cornflowerblue"
              }
            }
          },
          {
            name: "总计",
            type: "bar",
            stack: "总计",
            barGap: "-100%",
            label: {
              normal: {
                show: true,
                position: "right",
                textStyle: { color: "#000" },
                formatter: function(v) {
                  return "总计：" + v.value;
                }
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(128, 128, 128, 0)",
                borderWidth: 1,
                borderColor: "#1FBCD2"
              }
            },
            data: []
          }
        ]
      };

      $.each(data, (index, item) => {
        if (typeof item.school_name !== "undefined") {
          option.yAxis.data.push(item.school_name);
          option.series[0].data.push({
            value: item.junren
          });
          option.series[1].data.push({
            value: item.fangchan
          });
          option.series[2].data.push({
            value: item.hukou
          });
          option.series[3].data.push({
            value: item.jingshang
          });
          option.series[4].data.push({
            value: item.wugong
          });
          option.series[5].data.push({
            value: item.total_num
          });
        }
      });
      // 绘制图表
      myChart.setOption(option);
    }
  },
  mounted() {
    this.query();
  }
};
</script>


