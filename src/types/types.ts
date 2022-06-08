export enum MessageType {
  Text = 'text',
  Image = 'image'
}
export interface User {
  UserName: string
  userUUID: string
  roomUUID: string
}

type Message = {
  personName: string
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

export enum FirebaseCollection {
  Users = 'users',
  Rooms = 'rooms',
}

export enum FirebaseSearch {
  UserUUID = 'userUUID'
}

export enum Sockets {
  RoomMessage = 'roomMessage',
  Image = 'image',
  Message = 'message',
  ChatMessage = 'chatMessage',
  SendImage = 'sendImage',
  UserData= 'userData'
}
