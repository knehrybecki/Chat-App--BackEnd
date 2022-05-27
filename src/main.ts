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

    io.to(user.roomName).emit('roomMessage', `You Joined to ${user.roomName}`)
  })

  socket.on('chatMessage', (message: PersonSendMessage) => {
    const findUser: Person | undefined = userData.find(user => user.clientId === socket.id)

    io.to(findUser?.roomName!).emit('message', {
      message: message.message,
      userName: message.userName,
      clientId: message.clientId
    })
  })

  socket.on('send-img', (image: PersonSendImage) => {
    const findUser: Person | undefined = userData.find(user => user.clientId === socket.id)

    io.to(findUser?.roomName!).emit('image', {
      src: image,
    })
  })

  socket.on('disconnect', () => {
    const findUser: Person | undefined = userData.find(user => user.clientId === socket.id)
    
    socket.leave(findUser?.roomName!)

    io.to(findUser?.roomName!).emit('roomMessage', `${findUser?.userName} left the ${findUser?.roomName}`)

    userData = userData.filter(user => user.clientId !== socket.id)
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

export const viteNodeApp = app
