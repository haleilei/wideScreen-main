<template>
  <div>
    <div class="top-view">
      <div class="top-view-btn" v-for="item in btnList" :key="item.id">
        <img :src="item.img" alt="">
      </div>
    </div>
    <div class="bottom-view">
      <div id="box1">
        <ul id="con11" ref="con1" :class="{anim1:animate==true}">
          <li v-for='(item,index) in mesgList' :key="index">
            <div class="text">{{item.name}}测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试</div>
          </li>
        </ul>
      </div>
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
      animate: false,
      mesgList: [{
        name: 1
      }, {
        name: 2
      }, {
        name: 3
      }, {
        name: 4
      }, {
        name: 5
      }, {
        name: 6
      }, {
        name: 7
      }, {
        name: 8
      },],
      btnList: [{
        img: require('@/assets/data/pflj.png'),
      }, {
        img: require('@/assets/data/zlsc.png'),
      }, {
        img: require('@/assets/data/szjc.png'),
      }, {
        img: require('@/assets/data/dbqx.png'),
      }, {
        img: require('@/assets/data/lsjy.png'),
      }, {
        img: require('@/assets/data/ffws.png'),
      }, {
        img: require('@/assets/data/hdqz.png'),
      }, {
        img: require('@/assets/data/pwjc.png'),
      }, {
        img: require('@/assets/data/ddzy.png'),
      }, {
        img: require('@/assets/data/xwsb.png'),
      },],
      getData: {},
      activeIndex: 0,
      typeText: {
        1: "玻璃"
      }
    };
  },
  computed: {
    marginTop () {
      return -this.activeIndex * 81.8 * 5;
    }
  },
  created () {
    setInterval(this.scroll, 2000)
  },
  methods: {
    scroll () {
      this.animate = true;
      setTimeout(() => {
        this.mesgList.push(this.mesgList[0]);
        this.mesgList.shift();
        this.animate = false;
      }, 1000)
    },
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
.top-view {
  width: 820px;
  height: 230px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .top-view-btn {
    padding: 0 35px 20px 35px;
    width: 160px;
    height: 110px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.bottom-view {
  background: linear-gradient(
    to top,
    rgba(255, 255, 255, 0) 0%,
    rgba(#28ebf3, 1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-animation-name: masked-animation;
  -webkit-animation-duration: 40s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-timing-function: linear;
  color: #fff;
  height: 150px;
  @-webkit-keyframes masked-animation {
    0% {
      background-position: left bottom;
    }
    100% {
      background-position: right bottom;
    }
  }
  #box1 {
    margin: 0 auto;
    width: 92%;
    height: 100%;
    overflow: hidden;
    text-align: center;
  }
  .anim1 {
    transition: all 0.5s;
    margin-top: -50px;
  }
  #con11 li {
    color: #ffffff;
    list-style: none;
    line-height: 30px;
    height: 50px;
    padding: 10px 0;
    font-size: 18px;
    .text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
