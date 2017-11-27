const fs = require('fs')
const path = require('path')
const rm = require('rimraf')
const chalk = require('chalk')
const ora = require('ora')
const program = require('commander')
const webpack = require('webpack')
const config = require('./config')
const utils = require('./utils')

// 解析命令行参数，获取输入的版本
program
  .version('1.0.0')
  .description('Record built versions')
  .option('-s, --set <set>', 'set verison')
  .parse(process.argv)

let building = 'Building for production...'
// 打包给SIT
let version
if (process.env.PUBLISH === 'SIT') {
  building = 'Building for SIT...'
  // 得到版本号
  version = utils.calcVersion(process.set)
}
const spinner = ora(building)
spinner.start()

rm(path.resolve(__dirname, '../dist'), err => {
  if (err) throw err
  webpack(require('./webpack.prod.conf')(version), (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
