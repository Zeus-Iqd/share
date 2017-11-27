const mock = require('mockjs').mock
const glob = require('glob')

const APIs = {}
const modules = glob.sync('./mock/!(index).js')
modules.forEach(item => {
  const pathname = './' + item.match(/\/(\w+)\.js$/)[1]
  const mockModule = require(pathname)
  if (typeof mockModule === 'object') {
    Object.assign(APIs, mockModule)
  }
})


// 匹配方法，验证，路由
const reg = {
  method: /^(\w+)/,
  auth: /\bauth\b/,
  route: /(\/\S+)$/
}

/**
 * 提取 mock 配置的方法，验证，路由
 */
module.exports = app => {
  for (const item in APIs) {
    const method = reg.method.exec(item)[1].toLowerCase()
    const isAuth = reg.auth.test(item)
    const route = reg.route.exec(item)[1]

    app[method](route, (req, res) => res.send(mock(APIs[item])))
  }
}
