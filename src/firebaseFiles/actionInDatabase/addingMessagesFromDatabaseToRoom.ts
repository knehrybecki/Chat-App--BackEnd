import { doc, getDoc } from 'firebase/firestore'
import { FirebaseCollection, SocketEvent, Sockets } from '../../types'
import { db } from '../firebaseConfig'

export const addMessagesFromDatabaseToRoom = async (roomName: string, socket: SocketEvent) => {
  const messages = await getDoc(doc(db, FirebaseCollection.Rooms, roomName))
    .then(res => res.data())
    .catch(error => socket.emit(Sockets.Errors, error))

  return messages
}
