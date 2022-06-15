import { doc, setDoc } from 'firebase/firestore'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { FirebaseCollection, Sockets, User } from '../../types'
import { db } from '../firebaseConfig'

export const addUser = (user: User, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  const { userName, userUUID, roomUUID } = user

  setDoc(doc(db, FirebaseCollection.Users, userUUID), {
    userName,
    roomUUID,
    userUUID,
  })
    .catch((error) => {
      socket.emit(Sockets.Errors, error)
    })
}
