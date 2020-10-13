# commonplatform


## 所用技术
+ VueCLi 4.3.1
+ axios 0.20.0
+ vue-cookies 1.7.4
+ element-ui 2.13.2
+ less 3.0.4

## Project setup
```
npm install
```

> 如果 `image-webpack-loader` 安装失败, 请使用 cnpm 安装。
```
cnpm i image-webpack-loader --save-dev
```
### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

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
│?? ├── App.vue
│?? └── main.js
├── .browserslistrc                         浏览器兼容配置
├── .editorconfig                           代码格式化配置（注意：需要与 eslint 配置一致）
├── .env.development                        开发环境变量配置
├── .env.production                         生产环境变量配置
├── .eslintrc.js                            eslint 配置
├── .gitignore                              git 忽略文件
├── babel.config.js                         label 配置
├── CHANGELOG.md                            项目 change log
├── package-lock.json
├── package.json
├── README.md
└── vue.config.js                           VueCli webpack 配置

```

## Git commit 规范

### 格式：
```
<type>(<scope>): <subject>
```
> type（必需）、scope（可选）和subject（必需）

### 字段解析

> #### type
> + feat：新功能（feature）
> + fix：修补bug
> + docs：文档（documentation）
> + style： 格式（不影响代码运行的变动）
> + refactor：重构（即不是新增功能，也不是修改bug的代码变动）
> + test：增加测试
> + chore：构建过程或辅助工具的变动
> ***
> #### scope
> `scope` 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
> ****
> #### subject
> `subject` 是 commit 目的的简短描述，不超过50个字符。
>***
