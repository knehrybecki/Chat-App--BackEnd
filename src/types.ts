export type Person = {
  userName: string,
  roomName: string,
  clientId: string
}

export type PersonSendMessage = {
  message: string,
  userName: string,
  clientId: string,
  hoursSend: string
}

export type PersonSendImage = {
  src: {
    result: string,
    clientId: string
  }
}
