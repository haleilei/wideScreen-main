<template>
  <el-container>
    <el-header id="main_0" height="100px">
      <p id="labname">翌明科技水质分析</p>
    </el-header>
    <div class="block">
      <el-date-picker
              size="mini"
              v-model="dataTime"
              type="date"
              placeholder="选择日期">
      </el-date-picker>
    </div>
    <div id="level">
      <el-select v-model="level" placeholder="请选择级别" size="mini">
        <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
        </el-option>
      </el-select>
    </div>
<!--    <div id="input">-->
<!--      <el-input v-model="input" placeholder="请输入内容" size="mini"></el-input>-->
<!--    </div>-->
    <div id="search">
      <el-button type="primary" icon="el-icon-search" size="mini" @click="renderHeatMap"></el-button>
    </div>
    <el-main id="main1">
      <baidu-map :center="center" :zoom="zoom" @ready="handler" class="map" :scroll-wheel-zoom="true" mapType="BMAP_SATELLITE_MAP"
      >
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
        <bml-heatmap :data="data" :max="max" :radius="6" :gradient="gradient" v-if="show"></bml-heatmap>
        <bm-marker :position="marker_position"></bm-marker>
      </baidu-map>
    </el-main>
  </el-container>
</template>

<script>
  import {BmlHeatmap} from 'vue-baidu-map'
  import config from "../../config/config";
  export default {
    name: 'quality',
    components: {
      BmlHeatmap
    },
    data () {
      return {
        level: "",
        input: '',
        max: 10,
        marker_position: {
          lng: 0.0,
          lat: 0.0
        },
        options: [
          {value: "nh3", label: 'nh3'},
          {value: "nh4", label: 'nh4'},
          {value: "ph", label: 'ph'},
          {value: "k", label: 'k'},
        ],
        gradient: {
          0.5:'rgb(102, 255, 0)',
          .75:'rgb(255, 170, 0)',
          1:'rgb(255, 0, 0)'
        },
        data: [
          {"lng":123.418261,"lat":41.921984,"count":5.0},
          {"lng":123.423332,"lat":41.916532,"count":5.1},
          {"lng":123.419787,"lat":41.930658,"count":1.5},
          {"lng":123.418455,"lat":41.920921,"count":4.0},
          {"lng":123.418843,"lat":41.915516,"count":10.0},
          {"lng":123.42546,"lat":41.918503,"count":0.6},
          {"lng":123.423289,"lat":41.919989,"count":1.8},
          {"lng":123.418162,"lat":41.915051,"count":8.0},
          {"lng":123.422039,"lat":41.91782,"count":1.1},
          {"lng":123.41387,"lat":41.917253,"count":.7},
          {"lng":123.41773,"lat":41.919426,"count":4.2},
          {"lng":123.421107,"lat":41.916445,"count":.4},
          {"lng":123.417521,"lat":41.917943,"count":2.7},
          {"lng":123.419812,"lat":41.920836,"count":2.3},
          {"lng":123.420682,"lat":41.91463,"count":6.0},
          {"lng":123.415424,"lat":41.924675,"count":.8},
          {"lng":123.419242,"lat":41.914509,"count":1.5},
          {"lng":123.422766,"lat":41.921408,"count":2.5},
          {"lng":123.421674,"lat":41.924396,"count":2.1},
          {"lng":123.427268,"lat":41.92267,"count":.1},
          {"lng":123.417721,"lat":41.920034,"count":5.1},
          {"lng":123.412456,"lat":41.92667,"count":.7},
          {"lng":123.420432,"lat":41.919114,"count":1.1},
          {"lng":123.425013,"lat":41.921611,"count":3.5},
          {"lng":123.418733,"lat":41.931037,"count":2.2},
          {"lng":123.419336,"lat":41.931134,"count":.4},
          {"lng":123.413557,"lat":41.923254,"count":.5},
          {"lng":123.418367,"lat":41.92943,"count":.3},
          {"lng":123.424312,"lat":41.919621,"count":10.0},
          {"lng":123.423874,"lat":41.919447,"count":8.7},
          {"lng":123.424225,"lat":41.923091,"count":3.2},
          {"lng":123.417801,"lat":41.921854,"count":4.4},
          {"lng":123.417129,"lat":41.928227,"count":2.1},
          {"lng":123.426426,"lat":41.922286,"count":8.0},
          {"lng":123.421597,"lat":41.91948,"count":3.2},
          {"lng":123.423895,"lat":41.920787,"count":2.6},
          {"lng":123.423563,"lat":41.921197,"count":1.7},
          {"lng":123.417982,"lat":41.922547,"count":1.7},
          {"lng":123.426126,"lat":41.921938,"count":2.5},
          {"lng":123.42326,"lat":41.915782,"count":10.0},
          {"lng":123.419239,"lat":41.916759,"count":4.1},
          {"lng":123.417185,"lat":41.929123,"count":1.1},
          {"lng":123.417237,"lat":41.927518,"count":.9},
          {"lng":123.417784,"lat":41.915754,"count":4.7},
          {"lng":123.420193,"lat":41.917061,"count":5.2},
          {"lng":123.422735,"lat":41.915619,"count":10.0},
          {"lng":123.418495,"lat":41.915958,"count":4.6},
          {"lng":123.416292,"lat":41.931166,"count":.9},
          {"lng":123.419916,"lat":41.924055,"count":.8},
          {"lng":123.42189,"lat":41.921308,"count":1.1},
          {"lng":123.413765,"lat":41.929376,"count":.3},
          {"lng":123.418232,"lat":41.920348,"count":5.0},
          {"lng":123.417554,"lat":41.930511,"count":1.5},
          {"lng":123.418568,"lat":41.918161,"count":2.3},
          {"lng":123.413461,"lat":41.926306,"count":.3},
          {"lng":123.42232,"lat":41.92161,"count":1.3},
          {"lng":123.4174,"lat":41.928616,"count":.6},
          {"lng":123.424679,"lat":41.915499,"count":2.1},
          {"lng":123.42171,"lat":41.915738,"count":2.9},
          {"lng":123.417836,"lat":41.916998,"count":9.9},
          {"lng":123.420755,"lat":41.928001,"count":1.0},
          {"lng":123.414077,"lat":41.930655,"count":1.4},
          {"lng":123.426092,"lat":41.922995,"count":1.6},
          {"lng":123.41535,"lat":41.931054,"count":1.5},
          {"lng":123.413022,"lat":41.921895,"count":1.3},
          {"lng":123.415551,"lat":41.913373,"count":1.7},
          {"lng":123.421191,"lat":41.926572,"count":.1},
          {"lng":123.419612,"lat":41.917119,"count":.9},
          {"lng":123.418237,"lat":41.921337,"count":5.4},
          {"lng":123.423776,"lat":41.921919,"count":2.6},
          {"lng":123.417694,"lat":41.92536,"count":1.7},
          {"lng":123.415377,"lat":41.914137,"count":1.9},
          {"lng":123.417434,"lat":41.914394,"count":4.3},
          {"lng":123.42588,"lat":41.922622,"count":2.7},
          {"lng":123.418345,"lat":41.919467,"count":8.},
          {"lng":123.426883,"lat":41.917171,"count":.3},
          {"lng":123.423877,"lat":41.916659,"count":3.4},
          {"lng":123.415712,"lat":41.915613,"count":1.4},
          {"lng":123.419869,"lat":41.931416,"count":1.2},
          {"lng":123.416956,"lat":41.925377,"count":1.1},
          {"lng":123.42066,"lat":41.925017,"count":3.8},
          {"lng":123.416244,"lat":41.920215,"count":9.1},
          {"lng":123.41929,"lat":41.915908,"count":5.4},
          {"lng":123.422116,"lat":41.919658,"count":2.1},
          {"lng":123.4183,"lat":41.925015,"count":1.5},
          {"lng":123.421969,"lat":41.913527,"count":3.},
          {"lng":123.422936,"lat":41.921854,"count":2.4},
          {"lng":123.41905,"lat":41.929217,"count":1.2},
          {"lng":123.424579,"lat":41.914987,"count":5.7},
          {"lng":123.42076,"lat":41.915251,"count":7.0},
          {"lng":123.425867,"lat":41.918989,"count":.8}
        ],
        dataTime: "",
        center: {lng: 0, lat: 0},
        zoom: 15,
        show: false
      }
    },
    methods: {
      dateToString: function(date) {
        let year = date.getFullYear();
        let month =(date.getMonth() + 1).toString();
        let day = (date.getDate()).toString();
        if (month.length === 1) {
          month = "0" + month;
        }
        if (day.length === 1) {
          day = "0" + day;
        }
        let dateTimeString;
        dateTimeString = year + "-" + month + "-" + day;
        return dateTimeString;
      },
      renderHeatMap: function () {
        this.show = false
        // console.log("渲染热力图,", this.level, this.dateToString(this.dataTime))
        let url = config.ROOT_API_URL + '/pc/water/quality/';
        let _this = this;
        let data = {
          cityId: 10,
          option: _this.level,
          date: _this.dateToString(_this.dataTime)
          // option: 'nh4',
          // date: '2020-07-15'
        };
        this.$axios.get(url, {
          params: data
        }).then(function (response) {
          console.log("response", response);
          if (response.retCode===0) {
            console.log("氨氮获取数据成功.................")
            _this.data = response.data;
            _this.max = response.data[0].count;
            _this.marker_position.lat = parseFloat(_this.data[0].lat)
            _this.marker_position.lng = parseFloat(_this.data[0].lng)
            _this.show = true
          } else {
            _this.$message.error(response.retMsg)
          }
        }).catch(function (error) {
          console.log('error---------');
          console.log(error)
        })
        // this.center = {lng: 123.426883, lat: 41.921854}
      },
      handler: function ({BMap, map}) {
        console.log(BMap, map)
        this.center.lng = 116.404
        this.center.lat = 39.915
        this.zoom = 15
      }
    },
    mounted() {
      // this.renderHeatMap()
    }
  }
