<template>
  <div class="l-data-page" ref="faultTree">
    <dheader title="实时监控视频"></dheader>
    <div class="video-view"></div>
    <v-liveplayer ref="myvideo" h5id='1' class="video-player vjs-custom-skin"
                  style="position:absolute; left:7.5%; right:7.5%; top:160px; bottom:160px; height: 78%;width: 85%"></v-liveplayer>
    <el-button style="position:absolute;left:48%;top:10%" type="primary" @click="clickGeneratePicture">截图</el-button>
    <dleft style="position:absolute;left:0;top:10%" :isLeft="true"></dleft>
    <dleft style="position:absolute;right:0;top:10%" :isLeft="false"></dleft>
    <dfooter style="position:absolute;left:0;bottom:0"></dfooter>
  </div>

</template>

<script>
import dheader from "./dheader";
import dfooter from "./dfooter";
import dleft from "./dfooter/dleft";
import config from "../../config/config";
import eventBus from "../../config/EventBus";
import Liveplayer from '@/components/liveplayer';
import {baseUrl, env} from "../../env";

import html2canvas from "html2canvas"
export default {
  components: {
    dheader,
    dfooter,
    dleft,
    'v-liveplayer': Liveplayer
  },
  data () {
    return {
      isShow: false,
      pageShow: true,
      personalData: {},
      numberData: {},
      username: "",
      im: '',
      ryToken: "",
      curPlayToken:"",
      shipList: [],
      rtspsrcs: [],
      ryshipList:[],
      cityId: localStorage.getItem("cityId"),
      dataURL:"",
    };
  },
  created () {
    this.$axios.default.withCredentials = false
  },
  methods: {
    clickGeneratePicture() {
      let ref = this.$refs.faultTree; // 截图区域
      html2canvas(ref, {
        backgroundColor: "#142E48",
        // useCORS: true, //支持图片跨域
        // scale: 1, //设置放大的倍数
        // height: document.getElementById('dialog').scrollHeight,
        // windowHeight: document.getElementById('dialog').scrollHeight
      }).then(canvas => {
            let dataURL = canvas.toDataURL("image/png");
            this.dataURL = dataURL;
            let creatDom = document.createElement("a");
            document.body.appendChild(creatDom);
            creatDom.href = dataURL;
            creatDom.download= "截图成功了哟";
            creatDom.click();
          })
          // .catch(function (error) {
          //   console.log(error)
          // })
    },

    getShipList: function () {
      let url = config.ROOT_API_URL + '/pc/ship/list/';
      let _this = this;
      this.$axios.get(url, {
        params: {
          cityId: _this.cityId
        }
      }).then(function (response) {
        _this.shipList = response.data;
        console.log("三屏获取无人船列表数据,", response.data);
        for (var i=0;i<_this.shipList.length;i++){
          if(_this.shipList[i].zipStreamAddress != null){
            _this.delRtspSrc(_this.shipList[i].number)
            _this.addRtspSrc(_this.shipList[i].number, _this.shipList[i].zipStreamAddress)
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    PlayVideo(token) {
      console.log("play video"+token);
      this.$refs.myvideo.PlayVideo(token);
    },
    delRtspSrc: function(token){
      let url  = baseUrl+'/api/v1/DelSrc'
      this.$axios.get(url, {
        params: {
          token: token
        }
      }).then(function (response) {
        console.log("delsrc:"+token+","+response.bStatus);
      }).catch(function (error) {
        console.log(error)
      })
    },
    getRtspInfo: function () {
      let url = baseUrl+'/api/v1/GetSrc'
      let _this = this
      this.$axios.get(url, {
        params: {
          getonline: "true"
        }
      }).then(function (rtspSrcs) {
        console.log(rtspSrcs.src)
        _this.rtspsrcs = rtspSrcs.src
        for(var i=0;i<rtspSrcs.src.length;i++ ){
          console.log("rtsp src:"+rtspSrcs.src[i])
        }
        _this.getShipList()
      }).catch(function (error) {
        console.log(error)
      })
    },
    addRtspSrc: function(ship_number,rtspSrc){
      let url = baseUrl+'/api/v1/AddSrcRTSP'
      this.$axios.get(url, {
        params: {
          name:'RTSP'+ship_number,
          token:ship_number,
          user:'admin',
          password:'admin12345',
          url:rtspSrc,
          audio:'false'
        }
      }).then(function (response) {
        console.log("add src:"+rtspSrc+","+response.bStatus)
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted() {
    this.getRtspInfo()
    eventBus.$on("shipInfoList", value => {
      if (value.length>0) {
        this.ryshipList = value
      }
    })
    eventBus.$on("chooseShipNum", value => {
      console.log("三屏播放器监听地图选择", value);
      for(let i=0; i<this.shipList.length; i++) {
        if (this.shipList[i].number === value) {
          this.curPlayToken = this.shipList[i].shipNum
          console.log("当前播放流媒地址为", this.shipList[i].zipStreamAddress)
          console.log("当前playtoken:"+value)
          if (env.NODE_ENV === 'development') {
            this.PlayVideo('test');
            // this.PlayVideo(value);
          } else if (env.NODE_ENV === 'production') {
            this.PlayVideo(value);
          }
          break
        }
      }
    })
  },
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
      width: 44em;
      height: 24em;
      background: url(../../assets/data/rec-box.png) center;
    }
  }
  .video-view {
    background: url(https://qingfang.oss-cn-hangzhou.aliyuncs.com/155.png)
    no-repeat;
    width: 100%;
    height: 100%;
    margin-top: -8.5em;
    background-size: 100%;
  }
}
</style>
