<template>
  <div class="md-editor">
    <div class="toolbar-top">
      <router-link to="/">
        <el-button round icon="el-icon-arrow-left">返回</el-button>
      </router-link>
      <el-input placeholder="文章标题" v-model="artilce.title"></el-input>
      <el-button type="primary" round @click="save">保存</el-button>
    </div>
    <mavon-editor ref="md" class="mavon" v-model="artilce.content" :toolbars="toolbars" @imgAdd="$imgAdd"></mavon-editor>
    <public-drawer :visible="drawerVisible" :artilce="artilce" @close="drawerVisible = false"></public-drawer>
  </div>
</template>

<script>
import { mavonEditor } from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';
import publicDrawer from '@/modules/markdown/components/pulic-drawer.vue';
export default {
  name: 'md-editor',
  components: { publicDrawer, mavonEditor },
  data() {
    return {
      artilce: {
        title: '',
        content: ''
      },
      drawerVisible: false,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      }
    };
  },
  mounted() {
    if (this.$route.query.id) {
      this.getArticlesByID(this.$route.query.id);
    }
  },
  methods: {
    async save() {
      if (!this.artilce.title) {
        this.$message.warning('请输入标题');
        return false;
      }

      if (!this.artilce.content) {
        this.$message.warning('文章内容不能为空');
        return false;
      }

      this.drawerVisible = true;
    },

    /**
     * 根据 ID 获取文章
     */
    async getArticlesByID(id) {
      const { data: res } = await this.$HttpApi.getArticlesByID(id);
      if (res?.code === 1000) {
        this.artilce = res.data;
      }
    },

    async $imgAdd(pos, $file) {
      // 将图片上传到服务器.
      var formdata = new FormData();
      formdata.append('file', $file);
      const { data: res } = await this.$HttpApi.uploadImage(formdata);
      this.$refs.md.$img2Url(pos, `${process.env.VUE_APP_IMAGE_URL}/${res.url}`);
    }
  }
};
</script>

<style lang="less" scoped>
.md-editor {
  margin: 0;
  height: 100vh;
  background-color: #869d9d;
  .toolbar-top {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 10px 20px 20px 20px;
    .el-input {
      flex: 1;
      margin: 0 10px;
      .el-input__inner {
        border-radius: 20px;
      }
    }
  }
  // .el-button:focus,
  // .el-button:hover {
  //   color: #5d3131;
  //   border-color: #5d313173;
  //   background-color: #5d313173;
  // }
  // .el-button--primary {
  //   background-color: #5d3131;
  //   border-color: #5d3131;
  // }
  // .el-input.is-active .el-input__inner,
  // .el-input__inner:focus {
  //   border-color: #5d3131;
  // }

  .mavon {
    width: calc(100vw - 40px);
    height: calc(100vh - 130px);
    margin: 0 auto;
  }
}
</style>
