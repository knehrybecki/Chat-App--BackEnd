import { doc, setDoc } from 'firebase/firestore'
import { FirebaseCollection, SocketEvent, Sockets, User } from '../../types'
import { db } from '../firebaseConfig'

export const addUser = (user: User, socket: SocketEvent) => {
  const { userName, userUUID, roomUUID } = user

  setDoc(doc(db, FirebaseCollection.Users, userUUID), {
    userName,
    roomUUID,
    userUUID,
  })
    .catch(error => socket.emit(Sockets.Errors, error))
}
