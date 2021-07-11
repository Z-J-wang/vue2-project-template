<template>
  <div class="card">
    <el-image v-show="artileData.img" :src="artileData.img"></el-image>
    <div class="content">
      <h3 class="title">
        <router-link :to="{path:`/blog-detail/${artileData.id}`}" tag="a">{{artileData.title}}</router-link>
      </h3>
      <p class="intro">{{artileData.introduction}}</p>
      <ul class="tags">
        <li v-for="item in artileData.tags.split('-')" :key="item">
          <el-tag size="small" effect="plain">{{ item }}</el-tag>
        </li>
      </ul>
      <p class="datetime">发布日期：{{artileData.updatedAt}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'card',
  props: {
    artileData: {
      type: Object,
      require: true
    }
  }
};
</script>

<style lang="less" scoped>
.card {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  padding-right: 20px;
  padding-left: 20px;
  border-bottom: 1px solid #e5e5e5;
  transition: all 0.5s;
  &:hover {
    background: #fff;
    box-shadow: #ccc 1px 1px 8px;
    border-radius: 10px;
  }
  .el-image {
    width: 160px;
    height: 160px;
    margin-right: 50px;
  }
  .content {
    flex: 1;
    height: 100%;
    text-align: left;
    .title {
      cursor: pointer;
      a {
        text-decoration: none;
        transition: all 0.5s;
        color: #8a988e;
        &:hover {
          color: #1a6840;
        }
      }
    }
    .intro {
      height: 65px;
      margin: 0;
      font-size: 14px;
      color: #2b312c;
    }
    .tags {
      margin: 10px 0;
      padding: 0;
      list-style: none;
      li {
        display: inline-block;
        padding-right: 10px;
      }
      /deep/ * {
        .el-tag--plain {
          background-color: #fff;
          border-color: #8a988e;
          color: #8a988e;
        }
      }
    }
    .datetime {
      margin: 0;
      text-align: right;
      font-size: 14px;
    }
  }
}
</style>
