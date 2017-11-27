const path = require('path')
const utils = require('./utils')
const config = require('./config')

const resolve = dir => path.join(__dirname, '..', dir)
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: utils.getEntries(config.project.entry + '/**/index.js'),
  output: {
    path: '/',
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.less', '.css'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
    symlinks: false
  },
  module: {
    rules: [{
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    }, {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: utils.cssLoaders({
          sourceMap: isProduction ? config.build.sourceMap : config.dev.cssSourceMap,
          extract: isProduction
        }),
        transformToRequire: {
          video: 'src',
          source: 'src',
          img: 'src',
          image: 'xlink:href'
        }
      }
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'assets/img/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'assets/media/[name].[hash:7].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'assets/fonts/[name].[hash:7].[ext]'
      }
    }]
  }
}
