<template>
  <div class="wide-header">
    <div class="logo"></div>
    <div class="band left"></div>
    <div class="band right"></div>
    <div class="bg-header">
      <div class="t-title">
        <div class="text">{{title}}</div>
      </div>
    </div>
    <div class="time">{{nowTime}}</div>
  </div>
</template>

<script>
export default {
  name: "dheader",
  props: ['title'],
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

<style lang="scss" >
.wide-header {
  position: relative;
  width: 100%;
  height: 8.5em;
  .bg-header {
    width: 100%;
    height: 100%;
    background: url(../../../assets/data/top-bg.png) no-repeat;
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
    top: 1.44em;
    left: 1.33em;
    width: 12.3em;
    height: 2.6em;
    background: url(../../../assets/data/logo.png) no-repeat;
    background-size: 100% 100%;
  }
  .band {
    position: absolute;
    top: 6em;
    width: 23.5em;
    height: 2em;
    background: url(../../../assets/data/wide-left.png) no-repeat;
    background-size: 100% 100%;
    &.left {
      left: 17.6em;
    }
    &.right {
      right: 17.6em;
      transform: rotateY(180deg);
    }
  }
  .time {
    position: absolute;
    right: 1.8em;
    top: 1em;
    font-size: 30px;
    font-weight: 900;
    color: #3fffea;
    letter-spacing: 2px;
  }
}
</style>
