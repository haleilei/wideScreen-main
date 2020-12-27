<template>
  <div class="left-content">
    <div class="left-box">
      <databox title="辖区河道当前垃圾：23" :dheight="265">
        <ve-ring :data="languageData" :extend="extend" width="343px" :height="'200px'"></ve-ring>
        <div class="trash-img"><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3626035237,2010855609&fm=26&gp=0.jpg" alt=""></div>
        <nodata :nodata="$t('data.dleft.nolanguageData')" v-if="nolanguageData"></nodata>
      </databox>
      <databox title="辖区河道历史垃圾统计" :dheight="265">
        <ve-histogram :data="chartData" :extend="chartExtends" :settings="chartSettings" style="margin:0 auto" width="96%" height="280px"></ve-histogram>
      </databox>
      <databox title="辖区河道当前水草：23" :dheight="265">
        <ve-radar :data="waterPlantsData" :extend="waterPlantsExtend" width="343px" :height="'200px'"></ve-radar>
        <div class="trash-img"><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3626035237,2010855609&fm=26&gp=0.jpg" alt=""></div>
        <nodata :nodata="$t('data.dleft.nolanguageData')" v-if="nolanguageData"></nodata>
      </databox>
      <databox title="辖区河道历史水草统计" :dheight="265">
        <ve-line :data="hWaterChartData" :settings="hWaterPlantsSettings" :extend="hWaterPlantsExtend" style="margin:0 auto" width="96%" height="280px"></ve-line>
      </databox>
      <databox title="漂浮物列表" :dheight="260" :icon="'account'">
        <message :data="flotagelist"></message>
        <nodata :nodata="$t('data.dright.index.messege')" v-if="flotagelist.length==0"></nodata>
        <nodata nodata="暂无漂浮物列表信息" v-if="flotagelist.length==0"></nodata>
      </databox>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import message from "./message";
export default {
  components: {
    message,
  },
  props: {
    personalData: Object,
    username: String
  },
  data () {
    this.hWaterPlantsSettings = {
      stack: { '用户': ['访问用户', '下单用户'] },
      area: true
    }
    this.hWaterPlantsExtend = {
      legend: {
        show: false,
      },
      textStyle: {
        color: "#fff",
      }
    }
    this.waterPlantsExtend = {
      legend: {
        show: false,
      },
      radar: {
        radius: "70%",
      },
      series: {
        center: ["50%", "50%"]
      }
    }
    this.extend = {
      legend: {
        show: false,
      },
      textStyle: {
        color: "#fff",
        fontSize: 18
      },
      grid: {
        textStyle: {
          color: "#fff"
        }
      },
      series: {
        radius: ["30%", "55%"],
        center: ["50%", "50%"]
      }
    };
    this.chartExtends = {
      legend: {
        show: false,
      },
      textStyle: {
        color: "#fff",
      },
      series: {
        barWidth: '20px',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: "#7006D9"
            }, {
              offset: 1,
              color: "#039EE6"
            }], false)
          }
        }
      }
    }
    this.chartSettings = {
      showLine: ['线'],
    }
    return {
      flotagelist: [{
        code: 325,
        type: 1,
        area: "xxx河道",
        long: "39'52'48'N",
        admin: "张云"
      }, {
        code: 325,
        type: 1,
        area: "xxx河道",
        long: "39'52'48'N",
        admin: "张云"
      }, {
        code: 325,
        type: 1,
        area: "xxx河道",
        long: "39'52'48'N",
        admin: "张云"
      }, {
        code: 325,
        type: 1,
        area: "xxx河道",
        long: "39'52'48'N",
        admin: "张云"
      }, {
        code: 325,
        type: 1,
        area: "xxx河道",
        long: "39'52'48'N",
        admin: "张云"
      }, {
        code: 325,
        type: 1,
        area: "xxx河道",
        long: "39'52'48'N",
        admin: "张云"
      }, {
        code: 325,
        type: 1,
        area: "xxx河道",
        long: "39'52'48'N",
        admin: "张云"
      }, {
        code: 325,
        type: 1,
        area: "xxx河道",
        long: "39'52'48'N",
        admin: "张云"
      },],
      hWaterChartData: {
        columns: ['日期', '数量'],
        rows: [
          { '日期': '7-12', '数量': 1393 },
          { '日期': '7-13', '数量': 3530 },
          { '日期': '7-14', '数量': 2923 },
          { '日期': '7-15', '数量': 1723 },
          { '日期': '7-16', '数量': 3792 },
          { '日期': '7-17', '数量': 2000 }
        ]
      },
      waterPlantsData: {
        columns: ['日期', '水葫芦', '浮萍', '水华'],
        rows: [
          { '日期': '1/1', '水葫芦': 268, '浮萍': 268, '水华': 268 },
          { '日期': '1/2', '水葫芦': 100, '浮萍': 100, '水华': 68 },
        ]
      },
      personalD: {},
      starData: {
        columns: ["reposName", "getStars"],
        rows: []
      },
      noStarData: false,
      chartData: {
        columns: ['日期', '柱', '线'],
        rows: [
          { '日期': '7-12', '柱': 50, '线': 50, },
          { '日期': '7-13', '柱': 45, '线': 45, },
          { '日期': '7-14', '柱': 35, '线': 35, },
          { '日期': '7-15', '柱': 46, '线': 46, },
          { '日期': '7-16', '柱': 60, '线': 60, },
          { '日期': '7-17', '柱': 55, '线': 55, }
        ]
      },
      languageData: {
        columns: ["lang", "number"],
        rows: [
          {
            lang: "废纸：3",
            number: 3
          },
          {
            lang: "金属：5",
            number: 5
          },
          {
            lang: "布料：5",
            number: 5
          },
          {
            lang: "玻璃：5",
            number: 5
          },
          {
            lang: "塑料：5",
            number: 5
          }
        ]
      },
      nolanguageData: false
    };
  },
  created () { },
  methods: {
    getData (username) {
      this.$axios
        .get("/api/users/" + username + "/repos")
        .then(response => {
          let data = JSON.parse(JSON.stringify(response.data));
          if (data.length < 1) {
            this.noStarData = true;
          } else {
            let rowdata = [];
            let languages = {};
            for (var i = 0; i < data.length; i++) {
              // 仓库和仓库star
              let reposName = data[i].name;
              let getStars = data[i].stargazers_count;
              let obj = {
                reposName: reposName,
                getStars: getStars
              };
              rowdata.push(obj);

              //梳理语言，计算语言类型和各个语言的数量
              let langData = data[i].language;
              if (langData) {
                if (langData in languages) {
                  languages[langData]++;
                } else {
                  languages[langData] = 1;
                }
              }
            }
            //把值附到starData.rows
            this.starData.rows = rowdata;
            //console.log(this.starData.rows)

            //重新组装语言封成对象
            let objL = JSON.parse(JSON.stringify(languages));
            let dataL = [];
            for (var key in objL) {
              dataL.push({ lang: key, number: objL[key] });
            }
            // this.languageData.rows = dataL;
            //console.log(objL)
            //console.log(this.languageData.rows)
          }
          return;
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  },
  watch: {
    username (username) {
      if (username) {
        this.getData(username);
      }
    }
  }
};
</script>

<style lang="scss">
.left-content {
  width: 100%;
  height: 100%;
  .left-box {
    width: 100%;
    padding-bottom: 40px;
    .content-wapper {
      padding-top: 40px;
      height: 220px;
    }
  }
}
.trash-img {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #0271a8;
  margin: 0 auto;
  height: 170px;
  width: 250px;
  img {
    width: 240px;
    height: 160px;
  }
}
</style>
