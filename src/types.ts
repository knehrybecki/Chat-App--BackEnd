export type Person = {
  userName: string,
  roomName: string,
  clientId: string
}

export type PersonSendMessage = {
  message: string,
  userName: string,
  clientId: string,
  createdAt: string
}

export type PersonSendImage = {
    result: string,
    clientId: string
}
