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
  Person,
  PersonSendImage,
  PersonSendMessage
} from './types'

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST']
  }
})

let userData: Array<Person> = []
export let allMessageFromRoom: Array<PersonSendImage | PersonSendMessage> = []

io.on('connection', socket => {
  socket.on('userData', async (user: Person) => {
    userData = userData.concat(user)

    const roomName = user.roomName

    socket.join(roomName)

    addUser(user)

    await addMessageToRoom(roomName)

    socket.emit('roomMessage', `You Joined to ${roomName}`, allMessageInRoom)

    socket.broadcast.to(roomName).emit('roomMessage', `${user.userName} Joined to ${user.roomName}`)
  })

  socket.on('chatMessage', (messages: PersonSendMessage) => {
    const findUser = userData.find(user => user.clientId === socket.id)
    const { message, userName, clientId, createdAt} = messages
    const dataMessage = {
      message,
      userName,
      clientId,
      createdAt
    }

    if (findUser !== undefined) {
      allMessageFromRoom = allMessageFromRoom.concat(dataMessage)

      getMessageFromRoom(findUser?.roomName!, allMessageFromRoom)

      io.to(findUser?.roomName!).emit('message', dataMessage)
    }
  })

  socket.on('send-img', (image: PersonSendImage) => {
    const findUser = userData.find(user => user.clientId === socket.id)

    allMessageFromRoom = allMessageFromRoom.concat(image)

    getMessageFromRoom(findUser?.roomName!, allMessageFromRoom)

    if (findUser !== undefined) {
      io.to(findUser?.roomName!).emit('image', image)
    }
  })

  socket.on('disconnect', () => {
    const findUser = userData.find(user => user.clientId === socket.id)

    if (findUser !== undefined) {
      socket.leave(findUser?.roomName!)

      deleteUser(socket.id)

      allMessageFromRoom = []
      
      io.to(findUser?.roomName!).emit('roomMessage', `${findUser?.userName} left the ${findUser?.roomName}`)

      userData = userData.filter(user => user.clientId !== socket.id)
    }
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})

export const viteNodeApp = app
