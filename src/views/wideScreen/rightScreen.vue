
<template>
  <div class="l-data-page">
    <dheader title="实时船只监控"></dheader>

    <div class="rec">
      <div class="cell">
        <div class="map">
          <b-map ref="setAddress"></b-map>
          <!-- <ve-map :data="mapData" :settings="mapSettings" height="100%" :extend="mapExtend"></ve-map> -->
          <div class="i-maker">
            <div class="row">
              <div style="background-color: #cf5e4d"></div>
              偏离
            </div>
            <!--            <div class="row">-->
            <!--              <div style="background-color:#cdc355"></div>待机-->
            <!--            </div>-->
            <!--            <div class="row">-->
            <!--              <div style="background-color:#8866e0"></div>打扰垃圾-->
            <!--            </div>-->
            <div class="row">
              <div style="background-color: #00ff42"></div>
              在轨
            </div>
            <!--            <div class="row">-->
            <!--              <div style="background-color:#00beff"></div>非法行为-->
            <!--            </div>-->
          </div>
        </div>
      </div>
      <div class="cell">
        <div class="col">
          <snap_dialog></snap_dialog>
          <wide-databox :title="title1">
            <div class="captain-box">
              <div class="selectBox" style="width: 100%">
                <div class="selectBox_show" v-on:click.stop="arrowDown">
                  <i class="icon icon_arrowDown"></i>
                  <p title="请选择">{{ unitName }}</p>
                  <input type="hidden" name="unit" />
                </div>
                <div class="selectBox_list" v-show="isShowSelect">
                  <div
                    class="selectBox_listLi"
                    v-for="(item, index) in voiceList"
                    :key="index"
                    @click.stop="select(item)"
                  >
                    {{ item.value }}
                  </div>
                  <!-- 上传图片 -->
<!--                  <input type="file" name="files" @change="onClick_uploadimg($event)" ref="fileImg" accept="image/*" />-->
                </div>
              </div>
              <!--              <img style="height:100%" src="../../assets/data/captain-info.png" alt="">-->
              <!--              <div class="captain-info" style="left:15px;top:25px;">15656573121</div>-->
              <!--              <div class="captain-info" style="left:287px;top:20px">船长</div>-->
              <!--              <div class="captain-info" style="left:163px;top:130px;">宋明</div>-->
              <!--              <div class="captain-info" style="left:46px;bottom:18px">{{address}}</div>-->
              <!--              <div class="captain-info" style="left:164px;bottom:18px">25kg</div>-->
              <!--              <div class="captain-info" style="left:281px;bottom:18px">{{parseFloat(currentShip.speed).toFixed(2)+ "m/s"}}</div>-->
              <!--              <div class="captain-info" style="left:398px;bottom:18px">良好</div>-->
              <!--              <div class="captain-info" style="left:515px;bottom:18px">运行</div>-->
              <!--              <div class="captain-info" style="left:632px;bottom:18px">良好</div>-->
              <!--              <div class="captain-info" style="left:754px;bottom:20px">15kg</div>-->
            </div>
          </wide-databox>
        </div>
        <div class="col">
          <wide-databox :title="title2">
            <div style="display: flex; width: 100%; height: 83%">
              <div style="width: 27%" class="ship-info">
                <ul>
                  <li>
                    <div>导航时间</div>
                    {{ parseInt(currentShip.navigation_time / 1000) + '秒' }}
                  </li>
                  <li>
                    <div>当前经度</div>
                    {{ parseFloat(currentShip.longitude).toFixed(4) }}
                  </li>
                  <li>
                    <div>当前纬度</div>
                    {{ parseFloat(currentShip.latitude).toFixed(4) }}
                  </li>
                  <li>
                    <div>水深距离</div>
                    {{ parseInt(currentShip.waterDistance) + 'mm' }}
                  </li>
                  <li>
                    <div>船身速度</div>
                    {{ parseFloat(currentShip.speed).toFixed(2) + 'm/s' }}
                  </li>
                  <li>
                    <div>航向角</div>
                    {{ parseFloat(currentShip.angle_north).toFixed(2) + '°' }}
                  </li>
                </ul>
              </div>
              <div style="width: 46%">
                <img style="width: 100%; height: 100%" src="../../assets/data/ship.png" alt="" />
              </div>
              <div style="width: 27%" class="ship-info">
                <ul class="reverse">
                  <li>
                    <div>{{ parseFloat(currentShip.pitch_angle).toFixed(2) + '°' }}</div>
                    俯仰角
                  </li>
                  <li>
                    <div>{{ parseFloat(currentShip.rolling_angle).toFixed(2) + '°' }}</div>
                    横滚角度
                  </li>
                  <li>
                    <div>{{ currentShip.batteryNum }}</div>
                    电池数量
                  </li>
                  <li>
                    <div>{{ parseInt(currentShip.soc_mean) }}</div>
                    平均电量
                  </li>
                  <li>
                    <div>{{ currentShip.remainMiles }}</div>
                    剩余航程
                  </li>
                  <li>
                    <div>{{ currentShip.soc_per_kilo }}</div>
                    公里耗电
                  </li>
                </ul>
              </div>
            </div>
          </wide-databox>
        </div>
      </div>
    </div>
    <dfooter style="position: absolute; left: 0; bottom: 0"></dfooter>
  </div>
