<template>
  <div class="wide-footer">
    <div class="wide-band left"></div>
    <div class="wide-band right"></div>
    <div class="wide-bg-footer">
      <div class="t-title">
        <div class="text">{{title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dfooter",
  props: ['title'],
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
.wide-footer {
  position: relative;
  width: 100%;
  height: 8.5em;
  .wide-bg-footer {
    transform: rotateX(180deg);
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
  .wide-band {
    position: absolute;
    bottom: 6em;
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
}
</style>
