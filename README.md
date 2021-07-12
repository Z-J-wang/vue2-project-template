# vue-cli-template
> vue-cli-template 模板项目架构

## 运行环境
+ node v12.16.1
+ npm v6.13.4
+ vueCLi 4.5.9

## 所用插件
+ vue ^2.6.11
+ axios ^0.19.2
+ vue-cookies ^1.7.4
+ element-ui ^2.13.2
+ less ^3.0.4
+ vue-cookies ^1.7.4
+ wangeditor ^4.7.1
+ mavon-editor ^2.9.1

## 项目运行前先下载插件：
```
npm install
```

> 如果 `image-webpack-loader` 安装失败, 请使用 cnpm 安装。
```
cnpm i image-webpack-loader --save-dev
```
### 项目本地调试

```
npm run serve
```

### 项目打包
```
npm run build
```

### Lints 检测
```
npm run lint
```

## 目录结构
```
COMMONPLATFORM
├── dist 
├── node_modules
├── public                                  公用文件
│?? ├── favicon.png                         网站头像（Favorites Icon）
│?? └── index.html                          vueCli 首页
├── src                                     开发文件主要存放处
│?? ├── assets                              静态资源
│?? │?? ├── css
│?? │?? ├── images
│?? │?? └── js
│?? ├── axios                               http request 相关文件
│?? │?? ├── config                          axios 配置
│?? │?? ├── modules                          http request 模块分离（用于预防网站 http request API 过多导致单个文件过于冗长，难以查找）
│?? │?? └── HttpApi.js                      http request 对外接口（用于整合全部 http request API，统一暴露出去）
│?? ├── components                          Vue 功能组件（功能组件与页面对应，增加一个页面就应该在components 添加一个对应的文件夹，文件夹里面存放该页面的功能组件）
│?? ├── router                              vue-router
│?? │?? ├── modules                         vue-router 模块分离
│?? │?? └── index.js
│?? ├── store                               vuex
│?? ├── util                                工具类 API
│?? ├── views                               网站页面
│?? ├── modules                             各个模块
│?? │?? ├── filename						            文件夹名(单独一个模块)
│?? │?? │?? └── router
│?? │?? │?? │?? └── front.js                前台所有路由
│?? │?? │?? │?? └── back.js                 后台管理所有路由（用来自动生成侧边栏菜单）
│?? │?? │?? │?? └── user.js                 个人中心所有路由（用来自动生成侧边栏菜单）
│?? │?? │?? │?? └── service-provider-management.js 服务商管理所有路由（用来自动生成侧边栏菜单）
│?? │?? │?? └── axios
│?? │?? │?? └── views
│?? │?? │?? └── components
│?? ├── App.vue
│?? └── main.js
├── .browserslistrc                         浏览器兼容配置
├── .editorconfig                           代码格式化配置（注意：需要与 eslint 配置一致）
├── .env.development                        开发环境变量配置
├── .env.production                         生产环境变量配置
├── .eslintrc.js                            eslint 配置
├── .gitignore                              git 忽略文件
├── babel.config.js                         babel 配置
├── CHANGELOG.md                            项目 change log
├── package-lock.json
├── package.json
├── README.md
└── vue.config.js                           VueCli webpack 配置

```



## axios 使用说明

+ `withCredentials: true`:默认携带cookie
+ `timeOut: 5000` 请求超时5秒
+ 所有请求header 中默认添加 `authorization`，向后端传递 token
+ 所有请求的url自动添加前缀`/api`。可通过添加`config.noApi = true`取消该功能。eg: `this.axios.get('/docs/mallCodeList.json', { noApi: true });`
+ 通过设置`config.notFilter`,可以让api直接抛出`ret = 0`的请求成功的数据
+ 默认对所有的后端主动发送的请求错误信息做alert错误信息显示。可以通过设置`config.autoMsg`关闭
