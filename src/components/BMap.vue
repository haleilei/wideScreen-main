<template>
  <baidu-map class="bm-view" id="l-map" :scroll-wheel-zoom="true" inertial-dragging continuous-zoom :center="center" :zoom="15" @ready="handler" mapType="BMAP_SATELLITE_MAP">
<!--    <bm-marker :position="center" :dragging="false" :icon="{url: require('../assets/data/shipMakerGreen.png'), size: {width: 300, height: 157}}" :offset="{width:116, height:13}">-->
<!--    </bm-marker>-->
    <div v-for="(ship, index) in shipInfoList" :key="index">
      <bm-marker :position="{lng: parseFloat(ship.longitude), lat: parseFloat(ship.latitude)}" :icon="{url: parseInt(ship.inTrack)>0 ? require('../assets/data/shipMakerGreen.png'):require('../assets/data/shipMakerRed.png'), size: {width: 300, height: 157}}" :offset="{width:116, height:13}" @click="choseShip(ship)">
          <bm-label
          :content=ship.shipNum
          :labelStyle="{color: '#fff', fontSize : '12px',background:'rgba(0, 0, 0, 0)',borderColor:'rgba(0, 0, 0, 0)'}"
          :offset="{width: 12,height:20 }"/>
      </bm-marker>
    </div>
<!--    <bm-marker :position="center" :dragging="false">-->
<!--    </bm-marker>-->
    <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
<!--    <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" @locationSuccess="locationSuccess" @locationError="locationError" :showAddressBar="true" :autoLocation="true"></bm-geolocation>-->
  </baidu-map>
</template>
<script>
import eventBus from "../config/EventBus"
export default {
  data () {
    return {
      // mapStyle: {
      //   styleJson: [{
      //     "featureType": "water",
      //     "elementType": "geometry",
      //     "stylers": {
      //       "visibility": "on",
      //       "color": "#A0EEFD"
      //     }
      //   }, {
      //     "featureType": "building",
      //     "elementType": "geometry",
      //     "stylers": {
      //       "visibility": "on"
      //     }
      //   }]
      // },
      center: {lng: 120.604246, lat: 27.749078},
      pointer: "",
      shipInfoList: [],
      assignCenter: false,
      assignShipNum: null
    }
  },
  methods: {
    handler () {
      this.center = {lng: 120.604246, lat: 27.749078};
      // this.zoom = 19
    },
    choseShip (ship) {
        // console.log("地图marker点击事件, shipNum=",ship.shipNum);
        eventBus.$emit("chooseShipNum", ship.shipNum);
    },
  },
  mounted() {
    eventBus.$on("shipInfoList", value => {
      // console.log("百度地图监听融云发送数据,", value);
      if(value.length>0){
        this.shipInfoList = value;
        // //
        //   if(this.shipInfoList.length>0) {
        //       var longplus = 0.0
        //       var latplus = 0.0
        //       for(let i=0; i<this.shipInfoList.length; i++) {
        //           longplus = longplus + parseFloat(this.shipInfoList[i].longitude)
        //           latplus = latplus + parseFloat(this.shipInfoList[i].latitude)
        //       }
        //       this.center = {lng: longplus/this.shipInfoList.length,lat: latplus/this.shipInfoList.length}
        //   }
      }
    });

  }
}
</script>

<style lang="scss">
.bm-view {
  width: 100%;
  height: 100%;
  .anchorBL {
    display: none;
  }
}
ol {
  display: block;
  overflow: auto;
  height: 150px;
  // list-style-type: decimal;
  // margin-block-start: 1em;
  // margin-block-end: 1em;
  // margin-inline-start: 0px;
  // margin-inline-end: 0px;
  // padding-inline-start: 40px;
}
</style>
