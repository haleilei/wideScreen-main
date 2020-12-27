<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card-title .card-title-text {
  font-size: 1.1em;
  font-weight: normal;
}
</style>
