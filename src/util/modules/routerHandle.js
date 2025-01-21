/**
 * 路由配置文件工具函数库，包含路由配置自动化导入函数、需要过滤的业务模块判断函数
 * @module
 */


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

export { automatedImportOfRoutes, isFilterModule };
