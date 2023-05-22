<template>
  <base-template>
    <div class="case-show">
      <h2>案例展示</h2>
      <div class="list-contaner">
        <ul>
          <li v-for="(item, i) in componentList" :key="i">
            <router-link :to="item.path" tag="a">{{ item.meta.name }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </base-template>
</template>

<script>
import modulesRoutes from '@/business-modules/case-show/util/getModulesRoutes';

export default {
  name: 'case-show',
  data() {
    return {
      componentList: []
    };
  },
  mounted() {
    this.componentList = modulesRoutes;
  }
};
</script>

<style lang="less" scoped>
.case-show {
  h2 {
    margin: 0;
    padding-top: 40px;
    padding-bottom: 80px;
  }

  .list-contaner {
    margin: 0 auto;
    width: 1180px;

    ul {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;

      li {
        margin-bottom: 20px;
        padding-left: 20px;
        width: 33%;
        font-size: 20px;
        text-align: left;
        list-style: none;

        a {
          text-decoration: none;
          color: #ffffff;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
