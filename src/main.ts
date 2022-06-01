import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {
  addMessageToRoom,
  addUser,
  allMessageInRoom,
  deleteUser,
  getMessageFromRoom
} from './firebase'
import {
  ImageMessage,
  TextMessage,
  User
} from './types'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST']
  }
})

let userData: Array<User> = []
export let allMessageFromRoom: Array<ImageMessage | TextMessage> = []

io.on('connection', socket => {
  socket.on('userData', async (user: User) => {
    userData = userData.concat(user)

    const roomName = user.roomName

    socket.join(roomName)

    addUser(user)

    await addMessageToRoom(roomName)

    socket.emit('roomMessage', `You Joined to ${roomName}`, allMessageInRoom)

    socket.broadcast.to(roomName).emit('roomMessage', `${user.userName} Joined to ${user.roomName}`)
  })

  socket.on('chatMessage', (messages: TextMessage) => {
    const foundUser = userData.find(user => user.clientId === socket.id)
    const { message, userName, clientId, createdAt} = messages
    const dataMessage = {
      message,
      userName,
      clientId,
      createdAt
    }

    if (foundUser !== undefined) {
      allMessageFromRoom = allMessageFromRoom.concat(dataMessage)

      getMessageFromRoom(foundUser?.roomName!, allMessageFromRoom)

      io.to(foundUser?.roomName!).emit('message', dataMessage)
    }
  })

  socket.on('send-img', (image: ImageMessage) => {
    const foundUser = userData.find(user => user.clientId === socket.id)

    allMessageFromRoom = allMessageFromRoom.concat(image)

    getMessageFromRoom(foundUser?.roomName!, allMessageFromRoom)

    if (foundUser !== undefined) {
      io.to(foundUser?.roomName!).emit('image', image)
    }
  })

  socket.on('disconnect', () => {
    const foundUser = userData.find(user => user.clientId === socket.id)

    if (foundUser !== undefined) {
      socket.leave(foundUser?.roomName!)

      deleteUser(socket.id)

      allMessageFromRoom = []
      
      io.to(foundUser?.roomName!).emit('roomMessage', `${foundUser?.userName} left the ${foundUser?.roomName}`)

      userData = userData.filter(user => user.clientId !== socket.id)
    }
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

export const viteNodeApp = app
