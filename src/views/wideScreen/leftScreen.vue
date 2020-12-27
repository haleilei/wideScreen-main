<template>
  <div class="l-data-page">
    <dheader title="监控统计"></dheader>
    <div class="rec">
      <div class="col">
        <wide-databox title="辖区河道当前垃圾：23">
          <ve-ring :data="languageData" :extend="extend" width="403px" :height="'90%'"></ve-ring>
          <div class="wide-trash-img"><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3626035237,2010855609&fm=26&gp=0.jpg" alt=""></div>
          <nodata :nodata="$t('data.dleft.nolanguageData')" v-if="nolanguageData"></nodata>
        </wide-databox>
      </div>
      <div class="col">
        <wide-databox title="辖区河道当前水草：25">
          <ve-radar :data="waterPlantsData" :extend="waterPlantsExtend" width="403px" :height="'100%'"></ve-radar>
          <div class="wide-trash-img"><img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3626035237,2010855609&fm=26&gp=0.jpg" alt=""></div>
          <nodata :nodata="$t('data.dleft.nolanguageData')" v-if="nolanguageData"></nodata>
        </wide-databox>
      </div>
      <div class="col">
        <wide-databox title="非法事件统计">
          <ve-line :data="lawlessnessChartData" :extend="lawlessnessExtend" style="margin:0 auto" width="96%" height="100%"></ve-line>
        </wide-databox>
      </div>
      <div class="col">
        <wide-databox title="辖区河道历史垃圾统计">
          <ve-histogram :data="chartData" :extend="chartExtends" :settings="chartSettings" style="margin:0 auto" width="96%" height="100%"></ve-histogram>
        </wide-databox>
      </div>
      <div class="col">
        <wide-databox title="辖区河道历史水草统计">
          <ve-line :data="hWaterChartData" :settings="hWaterPlantsSettings" :extend="hWaterPlantsExtend" style="margin:0 auto" width="96%" height="100%"></ve-line>
        </wide-databox>
      </div>
      <div class="col">
        <wide-databox title="水质统计">
          <ve-histogram :data="waterChartData" :extend="waterChartExtends" style="margin:0 auto" width="96%" height="100%"></ve-histogram>
          <nodata nodata="暂无统计数据" v-if="chartData.length==0"></nodata>
        </wide-databox>
      </div>
    </div>
    <dfooter style="position:absolute;left:0;bottom:0"></dfooter>
  </div>
</template>

<script>
import echarts from "echarts";
import dheader from "./dheader";
import dfooter from "./dfooter";
export default {
  components: {
    dheader,
    dfooter
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
    this.lawlessnessSettings = {
      metrics: ['访问用户'],
      dimension: ['类别']
    }
    this.lawlessnessExtend = {
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
      label: {
        show: true,
        formatter: (a) => {
          return `${a.name}：${a.value}`
        }
      },
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
      showLine: ['垃圾数'],
    }
    this.waterChartExtends = {
      legend: {
        show: false,
      },
      textStyle: {
        color: "#fff",
      },
      series: {
        barWidth: '30px',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: "#41A0F2"
            }, {
              offset: 1,
              color: "#2647FD"
            }], false)
          }
        }
      }
    }
    return {
      waterChartData: {
        columns: ['日期', '水质'],
        rows: [
          { '日期': '7-12', '水质': 50, '线': 50, },
          { '日期': '7-13', '水质': 45, '线': 45, },
          { '日期': '7-14', '水质': 35, '线': 35, },
          { '日期': '7-15', '水质': 46, '线': 46, },
          { '日期': '7-16', '水质': 60, '线': 60, },
          { '日期': '7-17', '水质': 55, '线': 55, }
        ]
      },
      flotagelist: [{
        code: 300,
        type: 1,
        area: "陵阳镇段河道",
        long: "39'52'48'N",
        admin: "谢凌曦"
      }, {
        code: 301,
        type: 2,
        area: "店子集镇段河道",
        long: "41'52'48'N",
        admin: "陆剑南"
      }, {
        code: 316,
        type: 2,
        area: "城阳街道段河道",
        long: "30'52'48'N",
        admin: "王颖慧"
      }, {
        code: 325,
        type: 3,
        area: "县经济开发区段河道",
        long: "25'52'48'N",
        admin: "黄昊阳"
      }, {
        code: 352,
        type: 4,
        area: "阎庄镇段河道",
        long: "26'52'48'N",
        admin: "姜子麟"
      }, {
        code: 165,
        type: 5,
        area: "洛河镇段河道",
        long: "27'52'48'N",
        admin: "李禄俊"
      }, {
        code: 128,
        type: 4,
        area: "招贤镇段河道",
        long: "28'52'48'N",
        admin: "石文博"
      }, {
        code: 178,
        type: 5,
        area: "安庄镇段河道",
        long: "29'52'48'N",
        admin: "刘可然"
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
        columns: ['日期', '水葫芦', '浮萍', '水华', '其他'],
        rows: [
          { '日期': '1/1', '水葫芦': 318, '浮萍': 318, '水华': 318, '其他': 318 },
          { '日期': '1/2', '水葫芦': 100, '浮萍': 100, '水华': 68, '其他': 50 },
        ]
      },
      lawlessnessChartData: {
        columns: ['类别', '数量'],
        rows: [
          { '类别': '漂浮', '数量': 13 },
          { '类别': '水草', '数量': 35 },
          { '类别': '水监', '数量': 29 },
          { '类别': '堤坝', '数量': 17 },
          { '类别': '落水', '数量': 37 },
          { '类别': '挖沙', '数量': 45 },
          { '类别': '占道', '数量': 41 },
          { '类别': '排沙', '数量': 54 }
        ]
      },
      personalD: {},
      starData: {
        columns: ["reposName", "getStars"],
        rows: []
      },
      noStarData: false,
      chartData: {
        columns: ['日期', '垃圾数量', '垃圾数'],
        rows: [
          { '日期': '7-12', '垃圾数量': 50, '垃圾数': 50, },
          { '日期': '7-13', '垃圾数量': 45, '垃圾数': 45, },
          { '日期': '7-14', '垃圾数量': 35, '垃圾数': 35, },
          { '日期': '7-15', '垃圾数量': 46, '垃圾数': 46, },
          { '日期': '7-16', '垃圾数量': 60, '垃圾数': 60, },
          { '日期': '7-17', '垃圾数量': 55, '垃圾数': 55, }
        ]
      },
      languageData: {
        columns: ["lang", "number"],
        rows: [
          {
            lang: "废纸",
            number: 3
          },
          {
            lang: "金属",
            number: 5
          },
          {
            lang: "布料",
            number: 5
          },
          {
            lang: "玻璃",
            number: 5
          },
          {
            lang: "塑料",
            number: 5
          },
          {
            lang: "其他",
            number: 5
          }
        ]
      },
      nolanguageData: false
    };
  },
  created () {
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.l-data-page {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .rec {
    padding-top: 4.5em;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    .col {
      margin: 2em 0;
      width: 31%;
      height: 24em;
      background: url(../../assets/data/rec-box.png) center;
      background-size: 100% 100%;
    }
  }
}
.wide-trash-img {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #0271a8;
  margin: 0 auto;
  height: 200px;
  width: 300px;
  img {
    width: 290px;
    height: 190px;
  }
}
</style>
