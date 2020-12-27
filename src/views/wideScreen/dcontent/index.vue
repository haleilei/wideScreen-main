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
              <li :style="`${animate==true?`transition: all 0.5s;transform: scale(${(140-Math.abs(((9-index)*10)))/100});`:``}`" v-for='(item,index) in items' :key="index"><span>测试测试{{item.name}}</span></li>
            </ul>
          </div>
        </div>
        <div class="no-p-ship bottom">
          <div class="no-p-ship-title">河长
            <img src="../../../assets/data/titleBottom.png" alt="">
          </div>
          <div id="box">
            <ul id="con2" ref="con2" :class="{anim:animate==true}">
              <li :style="`${animate==true?`transition: all 0.5s;transform: scale(${(140-Math.abs(((6-index)*10)))/100});`:``}`" v-for='(item,index) in items' :key="index"><span>测试测试{{item.name}}</span></li>
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
              <div style="background-color:#cf5e4d"></div>偏离
            </div>
<!--            <div class="row">-->
<!--              <div style="background-color:#cdc355"></div>待机-->
<!--            </div>-->
<!--            <div class="row">-->
<!--              <div style="background-color:#8866e0"></div>打扰垃圾-->
<!--            </div>-->
            <div class="row">
              <div style="background-color:#00ff42"></div>在轨
            </div>
<!--            <div class="row">-->
<!--              <div style="background-color:#00beff"></div>非法行为-->
<!--            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="content-box">
      <databox title="水质统计" :dheight="400" style="width:49.2%" :icon="'account'">
        <ve-histogram :data="chartData" :extend="chartExtends" style="margin:0 auto" width="96%" height="420px"></ve-histogram>
        <nodata nodata="暂无统计数据" v-if="chartData.length==0"></nodata>
      </databox>
      <databox title="实时监控<span style='color:#00FF42'>（20s）</span>" :dheight="400" style="width:49.2%" :icon="'account'">
        <template style="height:350px;width:100%;padding:0;">
          <div style="height:350px;width:100%;padding:0;">
            <video id="my-player" class="video-js vjs-default-skin vjs-big-play-centered" preload="auto" autoplay style="width: 100%;height: 100%;" controls data-setup='{"html5" : { "nativeTextTracks" : false }}'>
              <source src="videoSrc" type="rtmp/flv">
            </video>

            <!-- <video-player class="video-player vjs-custom-skin" width="100%" height="100%" ref="videoPlayer" :playsinline="true" :options="videoOpt"></video-player> -->
          </div>
        </template>
        <!-- <nodata nodata="暂无监控画面" v-if="noMyevent"></nodata> -->
      </databox>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import 'videojs-contrib-hls.js/src/videojs.hlsjs';
import echarts from "echarts";
import BMap from "@/components/BMap.vue";
import videojs from 'video.js'
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
    }
    return {
      videoPlayer: undefined,
      videoSrc: '',
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
      videoOpt: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        html5: { hls: { withCredentials: false } },
        sources: [{
          type: "",
          src: "https://ivi.bupt.edu.cn/hls/cctv5phd.m3u8" //url地址
        }],
        poster: "", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true  //全屏按钮
        }
      },
      chartData: {
        columns: ['日期', '柱'],
        rows: [
          { '日期': '7-12', '柱': 50, '线': 50, },
          { '日期': '7-13', '柱': 45, '线': 45, },
          { '日期': '7-14', '柱': 35, '线': 35, },
          { '日期': '7-15', '柱': 46, '线': 46, },
          { '日期': '7-16', '柱': 60, '线': 60, },
          { '日期': '7-17', '柱': 55, '线': 55, }
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
        { name: "0" },
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
        { name: "6" },
        { name: "7" },
        { name: "8" },
        { name: "9" },
        { name: "10" },
        { name: "11" },
        { name: "12" },
        { name: "13" },
        { name: "14" },
        { name: "15" },
        { name: "16" },
        { name: "17" },
        { name: "18" },
        { name: "19" },
        { name: "20" }
      ]
    };
  },
  created () {
    setInterval(this.scroll, 2000)
  },
  methods: {
    selectVideo () {
      this.videoSrc = 'rtmp://live.hkstv.hk.lxdns.com/live/hks';
      const videoPlayer = videojs('my-player');// 关联video标签的id
      videoPlayer.src({
        src: this.videoSrc,
        type: 'rtmp/flv'
      });
      videoPlayer.play();
    },
    scroll () {
      this.animate = true;
      setTimeout(() => {
        this.items.push(this.items[0]);
        this.items.shift();
        this.animate = false;
      }, 1000)
    },
    getData (username) {
      let comUrl = "/api/users/";
      let url1 = comUrl + username + "/events";
      let url2 = comUrl + username + "/repos";
      this.$axios
        .all([this.$axios.get(url1), this.$axios.get(url2)])
        .then(
          this.$axios.spread((res1, res2) => {
            //我最近操作
            let data1 = JSON.parse(JSON.stringify(res1.data));
            if (data1.length < 1) {
              this.noMyevent = true;
            } else {
              this.myevent = data1;
              //console.log(this.myevent)
            }

            //每个仓库的大小
            let data2 = JSON.parse(JSON.stringify(res2.data));
            if (data2.length < 1) {
              this.noRepoSize = true;
            } else {
              let dataR = [];
              for (var i = 0; i < data2.length; i++) {
                let reposName = data2[i].name;
                let size = data2[i].size;
                let forks = data2[i].forks;
                let objR = {
                  reposName: reposName,
                  size: size,
                  forks: forks
                };
                dataR.push(objR);
              }
              //console.log(dataR);
              this.repoData.rows = dataR;
              //console.log(this.repoData.rows)
            }

            return;
          })
        )
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
</style>
