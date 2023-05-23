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
  name: 'TemplateCode',
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

<style lang="less" scoped>
.title {
  margin: 40px 0;
}

.main-contain {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  width: 100%;
  flex-direction: row;

  & > div {
    overflow: auto;
    margin: 0 20px;
    border-radius: 10px;
    padding: 30px;
    max-width: 50%;
    height: calc(100vh - 62px - 53px - 105px);
    text-align: left;
    background-color: #ffffff;
    flex: 1;

    &::-webkit-scrollbar {
      display: none;
    }

    &:first-child {
      margin-right: 0;
    }
  }
}
</style>
