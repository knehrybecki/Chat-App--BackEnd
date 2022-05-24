export type Person = {
    userName: string,
    roomName: string
  }
  
export type PersonSendMessage = {
    message: string,
    userName: string,
    clientId: string,
}