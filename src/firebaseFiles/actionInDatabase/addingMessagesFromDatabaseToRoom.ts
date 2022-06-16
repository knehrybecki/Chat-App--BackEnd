import { doc, getDoc } from 'firebase/firestore'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { FirebaseCollection, Sockets } from '../../types'
import { db } from '../firebaseConfig'

export const addMessagesFromDatabaseToRoom = async (roomName: string, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  const messages = await getDoc(doc(db, FirebaseCollection.Rooms, roomName))
    .then(res => res.data())
    .catch(error => {
      socket.emit(Sockets.Errors, error)
    })

  return messages
}
