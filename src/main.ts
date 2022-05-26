import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { Person, PersonSendImage, PersonSendMessage } from './types'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST']
  }
})

let userData: Array<Person> = []

io.on('connection', socket => {
  socket.on('userData', (user: Person) => {
    userData = userData.concat(user)

    socket.join(user.roomName)

    io.to(user.roomName).emit('roomMessage', `${user.userName} joined the ${user.roomName}`)
  })

  socket.on('chatMessage', (message: PersonSendMessage) => {
    const userRoom = userData.map(user => user.roomName)

    io.to(userRoom).emit('message', {
      message: message.message,
      userName: message.userName,
      clientId: message.clientId
    })
  })

  socket.on('send-img', (image: PersonSendImage) => {
    const userRoom = userData.map(user => user.roomName)

    io.to(userRoom).emit('image', {
      src: image
    })
  })

  socket.on('disconnect', () => {
    const userRoom = userData.map(user => user.roomName)
    const userName = userData.map(user => user.userName)

    socket.leave(userRoom.toString())

    io.to(userRoom).emit('roomMessage', `${userName} left the ${userRoom}`)

    userData = []
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

export const viteNodeApp = app
