<template>
  <template-code :HTML="sourcecode.HTML" :Javascript="sourcecode.Javascript" :CSS="sourcecode.CSS">
    <h3 slot="title">密码输入框组件</h3>
    <div slot="show">
      <pagination :total="1000" @currentChange="handleCurrentChange" />
    </div>
  </template-code>
</template>

<script>
import pagination from '@/modules/case-show/modules/pagination/components/common-pagination-front.vue';
import code from '../assets/code';
export default {
  name: '',
  components: {
    pagination
  },
  data() {
    return {
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
    handleCurrentChange(val) {
      console.log(val);
    }
  }
};
</script>
