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

    socket.emit('roomMessage', `Youy Joined to ${user.roomName}`)

    socket.broadcast.to(user.roomName).emit('roomMessage', `${user.userName} Joined to ${user.roomName}`)
  })

  socket.on('chatMessage', (message: PersonSendMessage) => {
    const findUser = userData.find(user => user.clientId === socket.id)

    if (findUser !== undefined) {
      io.to(findUser?.roomName!).emit('message', {
        message: message.message,
        userName: message.userName,
        clientId: message.clientId
      })
    }
  })

  socket.on('send-img', (image: PersonSendImage) => {
    const findUser = userData.find(user => user.clientId === socket.id)

    if (findUser !== undefined) {
      io.to(findUser?.roomName!).emit('image', {
        src: image,
      })
    }
  })

  socket.on('disconnect', () => {
    const findUser = userData.find(user => user.clientId === socket.id)

    if (findUser !== undefined) {
      socket.leave(findUser?.roomName!)

      io.to(findUser?.roomName!).emit('roomMessage', `${findUser?.userName} left the ${findUser?.roomName}`)

      userData = userData.filter(user => user.clientId !== socket.id)
    }
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

export const viteNodeApp = app
