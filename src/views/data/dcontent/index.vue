<template>
  <div class="content-cont">
    <div class="top-box">
      <div class="left">
        <div class="no-p-ship top">
          <div class="no-p-ship-title">无人船编号
            <img src="../../../assets/data/titleBottom.png" alt="">
          </div>
          <div id="box">
            <ul id="con1" ref="con1" :class="{anim:animate==true}">
              <li :style="`${animate==true?`transition: all 0.5s;transform: scale(${(140-Math.abs(((9-index)*10)))/100});`:``}`" v-for='(item,index) in items' :key="index"><span>{{item.name}}</span></li>
            </ul>
          </div>
        </div>
        <div class="no-p-ship bottom">
          <div class="no-p-ship-title">河长
            <img src="../../../assets/data/titleBottom.png" alt="">
          </div>
          <div id="box">
            <ul id="con2" ref="con2" :class="{anim:animate==true}">
              <li :style="`${animate==true?`transition: all 0.5s;transform: scale(${(140-Math.abs(((6-index)*10)))/100});`:``}`" v-for='(item,index) in admins' :key="index"><span>{{item.user__name}}</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="content">
          <b-map ref="setAddress"></b-map>
          <!-- <ve-map :data="mapData" :settings="mapSettings" height="100%" :extend="mapExtend"></ve-map> -->
          <div class="i-maker">
            <div class="row">
              <div style="background-color:#00ff42"></div>在轨
            </div>
            <div class="row">
              <div style="background-color:#cf5e4d"></div>偏离
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content-box">
      <databox :title="currentShipTitle" :dheight="400" style="width:49.2%" :icon="'account'">
        <div style="display:flex;width:100%;height:320px" align="center">
          <div style="width:27%" class="ship-info">
            <ul>
              <li>
                <div style="color: #28ebf3">工作时间</div>
                <div style="color: #e63b18; font-size: 15px">{{parseInt(currentShipInfo.navigation_time/1000) + "秒"}}</div>
              </li>
              <li>

              </li>
              <li>
                <div style="color: #28ebf3">当前经度</div>
                <div style="color: #e63b18; font-size: 15px">{{parseFloat(currentShipInfo.longitude).toFixed(4)}}</div>
              </li>
              <li>
                <div style="color: #28ebf3">当前纬度</div>
                <div style="color: #e63b18; font-size: 15px">{{parseFloat(currentShipInfo.latitude).toFixed(4)}}</div>
              </li>
              <li>
                <div style="color: #28ebf3">水深距离</div>
                <div style="color: #e63b18; font-size: 15px">{{parseInt(currentShipInfo.waterDistance)+"mm"}}</div>
              </li>
              <li>
<!--                <div style="color: #28ebf3">东向速度</div>-->
<!--                <div style="color: #e63b18">{{parseFloat(currentShipInfo.velocity_east).toFixed(2)+ "m/s"}}</div>-->
                <div style="color: #28ebf3">船身速度</div>
                <div style="color: #e63b18; font-size: 15px">{{parseFloat(currentShipInfo.speed).toFixed(2)+ "m/s"}}</div>
              </li>
              <li>
                <div style="color: #28ebf3">航向角</div>
                <div style="color: #e63b18; font-size: 15px">{{parseFloat(currentShipInfo.angle_north).toFixed(2)+ "°"}}</div>
              </li>
                <li>
                    <div style="color: #28ebf3">地点</div>
                    <div style="color: #e63b18;  font-size: 15px">{{address}}</div>
                </li>
            </ul>
          </div>
          <div style="width:46%">
            <img style="width:100%;height:80%" src="../../../assets/data/ship.png" alt="">
          </div>
          <div style="width:27%" class="ship-info">
            <ul class="reverse">
              <li>
                <div style="color: #28ebf3">俯仰角</div>
                <div style="color: #e63b18; font-size: 15px">{{parseFloat(currentShipInfo.pitch_angle).toFixed(2)+ "°"}}</div>
              </li>
              <li>
                <div style="color: #28ebf3">横滚角</div>
                <div style="color: #e63b18; font-size: 15px">{{parseFloat(currentShipInfo.rolling_angle).toFixed(2)+ "°"}}</div>
              </li>
              <li>
                <div style="color: #28ebf3">电池数量</div>
                <div style="color: #e63b18; font-size: 15px">{{currentShipInfo.batteryNum}}</div>
              </li>
              <li>
                <div style="color: #28ebf3">平均电量</div>
                <div style="color: #e63b18; font-size: 15px">{{parseInt(currentShipInfo.soc_mean)}}</div>
              </li>
              <li>
                <div style="color: #28ebf3">剩余航程</div>
                <div style="color: #e63b18; font-size: 15px">{{currentShipInfo.remainMiles}}</div>
              </li>
              <li>
                <div style="color: #28ebf3">公里耗电量</div>
                <div style="color: #e63b18; font-size: 15px">{{currentShipInfo.soc_per_kilo}}</div>
              </li>
                <li>
                    <div style="color: #28ebf3">天气</div>
                    <div style="color: #e63b18; font-size: 15px">{{weather}}</div>
                </li>
            </ul>
          </div>
        </div>
