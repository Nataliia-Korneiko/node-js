const http = require('http') // для работы io с express
const express = require('express')
const socketIo = require('socket.io')

const PORT = process.env.PORT || 8080

const app = express() // создаем сервер express

// подключение юзера к серверу и отправка статики
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`)
})

const httpServer = http.Server(app) // создаем сервер http и прокидываем app (сервер express)

const io = socketIo(httpServer) // передаем сервер http в сокет io (инициализация)

let count = 0

// event, который срабатывает при подключении юзера
io.on('connection', (socket) => {
  console.log('New user is connected')

  // отдельно для каждого юзера (отключение юзера)
  socket.on('disconnect', () => {
    count--
    console.log('User is disconnected')
  })

  // значение из input приходит в message
  socket.on('chatMessage', (message) => {
    // console.log('message:', message)
    io.emit('chatMessage', message) // message отправляется всем юзерам
  })

  count++
  socket.broadcast.emit('userConnected', count) // отправляет всем кроме отправителя
})

httpServer.listen(PORT, () => {
  console.log('Server is listening on port', PORT)
})
