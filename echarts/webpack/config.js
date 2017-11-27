/**
 * 页面的文件名规则：
 * 1. 页面的文件夹名不能与其他页面的文件夹名冲突
 * 2. 模板 html 与入口 js 文件的文件名要一致
 */

const path = require('path')

module.exports = {
  project: {
    entry: './src/views/'
  },
  build: {
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    sourceMap: false
  },
  dev: {
    port: 2333,
    autoOpenBrowser: false,
    cssSourceMap: true,
    mock: true,
    webSocket: true,
    proxy: {}
  }
}
