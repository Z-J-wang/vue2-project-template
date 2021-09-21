/**
 * 自动化批量导入模块
 *
 * 本函数需要配合 webpage 函数 require.context 来使用。
 * @param {Function} context require.context()返回的结果；
 * @returns {Array} 查找到的模块加载后,存入一个数组抛出
 */
function automatedImportForArray(context) {
  return context.keys().map(item => {
    var value = context(item);
    return value.default || value;
  });
}

/**
 * 自动化批量导入模块，将导入的模块存贮到一个对象中导出
 * @param {Function} context require.context()返回的结果；
 * @returns { Object } 查找到的模块加载后,存入一个对象中，抛出对象
 */
function automatedImportForObject(context) {
  const obj = {};

  context.keys().map(item => {
    const module = context(item);

    // 模块的导出分为 export 和 export default 两种，两种方法导出的模块结构不一样，需分别处理
    if (module.default) {
      // export default 导出的主体内容都在 module.default 属性中，
      // 这里将不对 module.default 属性值做解析，直接添加给 obj，属性名为其文件名
      const moduleName = getFileName(item);
      obj[moduleName] = module.default;
    } else {
      // export 导出的内容以键值对的形式存储在 module 中，直接转储到 obj 中
      for (let property in module) {
        obj[property] = module[property];
      }
    }
  });

  return obj;
}

/**
 * 自动导入 module 的路由
 * @param {Function} context require.context()返回的结果；
 * @returns {Array} 查找到的模块加载后,存入一个数组抛出
 */
function automatedImportOfRoutes(context) {
  let arr_context = []; // 整合好的路由数组
  context.keys().forEach(item => {
    if (item.split('/').length <= 4) {
      /**
       * automatedImportForArray 方法不仅可以自动导入 modules 一级子模块的路由文件，
       * 还可以导入二级甚至三级都路由文件（即，子模块里的子模块的路由）。这样就破坏路由
       * 文件的层级，所以这里做了限制——只导入相对于子模块的路由文件。子模块的路由文件整
       * 合由子模块自己维护
       */
      let value = context(item);
      arr_context = [...arr_context, ...value.default];
    }
  });

  return arr_context;
}

/**
 * 提取路径中的文件名
 * @param path 路径
 */
function getFileName(path) {
  const path_split = path.split('/');
  const file = path_split[path_split.length - 1];
  const file_split = file.split('.');
  const fileName = file_split[0];

  return fileName;
}

export { automatedImportForObject, automatedImportForArray, automatedImportOfRoutes };
