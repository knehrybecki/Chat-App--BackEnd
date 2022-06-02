import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {
  addMessageToRoom,
  addUser,
  allMessagesInRoom,
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
    methods: ['GET', 'POST'],
  },
})

let userData: Array<User> = []
export let allMessagesFromRoom: Array<ImageMessage | TextMessage> = []

io.on('connection', (socket) => {
  socket.on('userData', async (user: User) => {
    userData = userData.concat(user)

    const roomName = user.roomUUID

    socket.join(roomName)

    addUser(user)

    await addMessageToRoom(roomName)

    socket.emit('roomMessage', `You Joined to ${user.roomUUID}`, allMessagesInRoom)

    socket.broadcast.to(roomName).emit('roomMessage', `${user.userName} Joined to ${user.roomUUID}`)
  })

  socket.on('chatMessage', (messages: TextMessage) => {
    const foundUser = userData.find((user) => user.userUUID === socket.id)
    const { userName, userUUID, roomUUID, createdAt, text, type } = messages
    const dataMessage = {
      userName,
      userUUID,
      roomUUID,
      createdAt,
      text,
      type
    }

    if (foundUser) {
      allMessagesFromRoom = allMessagesFromRoom.concat(dataMessage)

      getMessageFromRoom(foundUser.roomUUID, allMessagesFromRoom)

      io.to(foundUser.roomUUID).emit('message', dataMessage)
    }
  })

  socket.on('send-img', (image: ImageMessage) => {
    const foundUser = userData.find((user) => user.userUUID === socket.id)

    allMessagesFromRoom = allMessagesFromRoom.concat(image)

    if (foundUser) {
      getMessageFromRoom(foundUser.roomUUID, allMessagesFromRoom)

      io.to(foundUser.roomUUID!).emit('image', image)
    }
  })

  socket.on('disconnect', () => {
    const foundUser = userData.find((user) => user.userUUID === socket.id)

    if (foundUser) {
      socket.leave(foundUser.roomUUID)

      deleteUser(socket.id)

      allMessagesFromRoom = []

      io.to(foundUser.roomUUID).emit('roomMessage', `${foundUser.userName} left the ${foundUser?.roomUUID}`)

      userData = userData.filter((user) => user.userUUID !== socket.id)
    }
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

export const viteNodeApp = app
