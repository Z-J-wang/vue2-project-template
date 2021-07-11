<template>
  <p class="footer-bar">
    <a
      href="https://beian.miit.gov.cn/#/Integrated/recordQuery"
      target="_blank"
    >ICP 备案号：粤ICP备2020073597号</a>
  </p>
</template>

<script>
export default {
  name: 'footer-bar'
};
</script>

<style lang="less" scoped>
.footer-bar {
  position: relative;
  bottom: -1px;
  padding: 16px 0;
  margin: 0;
  background-color: #495c69;
  a {
    text-decoration: none;
    color: #fff;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
