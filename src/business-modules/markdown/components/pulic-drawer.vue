<template>
  <el-drawer title="完善文章信息" :visible.sync="drawer" direction="rtl" @closed="handleClose">
    <el-form :model="pulicData" ref="pulicData" :rules="pulicDataRule" label-width="100px">
      <el-form-item label="文章标签：" prop="tags">
        <el-tag
          v-for="(tag,i) in pulicData.tags"
          :key="i"
          closable
          :disable-transitions="false"
          @close="delTag(i)"
        >{{tag}}</el-tag>
        <el-button
          class="button-new-tag"
          size="small"
          @click="tagControlVisible = true"
          v-show="4 - pulicData.tags.length"
        >+ 添加</el-button>
        <div class="tag-contain" v-show="tagControlVisible">
          <p>可以添加标签: {{ 4 - pulicData.tags.length }} 个</p>
          <i class="close el-icon-close" @click="tagControlVisible = false"></i>
          <el-input v-model="newTag" size="small" placeholder="新增标签" @keyup.native.enter="addTag"></el-input>
          <div>
            <el-tag
              v-for="tag in allTags"
              :key="tag.id"
              :disable-transitions="false"
              @click="selecTag(tag.name)"
            >{{tag.name}}</el-tag>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="文章分类：" prop="category">
        <el-select v-model="pulicData.category" filterable allow-create>
          <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="文章简介：" prop="introduction">
        <el-input
          type="textarea"
          :autosize="{ minRows: 10, maxRows: 20}"
          placeholder="请输入内容"
          :show-word-limit="true"
          maxlength="500"
          v-model="pulicData.introduction"
        ></el-input>
      </el-form-item>
      <div class="toolbar">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="pulic()">发布</el-button>
      </div>
    </el-form>
  </el-drawer>
</template>

<script>
export default {
  name: 'public-drawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    artilce: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      drawer: this.visible, // drawer 显示隐藏
      pulicData: {
        // 文章表单数据
        tags: [],
        category: '',
        introduction: ''
      },
      pulicDataRule: {
        // 表单验证规则
        tags: [{ required: true, message: '文章标签不能为空', trigger: 'blur' }],
        category: [{ required: true, message: '文章分类不能为空', trigger: 'blur' }]
      },
      categories: [], // 已存在的文章分类
      newTag: '', // 新增标签
      tagControlVisible: false, // 标签设置模块显示隐藏
      allTags: [] // 已存在的标签
    };
  },
  watch: {
    visible() {
      this.drawer = this.visible;
      this.pulicData.tags = this.artilce.tags.split('-');
      this.pulicData.category = this.artilce.category;
      this.pulicData.introduction = this.artilce.introduction;
    }
  },
  created() {
    this.getTags();
    this.getCategories();
  },
  methods: {
    // 关闭事件
    handleClose() {
      this.$emit('close');
    },

    // 删除标签
    delTag(index) {
      this.pulicData.tags.splice(index, 1);
    },

    // 新增标签
    addTag() {
      if (4 - this.pulicData.tags.length) {
        this.pulicData.tags.push(this.newTag);
        this.newTag = '';
      } else {
        this.$message.warning('最多可以添加 4 个标签');
      }
    },

    // 选定标签
    selecTag(tag) {
      if (4 - this.pulicData.tags.length) {
        this.pulicData.tags.push(tag);
      } else {
        this.$message.warning('最多可以添加 4 个标签');
      }
    },

    // 发布
    pulic() {
      this.$refs.pulicData.validate(async (valid) => {
        if (valid) {
          const params = {
            id: this.artilce.id,
            title: this.artilce.title,
            content: this.artilce.content,
            tags: this.pulicData.tags,
            category: this.pulicData.category,
            introduction: this.pulicData.introduction
          };
          let res;
          if (this.$route.query.type === 'edit') {
            res = await this.$HttpApi.updateArticle(params);
          } else {
            res = await this.$HttpApi.createArticle(params);
          }
          if (res?.data?.code === 1000) {
            this.$router.push({
              path: `/blog-detail/${res?.data?.data.id}`
            });
            this.$message.success('保存成功');
            this.handleClose();
          } else {
            this.$message.error(res?.data?.msg);
          }
        }
      });
    },

    /**
     * 获取已存在的标签
     */
    async getTags() {
      const { data: res } = await this.$HttpApi.getTags();
      if (res?.code === 1000) {
        this.allTags = res.data;
      }
    },

    /**
     * 获取已存在的文章分类
     */
    async getCategories() {
      const { data: res } = await this.$HttpApi.getCategories();
      if (res?.code === 1000) {
        this.categories = res.data;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  padding: 20px;
  text-align: left;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
}
.tag-contain {
  position: relative;
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #2e317c;
  border-radius: 5px;
  p {
    margin: 0;
    padding-bottom: 15px;
    font-size: 14px;
    line-height: 14px;
  }
  .close {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }
  .el-tag {
    margin: 0 5px;
    cursor: pointer;
  }
}
.toolbar {
  position: absolute;
  bottom: 30px;
  right: 30px;
}
</style>
