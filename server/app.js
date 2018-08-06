var server = require('http').createServer(),
  io = require('socket.io')(server),
  PORT = 8081

//监听client的连接,回调函数传递本次连接的socket
io.on('connection', function (socket) {
  // 接收用户发送的消息
  socket.on('click', function (data) {
    // 广播接收到的消息
    io.emit('incident', data);
  })

})

console.log('listening at :' + PORT)

server.listen(PORT);
