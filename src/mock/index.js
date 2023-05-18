/**
 * @module mockjs 入口文件
 */
import util from '@/util/index';
import Mock from 'mockjs';

/**
 * 根据运行环境来决定是否导入 mock 的 module
 * 只有导入了 mock 的 module 文件，才是真正启用 mockjs
 */
if (process.env.NODE_ENV === 'mock') {
  // 当环境变量 NODE_ENV 等于 mock 时自动导入mock的 module

  // 设置拦截ajax请求的相应时间
  Mock.setup({
    timeout: '200-600'
  });

  util.automatedImportForObject(
    require.context('@/mock/modules', true, /.+\.js/)
  );
}
