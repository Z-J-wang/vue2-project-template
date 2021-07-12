<template>
  <base-template>
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="main-contain">
      <div class="code">
        <h4>源代码</h4>
        <el-collapse v-model="collapseName">
          <el-collapse-item title="HTML" name="HTML">
            <pre v-if="HTML" v-highlightjs="HTML"><code></code></pre>
            <p v-else>暂无</p>
          </el-collapse-item>
          <el-collapse-item title="Javascript" name="Javascript">
            <pre v-if="Javascript" v-highlightjs="Javascript"><code></code></pre>
            <p v-else>暂无</p>
          </el-collapse-item>
          <el-collapse-item title="CSS" name="CSS">
            <pre v-if="CSS" v-highlightjs="CSS"><code></code></pre>
            <p v-else>暂无</p>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="show">
        <h4>实现效果及说明</h4>
        <slot name="show"></slot>
      </div>
    </div>
  </base-template>
</template>

<script>
export default {
  name: 'template-code',
  props: {
    HTML: String,
    Javascript: String,
    CSS: String
  },
  data() {
    return {
      collapseName: 'HTML'
    };
  },
  created() {
    this.sourcecode = '';
  }
};
</script>

<style lang='less' scoped>
.title {
  margin: 40px 0;
}
.main-contain {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-bottom: 40px;
  & > div {
    max-width: 50%;
    overflow: auto;
    flex: 1;
    height: calc(100vh - 62px - 53px - 105px);
    margin: 0 20px;
    padding: 30px;
    text-align: left;
    border-radius: 10px;
    background-color: #fff;
    &::-webkit-scrollbar {
      display: none;
    }
    &:first-child {
      margin-right: 0;
    }
  }
}
</style>
