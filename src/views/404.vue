<template>
  <div class="not-found">
    <el-row type="flex" align="middle" class="not-found-box">
      <el-col :span="12">
        <div class="not-found-img"></div>
      </el-col>
      <el-col :span="12" style="text-align: left;">
        <div class="not-found-desc">
          <h1>404</h1>
          <h3>抱歉，您无权访问或页面不存在，请刷新页面重试！</h3>
          <p>
            <el-button
              type="primary"
              @click="$router.replace({ path: '/homePage' })"
              >返回首页</el-button
            >
          </p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>
<style lang="scss" scoped>
.not-found {
  padding: 4em 0 0 0;
}
.not-found-box {
  width: 80%;
  margin: 0 auto;
}
.not-found-img {
  height: 320px;
  background-color: red;
  background: url("../assets/notfound.svg") no-repeat 50% 50% / auto 100%;
}
.not-found-desc {
  padding: 0 0 0 2em;
  color: #888;
  & > h1 {
    font-size: 5em;
    margin: 0;
  }
}
</style>
