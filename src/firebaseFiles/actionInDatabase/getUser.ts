import { doc, getDoc } from 'firebase/firestore'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { FirebaseCollection, Sockets, User } from '../../types'
import { db } from '../firebaseConfig'

export const getUser = async (socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
  const user = await getDoc(doc(db, FirebaseCollection.Users, socket.id))
    .then(res => res.data())
    .catch(error => {
      socket.emit(Sockets.Errors, error)
    })

  return user as User | undefined
}
