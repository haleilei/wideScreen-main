<template>
  <div class="l-waterquantity-box">
    <div id="waterquantity" style="width: 650px;height:270px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import eventBus from "../../../config/EventBus"

export default {
  data () {
    return {
      currentShipNum: '',
      charts: '',
      animaton: false,
      options: {
        title: {
          textStyle: {
            color: 'white'
          }
        },
        legend: {
          right: 80,
          textStyle: {
            color: 'white'
          }
        },
        grid: {
          left: 80
        },
        tooltip: {},
        dataset: {
          dimensions: ['c_time', 'NH3', 'NH4', 'K'],
          source: []
        },
        xAxis: {
          type: 'category',
          axisLine: {
            lineStyle: {
              color: 'white'
            }
          }
        },
        yAxis: {
          min: 0,
          max: 30,
          axisLine: {
            lineStyle: {
              color: 'white'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'white',
              type: 'dotted'
            }
          }
        },
        series: [
          {type: 'line'},
          {type: 'line'},
          {type: 'line'}
        ],
        textStyle: {
          color: 'white'
        },
        color: ['yellow', 'green', 'blue']
      }
    };
  },
  computed: {
    marginTop () {
      return -this.activeIndex * 58 * 3;
    }
  },
  methods: {
    drawCharts: function () {
      // 基于准备好的dom，初始化echarts实例
      this.charts = echarts.init(document.getElementById('waterquantity'), 'light');
      // 绘制图表
      this.charts.setOption(this.options);
    },
    updateChart: function () {
      eventBus.$on("UpdateWaterQuantity", waterQtyInfo => {
        if(waterQtyInfo){
          if (this.currentShipNum !== waterQtyInfo.shipNum) {
            this.options.dataset.source = [];
          }
          this.currentShipNum = waterQtyInfo.shipNum;
          let dateTm = new Date(waterQtyInfo.quality.c_time);
          waterQtyInfo.quality.c_time = dateTm.getHours() + ":" + dateTm.getMinutes() + ":" + dateTm.getSeconds();
          this.options.dataset.source.push(waterQtyInfo.quality);
          if (this.options.dataset.source.length === 1200) {
            this.options.dataset.source.shift();
          }
          this.charts.setOption(this.options);  
        }
      });
    }
  },
  mounted () {
    this.$nextTick(function() {
      this.drawCharts();
      this.updateChart();
    });
  }
}
</script>

<style lang="scss">
.l-waterquantity-box {
  margin-top: -10px;
}
</style>
