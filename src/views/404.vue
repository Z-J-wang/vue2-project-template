<template>
  <div class="noFound">
    <el-image :src="url">
      <div slot="placeholder" class="image-slot">
        加载中
        <span class="dot">...</span>
      </div>
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
    <div class="text-l">
      <p>糟糕……您访问的网页走丢了</p>
      <p>您可以刷新页面试试能不能找回它。</p>
      <p>您还可以进行下面的操作：</p>
      <div class="text-c" style="margin-top: 40px;">
        <router-link to tag="a">
          <a @click="back()">
            <i class="el-icon-back"></i> 返回上一页
          </a>
        </router-link>
        <span style="padding: 0 40px;">|</span>
        <router-link to="/" tag="a">
          <i class="el-icon-s-home"></i> 返回首页
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '404',
  data() {
    return {
      url: require('../assets/404.png')
    };
  },

  methods: {
    back() {
      this.$router.back(-1);
    }
  }
};
</script>
<style lang="less" scoped>
.noFound {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translate(-50%, -20%);
}

a {
  color: #8bc8d5;
  text-decoration: none;
}
</style>
