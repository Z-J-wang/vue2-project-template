# backstage-management-system
> 本项目基于Vue、VueCLI4.0及Element-ui 搭建的后台管理系统


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

### Git commit 规范

#### 格式：
```
<type>(<scope>): <subject>
```
> type（必需）、scope（可选）和subject（必需）

#### 字段解析

> ##### type
> + feat：新功能（feature）
> + fix：修补bug
> + docs：文档（documentation）
> + style： 格式（不影响代码运行的变动）
> + refactor：重构（即不是新增功能，也不是修改bug的代码变动）
> + test：增加测试
> + chore：构建过程或辅助工具的变动
> ***
> ##### scope
> `scope` 用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。
> ****
> ##### subject
> `subject` 是 commit 目的的简短描述，不超过50个字符。
>***