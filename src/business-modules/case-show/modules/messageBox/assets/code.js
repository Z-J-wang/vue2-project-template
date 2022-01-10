const HTML = `<template>
<div :id="editorName" class="editor"></div>
</template>
`;

const Javascript = `import E from 'wangeditor';

export default {
  name: 'the-editor',
  props: {
    editorName: {
      type: String,
      required: true
    },
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    maxTextSize: {
      // 允许输入最大的文本长度
      type: Number,
      default: 1000
    },
    maxImageNum: {
      // 允许上传的最大图片数量
      type: Number,
      default: 10
    },
    content: String
  },
  model: {
    prop: 'content', //指向props的参数名
    event: 'input' //事件名称
  },
  data() {
    return {
      editor: undefined,
      menus: ['head', 'bold', 'fontSize', 'fontName', 'italic', 'underline', 'strikeThrough', 'indent', 'lineHeight', 'foreColor', 'backColor', 'link', 'list', 'todo', 'justify', 'quote', 'emoticon', 'image', 'table', 'code', 'splitLine', 'undo', 'redo']
    };
  },
  watch: {
    content: function (val) {
      console.log(val);
      this.editor.txt.html(this.content); // 初始化设置编辑器内容
    }
  },
  mounted() {
    this.initEditor();
  },
  methods: {
    // 富文本编辑器初始化
    initEditor() {
      const editor = new E(\`#\${this.editorName}\`);
      editor.config.onchange = this.changeHandle;
      editor.config.menus = this.menus;
      editor.config = { ...editor.config, ...this.config }; // 合并配置
      editor.config.customUploadImg = this.uploader;
      editor.config.uploadImgMaxLength = 1; // 一次最多上传 1 个图片
      editor.config.pasteIgnoreImg = true; // 禁止黏贴图片
      editor.create();

      this.editor = editor;
    },

    // change 的函数
    changeHandle(newHtml) {
      this.$emit('input', newHtml);
    },

    /**
     * 自定义图片上传
     */
    async uploader(resultFiles, insertImgFn) {
      if (!this.validateImageNum()) {
        return false;
      }
      const formData = new FormData();
      formData.append('file', resultFiles[0]);
      const { data: res } = await this.$HttpApi.uploadFile(formData);
      if (res.ret == 0) {
        insertImgFn(res.url);
      }
    },

    // 获取 Text
    getText() {
      return this.editor.txt.text();
    },

    // 判断Text是否为空（只输入空格也算空）
    validataTextIsNull() {
      const text = this.editor.txt.text().replace(/&nbsp;/g, '');

      return text.trim().length <= 0;
    },

    // 校验文本长度
    validateTextLength() {
      const text = this.editor.txt.text().trim();

      return text.length > this.maxTextSize;
    },

    // 图片数量检验
    validateImageNum() {
      const content = this.editor.txt.html();
      const elem = document.createElement('div');
      elem.innerHTML = content;
      const imgNum = elem.getElementsByTagName('img').length;
      if (imgNum >= this.maxImageNum) {
        this.$message.error(\`最多允许上传\${this.maxImageNum}张图片\`);
      }

      return imgNum >= this.maxImageNum ? false : true;
    }
  }
};`;

const CSS = `<style lang="less" scoped>
.editor{
  text-align: left;
}
</style>`;

export default {
  HTML,
  Javascript,
  CSS
};
