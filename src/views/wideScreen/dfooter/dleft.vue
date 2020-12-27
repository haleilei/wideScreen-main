<template>
  <div class="wide-left">
    <div class="band-left top" :style="isLeft?`left:5.5em`:`right:5.5em;transform: rotateY(180deg);`"></div>
    <div class="band-left bottom" :style="isLeft?`left:5.5em;transform: rotateX(180deg);`:`right:5.5em;transform: rotate(180deg);`"></div>
    <div class="bg-left" :style="isLeft?``:`transform: rotate(180deg);`">
    </div>
  </div>
</template>

<script>
export default {
  name: "dleft",
  props: ['isLeft'],
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
};
</script>

<style lang="scss">
.wide-left {
  position: relative;
  width: 8.2em;
  height: 80%;
  .bg-left {
    width: 100%;
    height: 100%;
    background: url(../../../assets/data/left-bg.png) no-repeat;
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
  .band-left {
    position: absolute;
    width: 2em;
    height: 23.5em;
    background: url(../../../assets/data/wide-vertical.png) no-repeat;
    background-size: 100% 100%;
    &.top {
      bottom: -5em;
    }
    &.bottom {
      top: -5em;
    }
  }
}
</style>
