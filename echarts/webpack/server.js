const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')
const config = require('./config')
const mock = require('../mock')
const socketMock = require('../mock/websocket')

const port = process.env.PORT || config.dev.port
const proxyTable = config.dev.proxy

const app = express()
const compiler = webpack(webpackConfig)

// mock
if (config.dev.mock) {
  mock(app)
}

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})


// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

app.use('/', express.static('./'))
app.use('/assets', express.static('./dist/assets'))

const uri = 'http://localhost:' + port

let _resolve
const readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (config.dev.autoOpenBrowser) {
    opn(uri)
  }
  _resolve()
})

const server = app.listen(port)

if (config.dev.webSocket) {
  const io = require('socket.io').listen(server)
  io.sockets.on('connection', socket => {
    console.log('client connect')
    socketMock(socket)
  })
}


module.exports = {
  ready: readyPromise,
  close() {
    server.close()
  }
}
