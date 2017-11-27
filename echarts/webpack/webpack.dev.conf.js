const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const utils = require('./utils')
const baseWebpackConfig = require('./webpack.base.conf')
const config = require('./config')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PLATFORM: JSON.stringify(process.env.PLATFORM)
      }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin()
  ]
})

// 获取页面主页模板
const pages = utils.getEntries(path.join(config.project.entry + '/**/*.html'))
const count = Object.keys(pages).length

console.log(chalk.bgCyan(`发现 ${count} 个页面\n`))

if (count) {
  for (const item in pages) {
    const conf = {
      filename: (count === 1 ? 'index' : item) + '.html',
      template: pages[item],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }
    if (item in module.exports.entry) {
      conf.chunks = ['vendor', item]
      conf.hash = false
    }
    console.log(chalk.cyan.underline(`http://localhost:${config.dev.port}/${conf.filename}\n`))
    module.exports.plugins.push(new HtmlWebpackPlugin(conf))
  }
} else {
  utils.outputError('找不到主页模板，请检查配置的入口目录')
}
