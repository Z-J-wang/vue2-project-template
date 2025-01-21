import Vue from 'vue';
import util from '@/util/index';

// 自动加载 modules 组件
const modules = util.automatedImportForArray(require.context('@/plugins/modules/', true, /main\.js/));

export default function() {
  modules.forEach(extend => {
    Vue.use(extend);
  });
}
