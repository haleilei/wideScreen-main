<template>
  <div class="data-box" :class="{ noborder: boxb }" :style="{ height:'100%' }">
    <div class="in-title" v-if="title.length > 0">
      <div class="icon"></div>
      <span v-html="title"></span>
    </div>
    <div class="chart">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "wideDatabox",
  props: {
    title: String,
    dheight: Number,
    icon: String,
    boxb: {
      type: Boolean,
      default: true
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./index";
</style>
