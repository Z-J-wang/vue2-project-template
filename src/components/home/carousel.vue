<template>
  <div class="carousel">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in imgs" :key="item">
        <el-image fit="cover" :src="item"></el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  data() {
    return {
      imgs: [require('@/assets/img/home/banner/banner1.jpeg'), require('@/assets/img/home/banner/banner2.jpeg'), require('@/assets/img/home/banner/banner3.jpeg'), require('@/assets/img/home/banner/banner4.jpeg')]
    };
  }
};
</script>

<style lang="less" scoped>
.carousel {
  padding: 20px 100px;
  .el-carousel {
    /deep/ * {
      .el-image {
        height: 300px;
      }
    }
  }
}
</style>
