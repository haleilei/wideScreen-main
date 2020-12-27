<template>
  <div class="left-content">
    <div class="left-box">
      <databox :title="cueerntRubbishTitle" :dheight="230">
        <ve-ring :data="languageData" :extend="extend" width="343px" :height="'200px'"></ve-ring>
        <div class="trash-img"><img :src="currentRubbishImg" alt=""></div>
        <nodata :nodata="$t('data.dleft.nolanguageData')" v-if="nolanguageData"></nodata>
      </databox>
      <databox title="辖区河道历史垃圾统计" :dheight="230">
        <ve-histogram :data="chartData" :extend="chartExtends" :settings="chartSettings" style="margin:0 auto" width="96%" height="280px"></ve-histogram>
      </databox>
      <databox :title="cueerntPlantTitle" :dheight="230">
        <ve-radar class="plant_child" :data="waterPlantsData" :extend="waterPlantsExtend" width="343px" :height="'200px'"></ve-radar>
        <div class="plant_child trash-img"><img :src="currentPlantImg" alt=""></div>
        <nodata :nodata="$t('data.dleft.nolanguageData')" v-if="nolanguageData"></nodata>
      </databox>
      <databox title="水质实时数据" :dheight="230" :icon="'account'">
        <waterquantity></waterquantity>
      </databox>
      <databox title="侧扫暗管视频" :dheight="400">
        <!-- <ve-line :data="hWaterChartData" :settings="hWaterPlantsSettings" :extend="hWaterPlantsExtend" style="margin:0 auto" width="96%" height="280px"></ve-line> -->
        <multiBeamMonitoring id="mbleft" urlKey="pipelineVideoURLs"></multiBeamMonitoring>
      </databox>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
