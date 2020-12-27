<template>
  <div class="right-content">
    <div class="top-box">
      <databox title="河道信息" :dheight="451">
        <river-message :data="riverwayList"></river-message>
        <nodata nodata="暂无河道信息" v-if="riverwayList.length==0"></nodata>
      </databox>
      <databox title="无人船信息" :dheight="451">
        <ship-message :data="shipList"></ship-message>
        <nodata nodata="暂无无人船信息" v-if="shipList.length==0"></nodata>
      </databox>
      <databox title="非法事件" :dheight="451">
        <lawlessness :data="riverwayList"></lawlessness>
        <nodata nodata="暂无非法事件" v-if="riverwayList.length==0"></nodata>
      </databox>
    </div>
  </div>
</template>

<script>
import riverMessage from "./riverMessage";
import shipMessage from "./shipMessage";
import lawlessness from "./lawlessness";
export default {
  components: {
    riverMessage,
    shipMessage,
    lawlessness
  },
  props: {
    username: String
  },
  data () {
    return {
      riverwayList: [{
        no: "2563456wd",
        cops: "葛世聪",
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      }, {
        no: "2563456wd",
        cops: "葛世聪",
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      }, {
        no: "2563456wd",
        cops: "葛世聪",
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      }, {
        no: "2563456wd",
        cops: "葛世聪",
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      }, {
        no: "2563456wd",
        cops: "葛世聪",
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      }, {
        no: "2563456wd",
        cops: "葛世聪",
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      }, {
        no: "2563456wd",
        cops: "葛世聪",
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      },],
      shipList: [{
        no: "2563456wd",
        cops: "葛世聪",
        phone: "15656565656",
        position: "船长",
        status: "故障",
        signal: "良好",
        residueTrash: "25kg",
        electricalMachineryStatus: "待机",
        residueFuel: "50%",
        speed: 8,
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      }, {
        no: "2563456wd",
        cops: "葛世聪",
        phone: "15656565656",
        position: "船长",
        status: "故障",
        signal: "良好",
        residueTrash: "25kg",
        electricalMachineryStatus: "待机",
        residueFuel: "50%",
        speed: 8,
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      }, {
        no: "2563456wd",
        cops: "葛世聪",
        phone: "15656565656",
        position: "船长",
        status: "故障",
        signal: "良好",
        residueTrash: "25kg",
        electricalMachineryStatus: "待机",
        residueFuel: "50%",
        speed: 8,
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      }, {
        no: "2563456wd",
        cops: "葛世聪",
        phone: "15656565656",
        position: "船长",
        status: "故障",
        signal: "良好",
        residueTrash: "25kg",
        electricalMachineryStatus: "待机",
        residueFuel: "50%",
        speed: 8,
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      }, {
        no: "2563456wd",
        cops: "葛世聪",
        phone: "15656565656",
        position: "船长",
        status: "故障",
        signal: "良好",
        residueTrash: "25kg",
        electricalMachineryStatus: "待机",
        residueFuel: "50%",
        speed: 8,
        riverChief: "杜国庆",
        censor: "蔡云",
        waterLevel: "25m",
        level: 'Ⅲ',
        currentWaterPlants: 35,
        currentTrash: 12,
        waterQuality: 2,
        lawlessnessnNum: 8
      }],
      noFollowers: false,
      following: [],
      noFollowing: false,
      messege: [],
      noMessege: false
    };
  },
  created () {
    // this.getData(this.username)
  },
  methods: {
    getData (username) {
      let comUrl = "/api/users/";
      let url1 = comUrl + username + "/followers";
      let url2 = comUrl + username + "/following";
      let url3 = comUrl + username + "/received_events";
      this.$axios
        .all([
          this.$axios.get(url1),
          this.$axios.get(url2),
          this.$axios.get(url3)
        ])
        .then(
          this.$axios.spread((res1, res2, res3) => {
            //粉丝情况
            let data1 = JSON.parse(JSON.stringify(res1.data));
            if (data1.length < 1) {
              this.noFollowers = true;
            } else {
              this.followers = data1.reverse();
            }
            //跟随情况
            let data2 = JSON.parse(JSON.stringify(res2));
            if (data2.data.length < 1) {
              this.noFollowing = true;
            } else {
              this.following = data2.data.reverse();
            }

            //最新消息
            let data3 = JSON.parse(JSON.stringify(res3));
            if (data3.data.length < 1) {
              this.noMessege = true;
            } else {
              this.messege = data3.data;
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