</template>

<script>
  import dheader from './dheader';
  import dfooter from './dfooter';
  import BMap from '@/components/BMap.vue';
  import eventBus from '../../config/EventBus';
  import config from '../../config/config';
  import snapshotDialog from "../../components/snapshotDialog";

  export default {
  components: {
    'snap_dialog':snapshotDialog,
    dheader,
    dfooter,
    BMap,
  },
  data() {
    return {
      isShow: false,
      pageShow: true,
      personalData: {},
      numberData: {},
      username: '',
      shipInfoList: [],
      shipNum: null,
      title1: '语音播报信息',
      title2: '',
      currentShip: {},
      address: '温州市平阳县',
      voice_notify: [],
      isShowSelect: false,
      eventType: 0,
      voiceList: [
        { key: 12, value: '小姐姐小哥哥！我们一起合个影可以吗？难到我美的不够彻底吗？不过你不能太靠河边注意安全哦！爱你摸摸哒' },
        { key: 13, value: '我突然想起我还要去搬砖呢！颐和园管理处让我好好打扫卫生不许偷懒。我只是觉得你好好看才想和你拍照留念的。拜拜' },
        { key: 0, value: '前方人员请注意，请不要乱扔垃圾，爱护环境，从我做起' },
        { key: 1, value: '前方人员请注意，请不要下水游泳，出门在外，注意安全。' },
        { key: 2, value: '前方人员请注意，请不要将身体探出船身以外，外出游玩请注意安全。' },
        { key: 3, value: '前方人员请注意，请不要站立在船头，欣赏风景的同时也要注意安全。' },
        { key: 4, value: '前方人员请注意，请停止非法捕鱼，颐和园的鱼这么可爱，你忍心吃吗？' },
        { key: 5, value: '前方船只请注意，目前已超载，颐和园规定小船最多承载6人哦。' },
        { key: 6, value: '程序转弯，请注意安全，程序转弯，请注意安全' },
        { key: 7, value: '前方人员请注意，此处目前不允许逗留，请立即离开。' },
        { key: 8, value: '前方车辆请注意，此处目前不允许逗留，请立即离开。' },
        { key: 9, value: '前方船只请注意，此处目前不允许逗留，请立即离开。' },
        { key: 10, value: '前方人员请穿救生衣，乘坐船只要注意安全。' },
        {
          key: 11,
          value:
            '你可以通过-你好清道夫-来唤醒我-哦，并可以咨询我以下问题：   1-你叫什么名字？2-你能干啥？3-你在这里干什么？4-今天的天气怎么样？5-唱一首歌给我听。',
        },

      ],
      unitName: '-----请选择-----',
    };
  },
  created() {},
  methods: {
    weatherInfo: function () {
      // console.log("三屏查询地理位置信息")
      if (this.shipNum !== null) {
        let url = config.ROOT_API_URL + '/pc/weather/';
        let _this = this;
        this.$axios
          .get(url, {
            params: {
              lat: _this.currentShip.latitude.toString(),
              lng: _this.currentShip.longitude.toString(),
            },
          })
          .then(function (response) {
            // console.log("获取无人船地理位置以及天气状态");
            // console.log(response)
            _this.address = response['data']['cityData'];
            _this.weather = response['data']['weatherData'];
            // console.log("==========获取无人船地理位置以及天气状态   END=======");
          })
          .catch(function (error) {
            console.log('获取无人船地理位置和天气出错，error=', error);
          });
      }
    },
    sendVoiceNotify: function (msg, index) {
      switch (index) {
        case 0:
          this.eventType = 1;
          break;
        case 1:
          this.eventType = 11;
          break;
        case 4:
          this.eventType = 15; //非法捕鱼
          break;
        case 7:
          this.eventType = 12;
          break;
        case 8:
          this.eventType = 13;
          break;
        case 9:
          this.eventType = 14;
          break;
        case 10:
          this.eventType = 16; //不穿救生衣
          break;
        default:
          this.eventType = 0;
          break;
      }
      let url = config.ROOT_API_URL + '/pc/msg/';
      let _this = this;
      console.log('shipnum：' + _this.shipNum);
      let data = {
        msg: msg,
        shipNum: _this.shipNum,
      };
      this.$axios
        .post(url, data)
        .then(function (response) {
          if (response.retCode === 0) {
            console.log('发送语音成功，response=', response);
            _this.$message({
              message: '发送成功！',
              type: 'success',
            });
            if (_this.eventType === 0) {
              console.log('不需标注数据，不上传');
            }else{
              // _this.snapshot();
              // _this.record();
              console.log("nothing happen")
            }

          } else {
            _this.$message.error(response.retMsg);
          }
        })
        .catch(function (error) {
          console.log('发送失败，error=', error);
        });
    },
    arrowDown() {
      this.isShowSelect = !this.isShowSelect;
    },
    select(item) {
      this.isShowSelect = false;
      this.sendVoiceNotify(item.value, item.key);
      this.unitName = item.value;
    },
    },

  mounted() {
    eventBus.$on('shipInfoList', (value) => {
      // console.log("三屏右屏监听融云数据", value);
      if (value.length > 0) {
        this.shipInfoList = value;
        if (this.shipNum === null && this.shipInfoList.length > 0) {
          this.currentShip = this.shipInfoList[0];
          this.title2 = this.currentShip.shipNum + '船实时信息';
          this.shipNum = this.currentShip.shipNum;
          // console.log('ahahahhahahahah')
        } else {
          for (let i = 0; i < this.shipInfoList.length; i++) {
            if (this.shipInfoList[i].shipNum === this.shipNum) {
              this.currentShip = this.shipInfoList[i];
              this.title2 = this.currentShip.shipNum + '船实时信息';
              this.shipNum = this.currentShip.shipNum;
              break;
            }
          }
        }
      }
    });
    eventBus.$on('chooseShipNum', (value) => {
      // console.log("三屏右屏监听地图选择", value);
      for (let i = 0; i < this.shipInfoList.length; i++) {
        if (this.shipInfoList[i].shipNum === value) {
          this.currentShip = this.shipInfoList[i];
          this.title2 = this.currentShip.shipNum + '船实时信息';
          this.shipNum = this.currentShip.shipNum;
          break;
        }
      }
    });
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
    height: calc(100% - 17em);
    display: flex;
    justify-content: space-around;
    .cell {
      width: 50%;
      height: 100%;
      .col {
        margin: 3% 3%;
        width: 94%;
        height: 45.5%;
        background: url(../../assets/data/shipInfoMask.png) center;
        background-size: 100% 100%;
        .ship-info {
          ul {
            margin-left: 4.5em;
            color: #2bfaff;
            font-size: 22px;
            &.reverse {
              margin-left: 2em;
              color: #a9ddee;
              font-size: 17px;
              width: calc(100% - 6em);
              div {
                color: #2bfaff;
                font-size: 22px;
              }
            }
            li {
              padding: 14px 0;
              display: flex;
              align-items: center;
              justify-content: space-between;
              div {
                width: 7em;
                color: #a9ddee;
                font-size: 17px;
              }
            }
          }
        }
      }
      .map {
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
}
.captain-box {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  color: #ffffff;
  font-size: 25px;
  .captain-info {
    position: absolute;
    width: 100px;
    height: 25px;
    text-align: center;
    line-height: 25px;
  }
}
</style>
