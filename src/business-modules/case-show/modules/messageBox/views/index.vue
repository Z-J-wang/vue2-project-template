<template>
  <template-code
    :HTML="sourcecode.HTML"
    :Javascript="sourcecode.Javascript"
    :CSS="sourcecode.CSS"
  >
    <h3 slot="title">富文本编辑器组件-wangEditor</h3>
    <div slot="show">
      <el-button @click="open('success')">success messageBox</el-button>
      <el-button @click="open('warning')">warning messageBox</el-button>
      <el-button @click="open('error')">error messageBox</el-button>
      <el-button @click="open('info')">info messageBox</el-button>
      <el-button @click="open('question')">question messageBox</el-button>
    </div>
  </template-code>
</template>

<script>
import code from '../assets/code';
export default {
  name: 'editor',
  data() {
    return {
      content: '<p>阿萨大大十大</p>',
      sourcecode: {
        HTML: '',
        Javascript: '',
        CSS: ''
      }
    };
  },
  created() {
    this.sourcecode.HTML = code.HTML;
    this.sourcecode.Javascript = code.Javascript;
    this.sourcecode.CSS = code.CSS;
  },
  methods: {
    open(type) {
      this.$messageBox('你好！世界！', '', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: type
      })
        .then(() => {
          this.$message.success('您点击了：确认');
        })
        .catch(() => {
          this.$message.success('您点击了：取消');
        });
    }
  }
};
</script>