import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {
  addUser,
  addingMessagesToDatabase,
  addMessagesFromDatabaseToRoom,
  deleteUser,
  getUser
} from '../firebaseFiles'
import {
  ImageMessage,
  Sockets,
  TextMessage,
  User
} from '../types'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', socket => {
  socket.on(Sockets.UserData, async (user: User) => {
    const roomName = user.roomUUID

    socket.join(roomName)

    addUser(user)

    const allMessages = await addMessagesFromDatabaseToRoom(roomName)

    socket.emit(Sockets.RoomMessage, `You Joined to ${roomName}`, allMessages)

    socket.broadcast.to(roomName).emit(Sockets.RoomMessage, `${user.userName} Joined to ${user.roomUUID}`)
  })

  socket.on(Sockets.ChatMessage, (message: TextMessage, allMessages: Array<ImageMessage | TextMessage>) => {
    const roomUUID = message.roomUUID

    addingMessagesToDatabase(roomUUID, allMessages)

    io.to(message.roomUUID).emit(Sockets.Message, message)
  })

  socket.on(Sockets.SendImage, (image: ImageMessage, allMessages: Array<ImageMessage | TextMessage>) => {
    const roomUUID = image.roomUUID

    addingMessagesToDatabase(roomUUID, allMessages)

    io.to(image.roomUUID).emit(Sockets.Image, image)
  })

  socket.on('disconnect', async () => {
    const user = await getUser(socket.id)

    if (user) {
      socket.leave(user.roomUUID)

      deleteUser(user.userUUID)

      io.to(user.roomUUID).emit(Sockets.RoomMessage, `${user.userName} left the ${user.roomUUID}`)
    }
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

export const viteNodeApp = app
