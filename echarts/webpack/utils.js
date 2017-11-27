const path = require('path')
const fs = require('fs')
const os = require('os')
const chalk = require('chalk')
const timestamp = require('time-stamp')
const glob = require('glob')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./config')
const version = require('./version').version

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

/**
 * 匹配入口文件路径
 */
exports.getEntries = globPath => {
  const entries = {}
  const results = glob.sync(globPath)
  if (results.length === 1) {
    const entry = results[0]
    // 如果是单页面则只使用文件名，不使用目录
    const pathname = entry.split('/').splice(-1).join().split('.')[0]
    entries[pathname] = entry
  } else if (results.length > 1) {
    results.forEach(entry => {
      /* // 多页面项目使用目录与文件名作为入口的区分
      const pathname = entry.split('/').splice(-2).join('/').split('.')[0] */
      // 多页面项目使用目录名作为入口的区分
      const pathname = entry.split('/').splice(-2, 1).join().split('.')[0]
      entries[pathname] = entry
    })
  }
  return entries
}

/**
 * 输出错误，停止 node 进程
 */
exports.outputError = err => {
  console.log(chalk.red(err))
  process.exit(1)
}

/**
 * 计算版本
 * @{start} 设置新版本
 */
exports.calcVersion = start => {
  // 检查版本是否存在
  if (!version && !start) {
    exports.outputError(`  没有初始化的版本记录，运行下面的命令初始化一个版本\n  npm run build-sit -- -s <version> `)
  }
  // 如果设置新版本号则在末尾加上.1，如果没有则末尾计数递增
  const newVersion = start ? start + '.1' : version.replace(/\d+$/, m => ++m)
  // 记录版本信息
  fs.appendFile(
    path.resolve(__dirname, './version.js'),
    `${os.EOL}module.exports.version = '${newVersion}' // ${timestamp('YYYY-MM-DD HH:mm:ss.ms')}${os.EOL}`,
    err => {
      if (err) throw err
      console.log(`\nCurrently built version: ${newVersion}`)
    }
  )
  return newVersion
}
