import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { addingMessagesFromDatabaseToRoom } from './firebase/actionInDatabase.ts/addingMessagesFromDatabaseToRoom'
import { addingMessagesToDatabase } from './firebase/actionInDatabase.ts/addingMessagesToDatabase'
import { addedUserToDatabase } from './firebase/actionInDatabase.ts/addUserToDatabase'
import { deleteUser } from './firebase/actionInDatabase.ts/deleteUser'
import { getingAllUserFromDatabase } from './firebase/actionInDatabase.ts/getingAllUserFromDatabase'
import { ImageMessage, TextMessage, User } from './types'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', socket => {
  socket.on('userData', async (user: User) => {
    const roomName = user.roomUUID

    socket.join(roomName)

    addedUserToDatabase(user)

   const allMessages =  await addingMessagesFromDatabaseToRoom(roomName)

    socket.emit('roomMessage', `You Joined to ${roomName}`, allMessages)

    socket.broadcast.to(roomName).emit('roomMessage', `${user.userName} Joined to ${user.roomUUID}`)
  })

  socket.on('chatMessage', (messages: TextMessage, allMessages: Array<ImageMessage | TextMessage> ) => {
      addingMessagesToDatabase(messages, allMessages)

      io.to(messages.roomUUID).emit('message', messages)
  })

  socket.on('sendImage', (image: ImageMessage, allMessages: Array<ImageMessage | TextMessage>) => {
    addingMessagesToDatabase(image, allMessages)

      io.to(image.roomUUID).emit('image', image)
  })

  socket.on('disconnect', async () => {
     const user = await getingAllUserFromDatabase(socket.id)

    if (user) {
      socket.leave(user.roomUUID)

      deleteUser(user.userUUID)

      io.to(user.roomUUID).emit('roomMessage', `${user.userName} left the ${user.roomUUID}`)
    }
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

export const viteNodeApp = app
