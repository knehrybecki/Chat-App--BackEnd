export type Person = {
  userName: string,
  roomName: string
}

export type PersonSendMessage = {
  message: string,
  userName: string,
  clientId: string,
}

export type PersonSendImage = {
  src: {
    result: string,
    clientId: string
  }
}
