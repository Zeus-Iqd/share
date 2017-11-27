const Mock = require('mockjs')
const R = Mock.Random

module.exports = {
  'GET /api/user/:id': {
    code: 0,
    msg: 'success',
    data: {
      name: R.name()
    }
  }
}
