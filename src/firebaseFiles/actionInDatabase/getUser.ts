import { doc, getDoc } from 'firebase/firestore'
import { FirebaseCollection, SocketEvent, Sockets, User } from '../../types'
import { db } from '../firebaseConfig'

export const getUser = async (socket: SocketEvent) => {
  const user = await getDoc(doc(db, FirebaseCollection.Users, socket.id))
    .then(res => res.data())
    .catch(error => socket.emit(Sockets.Errors, error))

  return user as User | undefined
}
