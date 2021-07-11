<template>
  <div id="app">
    <el-container>
      <el-main class="app_mian">
        <router-view />
      </el-main>
      <!-- <el-footer class="app_footer">
        <foot-bar />
      </el-footer>-->
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    this.$HttpApi.getUserinfo();
  }
};
</script>

<style lang="less">
@app-footer-height: 60px;
@app-main-height: calc(~'100vh - @{app-footer-height}');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

.app_mian {
  min-height: @app-main-height;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
}

.app_footer {
  height: @app-footer-height !important;
  box-sizing: border-box;
}
</style>
