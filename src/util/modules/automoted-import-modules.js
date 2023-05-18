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

/**
 * 自动导入 module 的路由
 * @param {Function} context require.context()返回的结果；
 * @returns {Array} 查找到的模块加载后,存入一个数组抛出
 */
function automatedImportOfRoutes(context) {
  let arr_context = []; // 整合好的路由数组
  context.keys().forEach(item => {
    if (!needFilter(item)) {
      // 过滤不需要整合的 module
      if (item.split('/').length <= 4) {
        /**
         * automatedImportForArray 方法不仅可以自动导入 modules 一级子模块的路由文件，
         * 还可以导入二级甚至三级都路由文件（即，子模块里的子模块的路由）。这样就破坏路由
         * 文件的层级，所以这里做了限制——只导入一级子模块的路由文件。子模块的路由文件整
         * 合由子模块自己维护
         */
        let value = context(item);
        arr_context = [...arr_context, ...value.default];
      }
    }
  });

  return arr_context;
}

/**
 * 判断 module 是否需要过滤。需要返回 true;不需要返回 false
 * @param {*} modulePath module 路径
 * @returns {Boolean}
 */
function needFilter(modulePath) {
  const pathArray = modulePath.split('/');
  if (pathArray?.length >= 2) {
    // 模块路径可以解析模块名，则进行下一步判断
    const moduleName = pathArray[1]; // 提取模块名
    return isFilterModule(moduleName); // 判断模块名是否包含于 needFilterModules
  } else {
    // 模块路径无法解析模块名，则直接返回 false(放行)
    return false;
  }
}

/**
 * 根据模块名判断是否需要过滤
 * @param {string | array} moduleNames-需要判断的模块名，如果其值为字符串,则该模块名需要过滤时返回true；如果其值为数组，则当数组全部模块都需要过滤是才返回true
 * @returns {boolean} true 标识需要过滤，false表示不需要过滤
 */
function isFilterModule(moduleNames) {
  const FilterModules = process.env.VUE_APP_FILTERMODULES;
  let needFilterModules = [];
  let ret = false;
  if (typeof FilterModules === 'string') {
    needFilterModules = FilterModules?.split('|'); // 需要过滤的模块队列
  }

  if (typeof moduleNames === 'string') {
    // moduleNames 为字符串，直接判断字符串是否在数组中
    ret = needFilterModules.includes(moduleNames);
  } else if (moduleNames instanceof Array) {
    // moduleNames 为数组，则判断数组每个模块是否需要过滤
    for (let i = 0; i < moduleNames.length; i++) {
      if (!needFilterModules.includes(moduleNames[i])) {
        // 存在某个模块不需要过滤，就停止遍历，返回 false
        ret = false;
        break;
      } else {
        ret = true;
      }
    }
  }

  return ret;
}

export {
  automatedImportForObject,
  automatedImportForArray,
  automatedImportOfRoutes
};