<!--        <ve-histogram :data="chartData" :extend="chartExtends" style="margin:0 auto" width="96%" height="420px"></ve-histogram>-->
<!--        <nodata nodata="暂无统计数据" v-if="chartData.length==0"></nodata>-->
      </databox>
      <databox :title="currentShipTitleCamera" :dheight="400" style="width:49.2%" :icon="'account'">
        <template style="height:350px;width:100%;padding:0;">
          <div style="height:350px;width:100%;padding:0;">
<!--            <video id="myPlayer" style="width: 100%;height: 100%;" controls autoplay>-->
<!--              <source src="rtmp://58.200.131.2:1935/livetv/hunantv" type="" />-->
<!--&lt;!&ndash;              <source src="" type="" />&ndash;&gt;-->
<!--            </video>-->
            <video-player  class="video-player vjs-custom-skin"
                           ref="videoPlayer"
                           :playsinline="true"
                           :options="playerOptions"
                            style="height: 100%;width: 100%"></video-player>
          </div>
        </template>
      </databox>
    </div>
  </div>
</template>

<script>
// import "video.js/dist/video-js.css";
// import "vue-video-player/src/custom-theme.css";
// import 'videojs-contrib-hls.js/src/videojs.hlsjs';
import 'video.js/dist/video-js.css' // 引入样式
import 'vue-video-player/src/custom-theme.css' // 引入样式
import 'videojs-flash'
import echarts from "echarts";
import BMap from "@/components/BMap.vue";
// import videojs from 'video.js'
import config from '../../../config/config'
import eventBus from "../../../config/EventBus"
export default {
  props: {
    numberData: Object,
    username: String
  },
  components: { BMap },
  data () {
    this.mapExtend = {
      tooltip: {
        show: true,
        trigger: 'item',
        triggerOn: 'click',
        formatter: "名称:{b}"
      },
      legend: {
        // formatter: function (name) {
        //   console.log(name)
        //   return echarts.format.truncateText(name, 40, '14px Microsoft Yahei', '…');
        // },
        tooltip: {
          show: true
        },
        type: "plain",
        show: true,
        backgroundColor: "red",
        orient: 'vertical',
        top: 'middle',
        right: '15%',
        data: [
          {
            name: "瑞安市",
            icon: "circle",
            textStyle: {
              color: "#a9d6fa"
            }
          },
          {
            name: "平阳县",
            icon: "circle",
            textStyle: {
              color: "#a9d6fa"
            }
          },
          {
            name: "文成县",
            icon: "circle",
            textStyle: {
              color: "#a9d6fa"
            }
          },
          {
            name: "药品安全分布",
            icon: "circle",
            textStyle: {
              color: "#a9d6fa"
            }
          }
        ]
      },
      visualMap: {
        show: false,
        min: 0, //最小值
        max: 10, //最大值
        calculable: true, //是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
        inRange: {
          color: [
            "#0487ED",
            "#C7C52C",
            "#E26B5B",
            "#3EB177",
            "#794EDC",
            "#B46B2A"
          ] //颜色
        },
        textStyle: {
          color: "#fff"
        }
      },
      series: {
        itemStyle: {
          normal: {
            areaColor: "#39c2e5",
            borderColor: "rgba(27, 94, 79, 1)",
            borderWidth: 1
          }
        },
        label: {
          show: true,
          fontSize: 14,
          color: "#fff"
        },
        data: [
          { name: "瑞安市", selected: false, value: 1 },
          { name: "平阳县", selected: false, value: 2 },
          { name: "文成县", selected: false, value: 3 },
        ]
      }
    };
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      },
      legend: {
        textStyle: { color: "#fff" },
        right: "6%"
      },
      yAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
      },
      xAxis: {
        axisLabel: {
          textStyle: {
            color: "#fff"
          }
        }
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
    };
    return {
      videoPlayer: undefined,
      videoSrc: '',
      cityId: 0,
      timerShipList: null,
      timerRiverGroupList: null,
      mapSettings: {
        zoom: 10,
        position: "province/zhejiang",
        selectData: true,
        center: [120.57, 27.67],
        // selectedMode: "multiple",
        roam: true,
        mapOrigin: require('../../../assets/map.json'),
        labelMap: {
          name: "地区",
          value: "人口"
        }
      },
      mapData: {
        columns: ["name", "value"],
        rows: [
          { name: "济南市", value: 1 },
          { name: "青岛市", value: 2 },
          { name: "潍坊市", value: 3 },
          { name: "烟台市", value: 4 },
          { name: "菏泽市", value: 5 },
          { name: "枣庄市", value: 6 }
        ]
      },
      chartData: {
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
      myevent: [],
      noMyevent: false,
      repoData: {
        columns: ["reposName", "size", "forks"],
        rows: []
      },
      noRepoSize: false,
      animate: false,
      items: [
      ],
      admins: [
      ],
      currentShipNum: null,
      currentShipTitle: "船运动信息",
      currentShipTitleCamera: "船实时监控",
      currentShipRtmp: null,
      curentShipMonitorinUrls: [],
      address: null,
      weather: null,
      currentShipInfo: {
        angle_north: 0.00,
        height: 0.00,
        inTrack: 0,
        latitude: 0.0,
        longitude: 0.0,
        navigation_time: 0,
        no_sv: 0,
        pitch_angle: 0.0,
        rolling_angle: 0.0,
        batteryNum: 0,
        remainMiles: "0.0 km",
        soc_mean: 0.0,
        soc_per_kilo: 0.0,
        speed: 0.0,
        velocity_east: 0.0,
        velocity_north: 0.0,
        velocity_universe: 0.0,
        waterDistance: 0,
        waterDistanceWarn: 0
      },
      shipInfoList: [],
      shipDetailList: [],
      playerOptions: {
        // 播放速度
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        // 如果true,浏览器准备好时开始回放。
        autoplay: false,
        // 默认情况下将会消除任何音频。
        muted: false,
        // 导致视频一结束就重新开始。
        loop: false,
        // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        preload: 'auto',
        language: 'zh-CN',
        // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        aspectRatio: '16:9',
        // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器.
        fluid: true,
        sources: [{
          // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
          type: 'rtmp/mp4',
          // url地址
          // src: 'http://vd2.bdstatic.com/mda-ijufs1h3n23zu1h0/sc/mda-ijufs1h3n23zu1h0.mp4'
          src: ''
        }],
        techOrder: ['flash'],
        // 你的封面地址
        // poster: "../../static/images/test.jpg",
        // 播放器宽度
        // width: 0.2 * document.documentElement.clientWidth,
        // height: document.documentElement.clientHeight,
        // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        notSupportedMessage: '此视频暂无法播放，请稍后再试',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          // 全屏按钮
          fullscreenToggle: true
        }
      },

    };
  },
  created () {
    setInterval(this.scroll, 2000);
    // setInterval(this.weatherInfo, 5000)
  },
  mounted () {
    this.$nextTick(function () {
      this.cityId = localStorage.getItem("cityId");
      this.getShipList();
      this.getRiverGroupList();
      this.timerShipList = setInterval(this.getShipList, 10*1000);
      this.timerRiverGroupList = setInterval(this.getRiverGroupList, 60*1000);
      eventBus.$on("shipInfoList", value => {
        // console.log("实时动态监听融云发送数据,", value);
        if(value.length>0){
          this.shipInfoList = value;
          // 更新船的实时信息
          if (this.currentShipNum !==null) {
            for (let i=0; i<value.length; i++) {
              if(value[i].shipNum===this.currentShipNum) {
                // console.log("我更新了，shipNum=", this.currentShipNum);
                this.currentShipInfo = value[i];
                // console.log(this.currentShipInfo);
                // TODO production code  suo/20200818
                if (this.currentShipInfo.water_quality) {
                  console.log(this.currentShipInfo.water_quality.c_time);
                  eventBus.$emit("UpdateWaterQuantity", {
                     shipNum: this.currentShipNum,
                     quality: this.currentShipInfo.water_quality,
                  });
                }
                // TODO test code  suo/20200818
                // eventBus.$emit("UpdateWaterQuantity", {
                //   shipNum: this.currentShipNum,
                //   quality: {
                //     c_time: new Date().getTime(),
                //     NH3: Math.round(Math.random() * 30),
                //     NH4: Math.round(Math.random() * 10),
                //     K: Math.round(Math.random() * 5)
                //   }
                // });
                break
              }
            }
          }
        }
      });
      eventBus.$on("chooseShipNum", value => {
        console.log("监听地图选择船只事件, value=", value);
        if(this.currentShipNum !== value) {
          // 获取title
          this.currentShipNum = value;
          this.currentShipTitle = value + "船实时运动信息";
          this.currentShipTitleCamera = value + "船实时监控";
          // 获取实时信息
          if (this.shipInfoList.length>0) {
            for (let i=0; i<this.shipInfoList.length;i++) {
              if (this.shipInfoList[i].shipNum===value) {
                this.currentShipInfo = this.shipInfoList[i];
                break
              }
            }
          }
          // 获取流地址
          console.log("打印items 长度", this.items.length);
          if(this.items.length>0){
            for (let i=0; i<this.items.length;i++) {
              if (this.items[i].number ===value){
                this.currentShipRtmp = this.items[i].streamAddress;
                console.log("当前流地址为", this.currentShipRtmp);
                this.playerOptions.sources[0].src = this.currentShipRtmp;
                break
              }
            }
          }

          // console.log("当前流地址为:", _this.currentShipRtmp);
          for (let i = 0; i < this.shipDetailList.length;  i++) {
            if (this.currentShipNum === this.shipDetailList[i].number) {
              eventBus.$emit("selectedNewShip", {
                currentShipNum: this.currentShipNum,
                monitoringURLs: this.shipDetailList[i]['videoList'],
                pipelineVideoURLs: this.shipDetailList[i].pipelineVideoList
              });
              break;
            }
          }
        }
      })
    });
  },
  methods: {
    scroll () {
      this.animate = true;
      setTimeout(() => {
        this.items.push(this.items[0]);
        this.items.shift();
        this.admins.push(this.admins[0]);
        this.admins.shift();
        this.animate = false;
      }, 1000)
    },
    getShipList () {
      let url = config.ROOT_API_URL + '/pc/ship/list/';
      let _this = this;
      this.$axios.get(url, {
        params: {
          cityId: _this.cityId
        }
      }).then(function (response) {
        _this.items = response.data;
        _this.shipDetailList = _this.items;
        // console.log("获取无人船列表数据,", response.data);
        if(_this.currentShipNum===null && _this.items.length>0) {
          _this.currentShipNum = _this.items[_this.items.length-1].number;
          _this.currentShipTitle = _this.items[_this.items.length-1].number + "船实时运动信息";
          _this.currentShipTitleCamera = _this.items[_this.items.length-1].number + "船实时监控";
          _this.currentShipRtmp = _this.items[_this.items.length-1].streamAddress;
          _this.playerOptions.sources[0].src = _this.currentShipRtmp;
          _this.curentShipMonitorinUrls = _this.items[_this.items.length-1]['videoList'];
        }
        // console.log("当前流地址为:", _this.currentShipRtmp);
        for (let i = 0; i < _this.shipDetailList.length;  i++) {
          if (_this.currentShipNum === _this.shipDetailList[i].number) {
            eventBus.$emit("selectedNewShip", {
              currentShipNum: _this.currentShipNum,
              monitoringURLs: _this.shipDetailList[i]['videoList'],
              pipelineVideoURLs: _this.shipDetailList[i].pipelineVideoList
            });
            break;
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getRiverGroupList () {
      let url = config.ROOT_API_URL + "/pc/river_group/info_list/";
      let _this = this;
      this.$axios.get(url, {
        params: {
          cityId: _this.cityId
        }
      }).then(function (response) {
        _this.admins = response.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    weatherInfo: function () {
        console.log("匹配船只.........")
        console.log(this.currentShipNum.search(/00/))
        if (this.currentShipNum.search(/00/) > -1) {
            let url = config.ROOT_API_URL + "/pc/weather/";
            let _this = this;
            this.$axios.get(url, {
                params: {
                    "lat": _this.currentShipInfo.latitude.toString(),
                    "lng": _this.currentShipInfo.longitude.toString()
                }
            }).then(function (response) {
                console.log("获取无人船地理位置以及天气状态");
                console.log(response)
                _this.address = response["data"]["cityData"]
                _this.weather = response["data"]["weatherData"]
                console.log("==========获取无人船地理位置以及天气状态   END=======");
            }).catch(function (error) {
                console.log("获取无人船地理位置和天气出错，error=", error)
            })
        }
    }


  },
  beforeDestroy() {
    clearInterval(this.timerShipList);
    clearInterval(this.timerRiverGroupList)
  },
  beforeMount() {
  }
};
</script>

<style lang="scss">
.content-cont {
  width: 100%;
  height: 100%;
  .top-box {
    display: flex;
    width: 100%;
    height: 981px;
    overflow: hidden;
    .left {
      width: 18%;
    }
    .right {
      flex: 1;
      padding-left: 15px;
      .content {
        position: relative;
        width: 100%;
        height: 98%;
        background: rgba(35, 72, 135, 0.4);
        .i-maker {
          color: #fff;
          font-size: 17px;
          position: absolute;
          right: 40px;
          bottom: 40px;
          // height: 50px;
          width: 100px;
          .row {
            padding: 5px 0;
            display: flex;
            align-items: center;
            div {
              width: 45px;
              height: 25px;
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
  .content-box {
    display: flex;
    justify-content: space-between;
  }
}
.no-p-ship {
  &.top {
    height: 55.5%;
  }
  &.bottom {
    height: 41%;
  }
  margin-bottom: 16px;
  background: url(../../../assets/data/num-mask.png) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  .no-p-ship-title {
    position: relative;
    height: 57px;
    line-height: 57px;
    text-align: center;
    color: #a9ddee;
    font-size: 18px;
    img {
      position: absolute;
      width: 70%;
      left: 15%;
      height: 1px;
      bottom: 0;
    }
  }
}
#box {
  width: 100%;
  height: calc(100% - 57px);
  overflow: hidden;
  text-align: center;
}
.anim {
  transition: all 0.5s;
  margin-top: -30px;
}
#con1 li {
  color: #ffffff;
  list-style: none;
  line-height: 30px;
  height: 30px;
  font-size: 12px;
  &:nth-child(0) {
    transform: scale(0.5);
  }
  &:nth-child(1) {
    transform: scale(0.6);
  }
  &:nth-child(2) {
    transform: scale(0.7);
  }
  &:nth-child(3) {
    transform: scale(0.8);
  }
  &:nth-child(4) {
    transform: scale(0.9);
  }
  &:nth-child(5) {
    transform: scale(1);
  }
  &:nth-child(6) {
    transform: scale(1.1);
  }
  &:nth-child(7) {
    transform: scale(1.2);
  }
  &:nth-child(8) {
    transform: scale(1.3);
  }
  &:nth-child(9) {
    transform: scale(1.4);
  }
  &:nth-child(10) {
    transform: scale(1.3);
  }
  &:nth-child(11) {
    transform: scale(1.2);
  }
  &:nth-child(12) {
    transform: scale(1.1);
  }
  &:nth-child(13) {
    transform: scale(1);
  }
  &:nth-child(14) {
    transform: scale(0.9);
  }
  &:nth-child(15) {
    transform: scale(0.8);
  }
  &:nth-child(16) {
    transform: scale(0.7);
  }
  &:nth-child(17) {
    transform: scale(0.6);
  }
  &:nth-child(18) {
    transform: scale(0.5);
  }
}
#con2 li {
  color: #ffffff;
  list-style: none;
  line-height: 30px;
  height: 30px;
  font-size: 12px;
  &:nth-child(0) {
    transform: scale(0.8);
  }
  &:nth-child(1) {
    transform: scale(0.9);
  }
  &:nth-child(2) {
    transform: scale(1);
  }
  &:nth-child(3) {
    transform: scale(1.1);
  }
  &:nth-child(4) {
    transform: scale(1.2);
  }
  &:nth-child(5) {
    transform: scale(1.3);
  }
  &:nth-child(6) {
    transform: scale(1.4);
  }
  &:nth-child(7) {
    transform: scale(1.3);
  }
  &:nth-child(8) {
    transform: scale(1.2);
  }
  &:nth-child(9) {
    transform: scale(1.1);
  }
  &:nth-child(10) {
    transform: scale(1);
  }
  &:nth-child(11) {
    transform: scale(0.9);
  }
  &:nth-child(12) {
    transform: scale(0.8);
  }
  &:nth-child(13) {
    transform: scale(0.7);
  }
  &:nth-child(14) {
    transform: scale(0.6);
  }
  &:nth-child(15) {
    transform: scale(0.5);
  }
}
.video-js .vjs-icon-placeholder {
    width: 100%;
    height: 100%;
    display: block;
}
</style>
