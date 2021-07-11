import util from '@/util/index';

// 自动加载 /case-show/modules/ 里全部的路由文件
const modulesRoutes = util.automatedImportOfRoutes(require.context('@/modules/case-show/modules/', true, /routes\/index\.js/));


export default modulesRoutes;
