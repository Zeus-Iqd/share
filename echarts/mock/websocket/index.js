let i = 1

module.exports = socket => {
  socket.on('send', data => {
    if (data === '你叫什么') {
      socket.emit('message', '不知道')
    } else {
      socket.emit('message', { count: i++ })
    }
  })
}
