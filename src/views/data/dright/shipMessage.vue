<template>
  <div class="r-messege-box">
    <div class="messege-content">
      <ul :style="{ 'margin-top': marginTop + 'px' }">
        <li v-for="(item, index) in data" :key="index">
          <div class="r-flotagelist-table">
            <div class="row" style="width:18.5%">
              <img src="../../../assets/data/col.png" alt="">
              <div class="col" @click="selectShip(item.shipNum)">编号<span><a>{{item.shipNum}}</a></span></div>
              <div class="col">卫星个数<span style="color:#00FF42">{{item.no_sv}}</span></div>
            </div>
            <div class="row" style="width:20%">
              <img src="../../../assets/data/col.png" alt="">
              <div class="col">水深<span>{{parseInt(item.waterDistance)}}</span></div>
              <div class="col">水深警告<span style="color: #FFEE34">{{parseInt(item.waterDistanceWarn)===1?"警告": "正常"}}</span></div>
            </div>
            <div class="row" style="width:25.8%">
              <img src="../../../assets/data/col.png" alt="">
              <div class="col">电池数量<span>{{item.batteryNum}}</span></div>
              <div class="col">平均电量<span>{{parseInt(item.soc_mean)}}</span></div>
            </div>
            <div class="row" style="width:18.2%">
              <img src="../../../assets/data/col.png" alt="">
              <div class="col">剩余里程<span>{{item.remainMiles}}</span></div>
              <div class="col">公里耗电<span>{{item.soc_per_kilo}}</span></div>
            </div>
            <div class="row" style="width:17.5%">
              <div class="col">在轨状态<span style="color:#FF3F3F">{{parseInt(item.inTrack)===1?"在轨":"偏离"}}</span></div>
              <div class="col">行驶速度<span>{{parseFloat(item.speed).toFixed(2)+"m/s"}}</span></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import eventBus from "../../../config/EventBus";

export default {
  props: {
    data: Array
  },
  data () {
    return {
      getData: {},
      activeIndex: 0,
      typeText: {
        1: "玻璃"
      }
    };
  },
  computed: {
    marginTop () {
      return -this.activeIndex * 77 * 5;
    }
  },
  methods: {
    selectShip: function (shipNum) {
      // console.log("列表选择无人船编号");
      // console.log(shipNum);
      eventBus.$emit("chooseShipNum", shipNum);
    }
  },
  mounted () {
    setInterval(() => {
      if (this.data.length - 5 > 0) {
        let vh = this.data.length / 5;
        if (this.activeIndex + 1 < vh) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      } else {
        this.activeIndex = 0;
      }
    }, 6000);
  },
};
</script>

<style lang="scss">
.r-messege-box {
  font-size: 12px;
  width: 100%;
  height: 100%;
  padding: 0 5px;
  overflow: hidden;
  .messege-content {
    width: 100%;
    height: 100%;
    overflow: hidden;
    ul {
      width: 100%;
      height: 100%;
      position: relative;
      transition: margin-top 0.5s;

      li {
        width: 100%;
        height: 73px;
        margin-bottom: 4px;
        overflow: hidden;
      }
    }
  }
}
.r-flotagelist-table {
  font-size: 14px;
  background: url(../../../assets/data/mask.png) no-repeat;
  background-size: 100% 100%;
  height: 100%;
  padding: 0 1%;
  width: 100%;
  display: flex;
  color: #fff;
  justify-content: space-around;
  align-items: center;
  &.title {
    color: #28ebf3;
  }
  .row {
    position: relative;
    text-align: center;
    .col {
      color: #00b7ee;
      margin: 8px 0;
      padding: 0 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        color: #fff;
      }
    }
    img {
      position: absolute;
      right: 0;
      height: 60%;
      top: 20%;
    }
  }
}
</style>
