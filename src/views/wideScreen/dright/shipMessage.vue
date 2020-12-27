<template>
  <div class="r-messege-box">
    <div class="messege-content">
      <ul :style="{ 'margin-top': marginTop + 'px' }">
        <li v-for="(item, index) in data" :key="index">
          <div class="r-flotagelist-table">
            <div class="row">
              <img src="../../../assets/data/col.png" alt="">
              <div class="col">编号<span>{{item.no}}</span></div>
              <div class="col">信号信息<span style="color:#00FF42">{{item.signal}}</span></div>
            </div>
            <div class="row">
              <img src="../../../assets/data/col.png" alt="">
              <div class="col">操作员姓名<span>{{item.cops}}</span></div>
              <div class="col">垃圾剩余<span>{{item.residueTrash}}</span></div>
            </div>
            <div class="row">
              <img src="../../../assets/data/col.png" alt="">
              <div class="col">操作员电话<span>{{item.phone}}</span></div>
              <div class="col">电机状态<span>{{item.electricalMachineryStatus}}</span></div>
            </div>
            <div class="row">
              <img src="../../../assets/data/col.png" alt="">
              <div class="col">操作员职位<span>{{item.position}}</span></div>
              <div class="col">剩余燃料<span style="color:#FFEE34">{{item.residueFuel}}</span></div>
            </div>
            <div class="row">
              <div class="col">工作状态<span style="color:#FF3F3F">{{item.status}}</span></div>
              <div class="col">行驶速度<span>{{item.speed}}</span></div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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
    width: 20%;
    text-align: center;
    .col {
      color: #00b7ee;
      margin: 8px 0;
      padding: 0 15px;
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
