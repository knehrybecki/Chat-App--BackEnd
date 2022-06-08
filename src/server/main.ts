import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import {
  addedUserToDatabase,
  addingMessagesToDatabase,
  addMessagesFromDatabaseToRoom,
  deleteUser,
  getingAllUserFromDatabase
} from 'firebaseFiles/actionInDatabase'
import {
  ImageMessage,
  Sockets,
  TextMessage,
  User
} from 'types'

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

    addedUserToDatabase(user)

    const allMessages = await addMessagesFromDatabaseToRoom(roomName)

    socket.emit(Sockets.RoomMessage, `You Joined to ${roomName}`, allMessages)

    socket.broadcast.to(roomName).emit(Sockets.RoomMessage, `${user.UserName} Joined to ${user.roomUUID}`)
  })

  socket.on(Sockets.ChatMessage, (messages: TextMessage, allMessages: Array<ImageMessage | TextMessage> ) => {
      addingMessagesToDatabase(messages, allMessages)

      io.to(messages.roomUUID).emit(Sockets.Message, messages)
  })

  socket.on(Sockets.SendImage, (image: ImageMessage, allMessages: Array<ImageMessage | TextMessage>) => {
    addingMessagesToDatabase(image, allMessages)

    io.to(image.roomUUID).emit(Sockets.Image, image)
  })

  socket.on('disconnect', async () => {
    const user = await getingAllUserFromDatabase(socket.id)

    if (user) {
      socket.leave(user.roomUUID)

      deleteUser(user.userUUID)

      io.to(user.roomUUID).emit(Sockets.RoomMessage, `${user.UserName} left the ${user.roomUUID}`)
    }
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

export const viteNodeApp = app
