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
│?? │?? └── index.js                      	http request 对外接口（用于整合全部 http request API，统一暴露出去）
│?? ├── components                          Vue 功能组件（功能组件与views中的页面对应，增加一个页面就应该在components 添加一个对应的文件夹，文件夹里面存放该页面的功能组件）
│?? ├── extends                             借助 vue extends 创建的全局组件集合（vue extends 常用于创建指令型功能组件）
│?? │?? ├── modules													vue extends 创建的子组件存放点
│?? │?? └── index.js 												extends 对外暴露的接口
|?? ├── global-components										全局注册组件，所有的全局注册组件都在这里配置（注意区分全局注册组件和全局通用组件）
│?? │?? ├── modules													全局注册组件存放点
│?? │?? └── index.js 												全局注册组件的配置文件
│?? ├── modules                             业务模块集合（根据业务模块来进行代码上的模块划分，每个模块“低耦合，高凝聚”。模块内部的目录结构和vue-cli相似，同样包含 assets、axios、components、routes、views）
│?? │?? ├── module-name						           模块字(一个文件夹对应一个模块)
│?? │?? │?? └── assets
│?? │?? │?? └── axios
│?? │?? │?? └── components
│?? │?? │?? └── routes
│?? │?? │?? └── views
│?? ├── router                              vue-router
│?? │?? └── index.js
│?? ├── store                               vuex
│?? │?? ├── modules													vuex 子模块
│?? │?? └── index.js 												vuex 对外暴露的接口
│?? ├── util                                工具类 API
│?? │?? ├── modules													util 子模块
│?? │?? └── index.js 												util 对外暴露的接口
│?? ├── views                               网站页面
│?? ├── App.vue
│?? └── main.js
├── .browserslistrc                         浏览器兼容配置
├── .editorconfig                           代码格式化配置（注意：需要与 eslint 配置一致）
├── .env.development                        开发环境变量配置
├── .env.production                         生产环境变量配置
├── .eslintrc.js                            eslint 配置
├── .gitignore                              git 忽略文件
├── .prettierrc                             Prettier - Code formatter 配置文件
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
