export enum MessageType {
  Text = 'text',
  Image = 'image'
}
export interface User {
  userName: string
  userUUID: string
  roomUUID: string
}

type Message = {
  userName: string
  userUUID: string
  roomUUID: string
  createdAt: string
}
export interface TextMessage extends Message {
  text: string,
  type: MessageType.Text
}

export interface ImageMessage extends Message {
  imageUrl: string,
  type: MessageType.Image
}

export enum firebaseCollection {
  users = 'users',
  rooms = 'rooms'
}

export enum firebaseSearch {
  userUUID = 'userUUID'
}

export enum sockets {
  roomMessage = 'roomMessage',
  image = 'image',
  message = 'message',
  chatMessage = 'chatMessage',
  sendImage = 'sendImage',
  userData= 'userData'
}