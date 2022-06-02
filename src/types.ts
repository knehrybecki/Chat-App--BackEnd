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
