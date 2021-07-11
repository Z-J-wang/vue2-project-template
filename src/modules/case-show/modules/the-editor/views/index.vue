<template>
  <template-code
    :HTML="sourcecode.HTML"
    :Javascript="sourcecode.Javascript"
    :CSS="sourcecode.CSS"
  >
    <h3 slot="title">富文本编辑器组件-wangEditor</h3>
    <div slot="show">
      <theEditor v-model="content" editorName="content" />
    </div>
  </template-code>
</template>

<script>
import theEditor from '../components/the-editor.vue';
import code from '../assets/code';
export default {
  name: 'editor',
  components: {
    theEditor
  },
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
  }
};
</script>