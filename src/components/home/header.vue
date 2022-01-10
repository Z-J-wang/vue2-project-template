<template>
  <div class="header">
    <div class="contain">
      <div class="logo">Jay 的个人网站</div>
      <el-menu
        router
        :default-active="$route.path"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/case-show">案例</el-menu-item>
        <el-menu-item index="/markdown">发表</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home-header'
};
</script>

<style lang="less" scoped>
.header {
  background-color: #545c64;
  .contain {
    display: flex;
    width: 1180px;
    margin: 0 auto;
    div {
      line-height: 61px;
    }
    .logo {
      margin-right: 60px;
      color: #e6e6e6;
    }
    .el-menu {
      position: relative;
      border: none;
      flex: 1;
    }
    .toolbar {
      margin-left: 60px;
    }
  }
}
</style>
