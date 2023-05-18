// 本文件的详细说明请查阅：https://blog.csdn.net/weixin_44869002/article/details/106826503

const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin'); // js压缩插件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  publicPath: '/', // 基本路径
  assetsDir: 'assets',
  outputDir: 'dist', // 输出文件目录
  filenameHashing: true, // 生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存
  productionSourceMap: false, // 生产环境是否生成 sourceMap 文件

  chainWebpack: config => {
    // 启用打包分析工具 BundleAnalyzer
    config.when(process.env.NODE_ENV_BUNDLE_ANALYZE === 'true', config => {
      config.plugin('BundleAnalyzerPlugin').use(BundleAnalyzerPlugin);
    });

    // 开启图片压缩
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.limit = 10240; // 小于10kb的图片都转为base64
        return options;
      })
      .end();
    // 启用图片压缩功能
    // .use('image-webpack-loader')
    // .loader('image-webpack-loader')
    // .options({ bypassOnDebug: false })
    // .end();

    /**
     * 将svg图片转为组件使用
     */
    // const svgRule = config.module.rule('svg');
    // svgRule.uses.clear();
    // svgRule.use('vue-svg-loader').loader('vue-svg-loader');

    // 配置Jquery
    config.plugin('provide').use(webpack.ProvidePlugin, [
      {
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default']
      }
    ]);
  },

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production';
      // 将每个依赖包打包成单独的js文件
      const optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all', // 选择哪些 chunk 进行优化, 有效值 all，async 和 initial
          maxAsyncRequests: 30, // 按需加载时的最大并行请求数
          maxInitialRequests: 30, // 入口点的最大并行请求数
          minSize: 30000, // 生成 chunk 的最小体积（以 bytes 为单位）
          maxSize: 1024000, // 生成 chunk 的最大体积（以 bytes 为单位），对大于该值的js尝试做拆分
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              chunks: 'all',
              name(module) {
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
                return `npm.${packageName.replace('@', '')}`;
              }
            },
            common: {
              name: 'chunk-common',
              minChunks: 2,
              priority: -20,
              chunks: 'all',
              reuseExistingChunk: true
            },
            element: {
              chunks: 'all',
              name: 'element-ui',
              test: /[\\/]element-ui[\\/]/,
              minChunks: 2,
              priority: 0
            },
            merges: {
              test: /[\\/]supplyAndDemand[\\/]|[\\/]src[\\/]src\/views[\\/]/,
              priority: 0,
              name: 'merges'
            }
          }
        },
        // 插件优化
        minimize: true,
        minimizer: [
          // js压缩插件
          new TerserPlugin({
            parallel: true,
            // sourceMap: true,
            terserOptions: {
              extractComments: false, // 注释剥离功能
              format: {
                comments: false // 删除所有注释
              },
              warnings: true,
              // parse: {},
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'] // 移除console
              }
            }
          })
        ]
      };
      Object.assign(config, {
        optimization
      });
    } else {
      // 为开发环境修改配置...
      config.mode = 'development';
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          // 别名配置
          '@': path.resolve(__dirname, './src'),
          '@a': path.resolve(__dirname, './src/assets'),
          '@c': path.resolve(__dirname, './src/components')
        }
      }
    });
  },

  // css相关配置
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: true, // 开启 CSS source maps?
    requireModuleExtension: true, // 是否仅对文件名包含module的css相关文件使用 CSS Modules
    loaderOptions: {
      css: {
        modules: {
          localIdentName: '[local]_[hash:base64:8]' // 设定 CSS Modules 命名规则
        }
      }
    } // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
  },

  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,

  // webpack-dev-server 相关配置
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: '',
    //     changeOrigin: true // 允许跨域
    //     // pathRewrite: { '^/api': '' }
    //   }
    // },
    open: false,
    inline: true, // 开启实时刷新
    // host: '0.0.0.0', // 允许外部ip访问
    port: 8024, // 端口
    https: false, // 启用https
    overlay: {
      warnings: true,
      errors: true
    } // 错误、警告在页面弹出
  },

  // 第三方插件配置
  pluginOptions: {},

  lintOnSave: false
};
