<template>
  <div class="base-template">
    <home-header></home-header>
    <div class="main">
      <slot></slot>
    </div>
    <home-footer></home-footer>
  </div>
</template>

<script>
import homeHeader from '@/components/home/header.vue';
import homeFooter from '@/components/home/footer.vue';
export default {
  name: 'home',
  components: { homeHeader, homeFooter }
};
</script>

<style lang="less" scoped>
.base-template {
  min-height: 100vh;
  background-color: #869d9d;
  .main {
    min-height: calc(100vh - 62px - 53px);
  }
}
</style>
