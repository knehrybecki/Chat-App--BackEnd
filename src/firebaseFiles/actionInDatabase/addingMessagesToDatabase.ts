import { doc, setDoc } from 'firebase/firestore'
import { FirebaseCollection, ImageMessage, SocketEvent, Sockets, TextMessage } from '../../types'
import { db } from '../firebaseConfig'

export const addingMessagesToDatabase = (roomUUID: string, allMessages: Array<ImageMessage | TextMessage>, socket: SocketEvent) => {
  setDoc(doc(db, FirebaseCollection.Rooms, roomUUID), { allMessages })
    .catch(error => socket.emit(Sockets.Errors, error))
}
