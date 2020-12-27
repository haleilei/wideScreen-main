<template>
  <div class="header">
    <div class="logo"></div>
    <div class="band left"></div>
    <div class="band right"></div>
    <div class="bg-header">
      <div class="t-title">
        <div class="text">翌明智能指挥调度平台</div>
      </div>
    </div>
    <div class="time">{{nowTime}}</div>
  </div>
</template>

<script>
export default {
  name: "dheader",
  data () {
    return {
      nowTime: ""
    }
  },
  created () {
    this.getTime();
    setInterval(() => {
      this.getTime();
    }, 1000);
  },
  methods: {
    getTime () {
      this.nowTime = this.dateFormat(new Date());
    },
    dateFormat (date) {
      let format = 'yyyy-MM-dd hh:mm';
      if (date != 'Invalid Date') {
        var o = {
          "M+": date.getMonth() + 1, //month
          "d+": date.getDate(), //day
          "h+": date.getHours(), //hour
          "m+": date.getMinutes(), //minute
          "s+": date.getSeconds(), //second
          "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
          "S": date.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
          (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
              RegExp.$1.length == 1 ? o[k] :
                ("00" + o[k]).substr(("" + o[k]).length));
        return format;
      }
      return '';
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  width: 100%;
  height: 158px;
  padding: 0 20px;
  .bg-header {
    width: 100%;
    height: 158px;
    background: url(../../../assets/data/top-mask.png) no-repeat;
    background-size: 100% 100%;
    .t-title {
      width: 100%;
      height: 100%;
      .text {
        width: 50%;
        margin: 0 auto;
        text-align: center;
        font-size: 57px;
        line-height: 158px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #00beff;
        transform: scale(1.16, 1);
      }
    }
  }
  .logo {
    position: absolute;
    top: 26px;
    left: 25px;
    width: 251px;
    height: 50px;
    background: url(../../../assets/data/logo.png) no-repeat;
    background-size: 100% 100%;
  }
  .band {
    position: absolute;
    top: 76px;
    width: 494px;
    height: 29px;
    background: url(../../../assets/data/left.png) no-repeat;
    background-size: 100% 100%;
    &.left {
      left: 329px;
    }
    &.right {
      right: 329px;
      transform: rotateX(180deg);
    }
  }
  .time {
    position: absolute;
    right: 40px;
    top: 41px;
    font-size: 30px;
    font-weight: 900;
    color: #3fffea;
    letter-spacing: 2px;
  }
}
</style>
