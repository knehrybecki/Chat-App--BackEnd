import express from 'express'
const app = express()
import { createServer } from 'http'
const server = createServer(app)
import { Server } from "socket.io"

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
})

io.on('connection', (socket) => {
  socket.on('new-user', user => {
    socket.on('room', room => {
      socket.join(room)

      io.to(room).emit('roomMessage', `${user} joined the ${room}`)

      socket.on('chatMessage', (data) => {
        io.to(room).emit('message', {
          message: data.message,
          userName: data.user,
          clientID: data.clientID
        })
      })

      socket.on("send-img", (image) => {
        io.to(room).emit('image', {
          src: image,
          userID: socket.id
        })
      })

      socket.on('disconnect', () => {
        socket.leave(room)
        io.to(room).emit('roomMessage', `${user} left the ${room}`)
      })
    })
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

export const viteNodeApp = app
