import { doc, setDoc } from 'firebase/firestore'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { FirebaseCollection, ImageMessage, Sockets, TextMessage } from '../../types'
import { db } from '../firebaseConfig'

export const addingMessagesToDatabase = (roomUUID: string, allMessages: Array<ImageMessage | TextMessage>, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  setDoc(doc(db, FirebaseCollection.Rooms, roomUUID), { allMessages })
    .catch((error) => {
      socket.emit(Sockets.Errors, error)
    })
}
