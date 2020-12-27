<template>
  <div class="nodata">
    {{nodata}}
  </div>
</template>

<script>
export default {
  name: "nodata",
  props: {
    nodata: String
  }
};
</script>

<style lang="scss">
.nodata {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  color: #ffffff;
}
</style>
