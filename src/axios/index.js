import instance from './config';
import util from '@/util/index';

// 自动导入 module 子模块的 axios
const moudulesApi = util.automatedImportForArray(require.context('@/modules', true, /axios\/.+\.js/));

export default class httpApi extends util.classMixin(instance, ...moudulesApi) {
  constructor() {
    super();
    this.axios = super.getInstance();
  }

  /**
   * 举例
   */
  example = () => this.axios.get('/api/account/example');
}
