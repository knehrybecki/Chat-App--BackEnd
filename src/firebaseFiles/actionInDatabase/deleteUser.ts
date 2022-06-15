import { deleteDoc, doc } from 'firebase/firestore'
import { Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { FirebaseCollection, Sockets } from '../../types'
import { db } from '../firebaseConfig'

export const deleteUser = (userUUID: string, socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    deleteDoc(doc(db, FirebaseCollection.Users, userUUID))
        .catch((error) => {
            socket.emit(Sockets.Errors, error)
        })
}
