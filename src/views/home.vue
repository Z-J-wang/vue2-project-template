<template>
  <base-template>
    <carousel></carousel>
    <main>
      <h3>最新发布</h3>
      <div>
        <card v-for="item in dataList" :key="item.id" :artileData="item"></card>
      </div>
    </main>
  </base-template>
</template>

<script>
import '@/mock/index';
import carousel from '@c/home/carousel.vue';
import card from '@/components/home/card.vue';
export default {
  name: 'home',
  components: {
    carousel,
    card
  },
  data() {
    return {
      dataList: []
    };
  },
  async created() {
    const res = await this.$HttpApi.example();
    console.log(res);
  },
  methods: {
    /**
     * 获取最新发布的文章
     */
    async getBolgsOfNewest() {
      const params = {
        search: '',
        category: '',
        sort: 'desc',
        pageSize: 10,
        page: 1
      };
      const data = await this.$HttpApi.getArticlesByPage(params);
      console.log(data);
    }
  }
};
</script>
<style lang="less" scoped>
main {
  width: 1180px;
  margin: 40px auto;
  padding: 0 20px;
  border-radius: 4px;
  background-color: #fff;
  h3 {
    color: #5e665b;
    padding: 16px 0;
    border-bottom: 1px solid #8a988e;
  }
  div {
    padding-bottom: 1px;
  }
}
</style>
