<template>
  <div :id="id"  class="l-monitoring-box">
    <video :id="id + '-video'" class="monitoring-video" width="100%" height="330" muted autoplay>
      <source :src="src"  type="video/mp4">
      您的浏览器不支持 HTML5 video 标签。 
    </video>
  </div>
</template>

<script>
import eventBus from "../../../config/EventBus"

export default {
  data () {
    return {
      currentShipNum: '',
      src: '',
      srcList : [],
      index: 0,
      videoDom: ''
    }
  },
  props:{
    id: String,
    urlKey: String
  },
  computed: {
    marginTop () {
      return -this.activeIndex * 81.8 * 5;
    }
  },
  methods: {
    initMonitoring: function () {
      eventBus.$on("selectedNewShip", currentShip => {
        try {
          if (currentShip && this.currentShipNum !==  currentShip.currentShipNum) {
            this.currentShipNum = currentShip.currentShipNum;
            this.srcList = currentShip[this.urlKey];
            this.index = 0;
            if (!this.srcList[this.index] || !this.srcList[this.index].videoAddress) {
              return;
            }
            this.src = this.srcList[this.index].videoAddress;
            this.videoDom.src = this.src;
            this.videoDom.play();
          }
        } catch (error) {
          console.log(error.message)
        }
      });
    },
    play: function () {
      let _this  = this
      this.videoDom.play();
      this.videoDom.addEventListener('ended', function endedLs() {
        if (_this.index === _this.srcList.length -  1) {
          _this.index = 0;
        } else {
          _this.index += 1;
        }
        _this.src = _this.srcList[_this.index].videoAddress;
        _this.videoDom.src = _this.srcList[_this.index].videoAddress;
        _this.videoDom.play();
      });
    }
  },
  mounted () {
    this.$nextTick(function() {
      this.videoDom = document.getElementById(this.id + '-video');
      this.initMonitoring();
      this.play();
    });
  }
}
</script>

<style lang="scss">

</style>
