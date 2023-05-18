import Vue from 'vue';
import VueRouter from 'vue-router';
import { automatedImportOfRoutes } from '@/util/modules/routerHandle';

// 自动加载 modules 的路由文件
const modulesRoutes = automatedImportOfRoutes(
  require.context('@/business-modules/', true, /\/routes\/index.js/)
);

Vue.use(VueRouter);

// 解决多次点击同一路由报错问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      scrollToTop: true
    },
    component: () => import(/* webpackChunkName: "home" */ '../views/home.vue')
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      scrollToTop: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {
      scrollToTop: true
    },
    component: () => import(/* webpackChunkName: "404" */ '../views/404.vue')
  },
  {
    path: '*',
    redirect: {
      name: '404'
    }
  },
  ...modulesRoutes
];

/**
 * 路由切换滚动条行为
 * 具体查看：https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html
 * @param {*} to
 * @param {*} from
 * @param {*} savedPosition
 * @returns { x: number, y: number }
 */
const scrollBehavior = function (to, from, savedPosition) {
  if (savedPosition) {
    // savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
    return savedPosition;
  } else {
    return { x: 0, y: 0 };
  }
};

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior
});

router.beforeEach((to, from, next) => {
  // 路由守卫
  next();
});

export default router;
