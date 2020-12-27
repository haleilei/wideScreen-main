<template>
  <div class="right-content">
    <div class="top-box">
      <databox title="河道信息" :dheight="475">
        <river-message :data="riverStageList"></river-message>
        <nodata nodata="暂无河道信息" v-if="riverStageList.length==0"></nodata>
      </databox>
      <databox title="无人船信息" :dheight="475">
        <ship-message :data="shipInfoList"></ship-message>
        <nodata nodata="暂无无人船信息" v-if="shipInfoList.length==0"></nodata>
      </databox>
      <databox :title="currentShipTitle" :dheight="400">
        <multiBeamMonitoring id='mbRight' urlKey="monitoringURLs"></multiBeamMonitoring>
      </databox>
    </div>
  </div>
</template>

<script>
import riverMessage from "./riverMessage";
import shipMessage from "./shipMessage";
// import lawlessness from "./lawlessness";
import multiBeamMonitoring from './multiBeamMonitoring'
import config from '../../../config/config'
import eventBus from "../../../config/EventBus"

export default {
  components: {
    riverMessage,
    shipMessage,
    multiBeamMonitoring
  },
  data () {
    return {
      riverStageList: [],
      riverwayList: [{
        no: "2415466wd",
        cops: "陈祖维",
        riverChief: "姜子麟",
        censor: "黄昊阳",
        waterLevel: "24m",
        level: 'Ⅲ',
        currentWaterPlants: 25,
        currentTrash: 52,
        waterQuality: 2,
        lawlessnessnNum: 1
      }, {
        no: "2425466wd",
        cops: "石文博",
        riverChief: "李禄俊",
        censor: "王少峰",
        waterLevel: "19m",
        level: 'Ⅱ',
        currentWaterPlants: 35,
        currentTrash: 16,
        waterQuality: 3,
        lawlessnessnNum: 2
      }, {
        no: "2435466wd",
        cops: "黄溢辰",
        riverChief: "刘可然",
        censor: "钟诤",
        waterLevel: "26m",
        level: 'Ⅲ',
        currentWaterPlants: 5,
        currentTrash: 12,
        waterQuality: 1,
        lawlessnessnNum: 8
      }, {
        no: "2435467wd",
        cops: "何珂俊",
        riverChief: "谭新文",
        censor: "刘雨晨",
        waterLevel: "27m",
        level: 'Ⅱ',
        currentWaterPlants: 12,
        currentTrash: 42,
        waterQuality: 2,
        lawlessnessnNum: 10
      }, {
        no: "2435468wd",
        cops: "章尧",
        riverChief: "张峻豪",
        censor: "王梦源",
        waterLevel: "10m",
        level: 'Ⅱ',
        currentWaterPlants: 42,
        currentTrash: 22,
        waterQuality: 2,
        lawlessnessnNum: 24
      }, {
        no: "2435469wd",
        cops: "周宇晨",
        riverChief: "杜国庆",
        censor: "孙文博",
        waterLevel: "28m",
        level: 'Ⅲ',
        currentWaterPlants: 13,
        currentTrash: 32,
        waterQuality: 3,
        lawlessnessnNum: 3
      }, {
        no: "2435461wd",
        cops: "葛世聪",
        riverChief: "杜庆",
        censor: "蔡云",
        waterLevel: "22m",
        level: 'Ⅰ',
        currentWaterPlants: 23,
        currentTrash: 14,
        waterQuality: 2,
        lawlessnessnNum: 2
      }, {
        no: "2435451wd",
        cops: "王潇涵",
        riverChief: "刘帅",
        censor: "王颖慧",
        waterLevel: "24m",
        level: 'Ⅲ',
        currentWaterPlants: 44,
        currentTrash: 25,
        waterQuality: 1,
        lawlessnessnNum: 5
      }, {
        no: "2435461wd",
        cops: "殷杰",
        riverChief: "陆剑南",
        censor: "蔡云",
        waterLevel: "21m",
        level: 'Ⅰ',
        currentWaterPlants: 25,
        currentTrash: 35,
        waterQuality: 2,
        lawlessnessnNum: 4
      }, {
        no: "2435471wd",
        cops: "葛世聪",
        riverChief: "陈拉明",
        censor: "谢凌曦",
        waterLevel: "20m",
        level: 'Ⅲ',
        currentWaterPlants: 47,
        currentTrash: 17,
        waterQuality: 2,
        lawlessnessnNum: 8
      }],
      shipInfoList: [],
      noFollowers: false,
      following: [],
      noFollowing: false,
      messege: [],
      noMessege: false,
      timerRiverStage: null,
      currentShipNum: '',
      currentShipTitle: '多波束监控'
    };
  },
  created () {
    this.timerRiverStage = setInterval(this.getRiverStageInfo, 2*60*1000);
  },
  methods: {
    getRiverStageInfo () {
      let url = config.ROOT_API_URL + '/pc/river_stage/list/';
      let _this = this
      this.$axios.get(url, {
        params: {
          cityId: localStorage.getItem("cityId")
        }
      }).then(function (response) {
        if (response.retCode===0) {
          _this.riverStageList = [];
          for (var i=0; i<response.data.length; i++) {
            let temp = {
              no: "",
              cpos: "",
              riverChief: "",
              censor: "",
              waterLevel: "null",
              level: "",
              currentWaterPlants: 0,
              currentTrash: 0,
              waterQuality: "",
              lawlessnessnNum: 0
            };
            if (response.data[i].number) {
              temp.no = response.data[i].number
            }
            if (response.data[i].policeGroupInfo) {
              temp.cops  = response.data[i].policeGroupInfo.name
            }
            if (response.data[i].riverGroupInfo) {
              temp.riverChief = response.data[i].riverGroupInfo.name
            }
            if (response.data[i].inspectorGroupInfo) {
              temp.censor = response.data[i].inspectorGroupInfo.name
            }
            if (response.data[i].waterLevel) {
              temp.waterLevel = response.data[i].waterLevel
            }
            if (response.data[i].level) {
              temp.level = response.data[i].level
            }
            if (response.data[i].rubbishCount) {
                temp.currentTrash = 0;
                temp.currentWaterPlants = 0;
                let my_list = response.data[i].rubbishCount;
                for (let j=0; j < my_list.length; j++) {
                    if (my_list[j].type === 1) {
                          temp.currentTrash = my_list[j].count
                    }
                    if (my_list[j].type === 2) {
                        temp.currentWaterPlants = my_list[j].count
                    }
                }
            }
            if (response.data[i].quality) {
              temp.waterQuality = response.data[i].quality
            }
            if (response.data[i].illegalCount) {
              temp.lawlessnessnNum = response.data[i].illegalCount.illegalCount
            }
            _this.riverStageList.push(temp)
          }
        }
      }).catch(function (error) {
        console.log(error)
      })

    }
  },
  mounted() {
    this.getRiverStageInfo();
    eventBus.$on("shipInfoList", value => {
      // console.log("监听融云发过来的船只实时动态信息,", value);
      if (value.length>0) {
        this.shipInfoList = value
      }
    })
    eventBus.$on("selectedNewShip", currentShip => {
      if (currentShip) {
        this.currentShipNum = currentShip.currentShipNum;
        this.currentShipTitle = this.currentShipNum + "船多波束监控"
      }
    });
  },
  beforeDestroy() {
    clearInterval(this.timerRiverStage)
  }
};
</script>

<style lang="scss">
.right-content {
  width: 100%;
  height: 100%;
  .top-box {
    padding-bottom: 40px;
    .messege {
      padding-top: 20px;
    }
  }
}
</style>