</script>

<style scoped>
  .map {
    width: 100%;
    height: 1580px;
  }
  .block {
    position: absolute;
    top: 38px;
    right: 460px;
    width: 80px;
  }
  #main1 {
    position: absolute;
    left: -20px;
    right: 0px;
    top: 80px;
    /*width: 100%;*/
    height: 1620px;
    /*background: #66CCCC;*/
  }
  #main_0 {
    position: absolute;
    left:0px;
    top: 0px;
    width: 100%;
    height: 200px;
    background: #66CCCC;
  }
  #labname {
    position: absolute;
    font-family: 'Arial Negreta', 'Arial';
    font-size: 30px;
    left: 5%;
    top: 30px;
    color: #0000FF;
  }
  #level {
    position: absolute;
    top: 38px;
    right: 200px;
    width: 120px;
  }
  #input {
    position: absolute;
    top: 38px;
    right: 80px;
    width: 120px;
  }
  #search {
    position: absolute;
    top: 38px;
    right: 160px;
    width: 40px;
  }
  #header0 {
    position: absolute;
    font-family: 华文宋体;
    font-size: 20px;
    left: 10%;
    top: 90px;
    height: 20px;
    color: rgba(0, 0, 0, 1.0);
  }
  #breadcrumb {
    position: absolute;
    font-family: 华文宋体;
    font-size: 15px;
    right: 10%;
    top: 110px;
    height: 20px;
    color: rgba(0, 0, 0, 1.0);
  }
  #qiyedongtai {
    position: absolute;
    font-family: 华文宋体;
    font-size: 30px;
    width: 80%;
    right: 10%;
    top: 150px;
    height: 900px;
  }
  #pagination {
    position: absolute;
    /*width: 80%;*/
    right: 30%;
    left: 30%;
    top: 1070px;
    /*height: 900px;*/
  }
  #footer {
    background-color: #4a68ff;
    position: absolute;
    left: 0;
    width: 100%;
    height: 45px;
    top:1130px;
  }
</style>