// import message from "./message";
import waterquantity from "./waterquantity"
import multiBeamMonitoring from '../dright/multiBeamMonitoring'
import config from "../../../config/config"
export default {
  components: {
    // message,
    waterquantity,
    multiBeamMonitoring
  },
  props: {
    personalData: Object,
    username: String
  },
  data () {
    this.hWaterPlantsSettings = {
      stack: { '用户': ['访问用户', '下单用户'] },
      area: true
    };
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
      label: {
        show: true,
        formatter: (a) => {
          return `${a.name}：${a.value}`
        }
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
    return {
      flotagelist: [],
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
      // 河道当前水草
      waterPlantsData: {
        columns: ['日期', '水葫芦', '浮萍', '水华', '其他'],
        rows: [
          { '水葫芦': 268, '浮萍': 268, '水华': 268, '其他': 318 },
        ]
      },
      currentPlantImg: "",
      cueerntPlantTitle: "",
      personalD: {},
      starData: {
        columns: ["reposName", "getStars"],
        rows: []
      },
      noStarData: false,
      chartData: {
        columns: ['日期', '垃圾数量', '垃圾数'],
        rows: [
          // { '日期': '7-12', '垃圾数量': 50, '垃圾数': 50, },
          // { '日期': '7-13', '垃圾数量': 45, '垃圾数': 45, },
          // { '日期': '7-14', '垃圾数量': 35, '垃圾数': 35, },
          // { '日期': '7-15', '垃圾数量': 46, '垃圾数': 46, },
          // { '日期': '7-16', '垃圾数量': 60, '垃圾数': 60, },
          // { '日期': '7-17', '垃圾数量': 55, '垃圾数': 55, }
        ]
      },
      // 河道当前垃圾
      languageData: {
        columns: ["lang", "number"],
        rows: [
        ]
      },
      currentRubbishImg: "",
      cueerntRubbishTitle: "",
      nolanguageData: false,
      timerHistoryRubbish: null,
      timerHistoryWeed: null,
      timerCurrentRubbish: null,
      timerCurrentWeed: null,
      timerFloatList: null
    };
  },
  created () {
    this.timerHistoryRubbish = setInterval(this.getRubbishCount, 10*2000);
    this.timerHistoryWeed = setInterval(this.getWeedCount, 10*1000);
    this.timerCurrentRubbish = setInterval(this.getCurrentRubbish, 10*2000);
    this.timerCurrentWeed = setInterval(this.getCurrentWeed, 10*2000);
    this.timerFloatList = setInterval(this.getFloatList, 10*2000)
  },
  methods: {
    getRubbishCount () {
      let url = config.ROOT_API_URL + "/pc/rubbish/count/";
      let _this = this;
      this.$axios.get(url, {
        params: {
          cityId: localStorage.getItem("cityId")
        }
      }).then(function (response) {
        if (response.retCode ===0) {
          _this.chartData.rows = []
          for (let i=0; i<response.data.length; i++) {
            let temp = {
              "日期": response.data[i].ai__c_time,
              "垃圾数量": response.data[i].rubbish_count,
              "垃圾数": response.data[i].rubbish_count,
            };
            _this.chartData.rows.push(temp)
          }

        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getWeedCount () {
      let url = config.ROOT_API_URL + "/pc/weed_count/count/";
      let _this = this;
      this.$axios.get(url, {
        params: {
          cityId: localStorage.getItem("cityId")
        }
      }).then(function (response) {
        if (response.retCode ===0) {
          _this.hWaterChartData.rows = [];
          for (let i=0; i<response.data.length; i++) {
            let temp = {
              "日期": response.data[i].ai__c_time,
              "数量": response.data[i].weed_count,
            };
            _this.hWaterChartData.rows.push(temp)
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCurrentRubbish () {
      let url = config.ROOT_API_URL + "/pc/latest/rubbish/detail/";
      let _this = this;
      this.$axios.get(url, {
        params: {
          cityId: localStorage.getItem("cityId")
        }
      }).then(function (response) {
        if (response.retCode ===0) {
            _this.languageData.rows =[];
            _this.rubbishCount = 0;
            for (let i=0; i<response.data.detail.length; i++) {
                if (response.data.detail[i].ai_type === 1){
                    let temp = {
                        "lang": "垃圾类型",
                        "number": parseInt(response.data.detail[i].rubbish_count)
                    }
                    _this.languageData.rows.push(temp)
                    _this.rubbishCount += parseInt(response.data.detail[i].rubbish_count)
                }
                if (response.data.detail[i].ai_type === 3){
                    let temp = {
                        "lang": "树枝",
                        "number": parseInt(response.data.detail[i].rubbish_count)
                    }
                    _this.languageData.rows.push(temp)
                    _this.rubbishCount += parseInt(response.data.detail[i].rubbish_count)
                }
                if (response.data.detail[i].ai_type === 4){
                    let temp = {
                        "lang": "死鱼",
                        "number": parseInt(response.data.detail[i].rubbish_count)
                    }
                    _this.languageData.rows.push(temp)
                    _this.rubbishCount += parseInt(response.data.detail[i].rubbish_count)
                }
                if (response.data.detail[i].ai_type === 5){
                    let temp = {
                        "lang": "动物尸体",
                        "number": parseInt(response.data.detail[i].rubbish_count)
                    }
                    _this.languageData.rows.push(temp)
                    _this.rubbishCount += parseInt(response.data.detail[i].rubbish_count)
                }
                if (response.data.detail[i].ai_type === 6){
                    let temp = {
                        "lang": "水质污染",
                        "number": parseInt(response.data.detail[i].rubbish_count)
                    }
                    _this.languageData.rows.push(temp)
                    _this.rubbishCount += parseInt(response.data.detail[i].rubbish_count)
                }
                if (response.data.detail[i].ai_type === 7){
                    let temp = {
                        "lang": "河面油污",
                        "number": parseInt(response.data.detail[i].rubbish_count)
                    }
                    _this.languageData.rows.push(temp)
                    _this.rubbishCount += parseInt(response.data.detail[i].rubbish_count)
                }
                if (response.data.detail[i].ai_type === 8){
                    let temp = {
                        "lang": "河道侵占",
                        "number": parseInt(response.data.detail[i].rubbish_count)
                    }
                    _this.languageData.rows.push(temp)
                    _this.rubbishCount += parseInt(response.data.detail[i].rubbish_count)
                }
                if (response.data.detail[i].ai_type === 9){
                    let temp = {
                        "lang": "非法船只",
                        "number": parseInt(response.data.detail[i].rubbish_count)
                    }
                    _this.languageData.rows.push(temp)
                    _this.rubbishCount += parseInt(response.data.detail[i].rubbish_count)
                }
                if (response.data.detail[i].ai_type === 10){
                    let temp = {
                        "lang": "岸边行人",
                        "number": parseInt(response.data.detail[i].rubbish_count)
                    }
                    _this.languageData.rows.push(temp)
                    _this.rubbishCount += parseInt(response.data.detail[i].rubbish_count)
                }
                if (response.data.detail[i].ai_type === 11){
                    let temp = {
                        "lang": "岸边垃圾",
                        "number": parseInt(response.data.detail[i].rubbish_count)
                    }
                    _this.languageData.rows.push(temp)
                    _this.rubbishCount += parseInt(response.data.detail[i].rubbish_count)
                }

            }

        }
          _this.currentRubbishImg = response.data.url;
          _this.cueerntRubbishTitle = "辖区河道当前信息采集：" + _this.rubbishCount.toString()
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCurrentWeed () {
      let url = config.ROOT_API_URL + "/pc/latest/weed/detail/";
      let _this = this;
      this.$axios.get(url, {
        params: {
          cityId: localStorage.getItem("cityId")
        }
      }).then(function (response) {
        if (response.retCode ===0) {
          let weedCount = response.data.detail[0]["weed_count"];
          _this.waterPlantsData.rows =[
            { '水葫芦': parseInt(0.2*weedCount), '浮萍': parseInt(0.3*weedCount),
              '水华': parseInt(0.4*weedCount), '其他': weedCount-parseInt(0.4*weedCount)-
                      parseInt(0.3*weedCount)-parseInt(0.2*weedCount)},
          ];
          _this.currentPlantImg = response.data.url;
          _this.cueerntPlantTitle = "辖区河道当前水草：" + weedCount.toString()
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getFloatList () {
      let url = config.ROOT_API_URL + "/pc/float/list/";
      let _this = this;
      this.$axios.get(url, {
        params: {
          cityId: localStorage.getItem("cityId")
        }
      }).then(function (response) {
        if (response.retCode ===0) {
          _this.flotagelist = [];
          for (let i=0; i<response.data.length; i++) {
            let float_type="";
            if (response.data[i].ai_type === 1) {
                float_type = "垃圾类型"
            }
            if (response.data[i].ai_type === 2) {
                  float_type = "水草类型"
            }
            if (response.data[i].ai_type === 3) {
                float_type = "树枝类型"
            }
            if (response.data[i].ai_type === 4) {
                float_type = "死鱼"
            }
            if (response.data[i].ai_type === 5) {
                float_type = "动物尸体"
            }if (response.data[i].ai_type === 6) {
                float_type = "水质污染"
            }
            if (response.data[i].ai_type === 7) {
                float_type = "河面油污"
            }
            if (response.data[i].ai_type === 8) {
                float_type = "河道侵占"
            }
            if (response.data[i].ai_type === 9) {
                float_type = "非法船只"
            }
            if (response.data[i].ai_type === 10) {
                float_type = "岸边行人"
            }
            if (response.data[i].ai_type === 11) {
                float_type = "岸边垃圾"
            }
            let temp = {
              "code": response.data[i].id,
              "type": float_type,
              "area": response.data[i].ai__track__river__name,
              "long": response.data[i].ai__longitude,
              "lati": response.data[i].ai__latitude,
              "admin": response.data[i].ai__track__river__river_group__user__name,
            };
            _this.flotagelist.push(temp)
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getRubbishCount();
    this.getWeedCount();
    this.getCurrentRubbish();
    this.getCurrentWeed();
    this.getFloatList();
  },
  beforeDestroy() {
    clearInterval(this.timerHistoryRubbish);
    clearInterval(this.timerHistoryWeed);
    clearInterval(this.timerCurrentRubbish);
    clearInterval(this.timerCurrentWeed);
    clearInterval(this.timerFloatList)

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
.plant_child {
  margin-top: 50px;
}
</style>
