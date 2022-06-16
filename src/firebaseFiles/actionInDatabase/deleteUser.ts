import { deleteDoc, doc } from 'firebase/firestore'
import { FirebaseCollection, SocketEvent, Sockets } from '../../types'
import { db } from '../firebaseConfig'

export const deleteUser = (userUUID: string, socket: SocketEvent) => {
    deleteDoc(doc(db, FirebaseCollection.Users, userUUID))
        .catch(error => socket.emit(Sockets.Errors, error))
}
