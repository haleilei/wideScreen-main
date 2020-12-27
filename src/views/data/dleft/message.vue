<template>
  <div class="l-messege-box">
    <div class="flotagelist-table-title">
      <div class="row">编号</div>
      <div class="row">垃圾类别</div>
      <div class="row">所在区域</div>
      <div class="row">经度</div>
      <div class="row">纬度</div>
      <div class="row">河长</div>
    </div>
    <div class="messege-content">
      <ul :style="{ 'margin-top': marginTop + 'px' }">
        <li v-for="(item, index) in data" :key="index">
          <div class="flotagelist-table">
            <div class="row">{{item.code}}</div>
            <div class="row">{{item.type}}</div>
            <div class="row">{{item.area}}</div>
            <div class="row">{{item.long}}</div>
            <div class="row">{{item.lati}}</div>
            <div class="row">{{item.admin}}</div>
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
        1: "玻璃",
        2: "废纸",
        3: "金属",
        4: "布料",
        5: "塑料"
      }
    };
  },
  computed: {
    marginTop () {
      return -this.activeIndex * 58 * 3;
    }
  },
  mounted () {
    setInterval(() => {
      if (this.data.length - 3 > 0) {
        let vh = this.data.length / 3;
        if (this.activeIndex + 1 < vh) {
          this.activeIndex += 1;
        } else {
          this.activeIndex = 0;
        }
      } else {
        this.activeIndex = 0;
      }
    }, 5000);
  },
};
</script>

<style lang="scss">
.l-messege-box {
  width: 100%;
  height: 100%;
  padding: 0 5px 15px 5px;
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
        height: 58px;
        border-bottom: 1px solid rgba(40, 99, 150, 0.5);
        overflow: hidden;
      }
    }
  }
}
.flotagelist-table-title {
  display: flex;
  color: #28ebf3;
  justify-content: space-around;
  align-items: center;
  border-bottom: 1px solid rgba(40, 99, 150, 0.5);
  .row {
    width: 20%;
    text-align: center;
  }
}
.flotagelist-table {
  height: 100%;
  display: flex;
  color: #fff;
  justify-content: space-around;
  align-items: center;
  .row {
    width: 20%;
    text-align: center;
    vertical-align: center;
  }
}
</style>
