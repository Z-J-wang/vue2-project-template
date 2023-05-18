import AxiosConfig from './config'; // 导入 axios 配置类
import util from '@/util/index';

// 自动导入 module 子模块的 axios
const MoudulesApi = util.automatedImportForArray(require.context('@/business-modules', true, /axios\/.+\.js/));

export default class httpApi extends util.classMixin(AxiosConfig, ...MoudulesApi) {
  constructor() {
    super();
    this.axios = super.getInstance();
  }

  /**
   * 举例
   */
  example = () => this.axios.get('/api/account/example');

  /**
   * 分页查询博客列表
   * @param {*} params
   * @returns
   */
  getArticlesByPage = params => this.axios.get('/api/article/getArticlesByPage', { params: params });
}
