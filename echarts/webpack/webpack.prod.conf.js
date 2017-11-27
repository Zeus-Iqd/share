const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const baseWebpackConfig = require('./webpack.base.conf')
const utils = require('./utils')
const config = require('./config')

module.exports = version => {
  // 如果是打包给SIT，则使用版本号作为hash值

  const webpackConfig = merge(baseWebpackConfig, {
    module: {
      rules: utils.styleLoaders({
        sourceMap: config.build.sourceMap,
        extract: true
      })
    },
    devtool: config.build.sourceMap ? '#source-map' : false,
    output: {
      path: config.build.assetsRoot,
      filename: `assets/js/[name].${version ? version : '[chunkhash:7]'}.js`,
      chunkFilename: `assets/js/[id].${version ? version : '[chunkhash:7]'}.js`
    },
    plugins: [
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          PLATFORM: JSON.stringify(process.env.PLATFORM)
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        filename: `assets/css/[name].${version ? version : '[contenthash:7]'}.css`
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),
      // keep module.id stable when vender modules does not change
      new webpack.HashedModuleIdsPlugin(),
      // split vendor js into its own file
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module, count) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, '../node_modules')
            ) === 0
          )
        }
      }),
      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      /* new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['vendor']
      }), */
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../assets'),
          to: 'assets',
          ignore: ['.*']
        }
      ])
    ]
  })
  // 获取页面主页模板
  const pages = utils.getEntries(path.join(config.project.entry + '/**/*.html'))
  const count = Object.keys(pages).length

  if (count) {
    for (const item in pages) {
      const conf = {
        filename: (count === 1 ? 'index' : item) + '.html',
        template: pages[item],
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      }
      if (item in webpackConfig.entry) {
        conf.chunks = ['vendor', item]
        conf.hash = true
      }
      webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
    }
  } else {
    utils.outputError('找不到主页模板，请检查配置的入口目录')
  }

  if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          config.build.productionGzipExtensions.join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }

  if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }

  return webpackConfig
}
