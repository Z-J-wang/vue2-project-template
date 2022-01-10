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
│?? ├── business-modules                    业务模块集合（根据业务模块来进行代码上的模块划分，每个模块“低耦合，高凝聚”。模块内部的目录结构和vue-cli相似，同样包含 assets、axios、components、routes、views）
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

## 为什么要设立 business-modules 文件夹

business-modules 文件夹中存放的是根据业务模块划分的代码集合，将业务相关的代码都集合在一起便以代码管理和查找。例如，将用户相关的代码集合到 `business-modules/user` 目录下，那以后查找用户相关的代码，就可以快速定位。此外，经过这样的划分后，各个业务模块的代码实现了“高内聚，低耦合”。

### 怎么实现 business-modules

仔细观察 vue 的各个页面的关联，可以发现：**vue 每个页面的的联系都是由`vue-router`在维系着的。无论页面代码放在项目中的哪里，只要路由配置正常，都可以正常访问**。

基于这一点，就可以实现 business-modules 了。

观察 business-modules 模块内部的目录结构可以发现，business-modules 模块内部结构与 vue-cli 目录结构极其相似。事实上，可以把 business-modules 模块看作一个子 vue-cli 项目。 business-modules 模块与主体的 vue-cli 的“链接”仅仅是通过 vue-router 连接。在 business-modules 模块开发过程中，只需关注当前的 business-modules 模块的开发，等开发完成后在主体的 `src/router/index.js` 路由文件中导入开发好的 business-modules 模块的路由配置文件即可。



## 项目实现自动化import

因为 business-modules 的实现，每新增一个 business-modules，都需要到`src/router/index.js` 手动导入 business-modules 的路由文件。这样就会造成大量的重复工作以及导致 `src/router/index.js` 的臃肿，甚至还可能因为人为的失误导致代码无法允许。对于这种简单的重复性工作，可以实现一个自动化工具来替代人工操作。

实现自动化import的关键函数是 webpage 的 `require.context`。借助 `require.context`，webpage 在编译时可以自动查找匹配的文件，并 `import` 。

本项目已经对 routes、axiso、util、extends、vuex 实现了自动化import。
> 关键的代码请查看：`src/util/modules/automoted-import-modules.js`。
>
> 实现原理解析可查看：[require.context() ——实现 vue 模块的自动导入](https://blog.csdn.net/weixin_44869002/article/details/109702090)


