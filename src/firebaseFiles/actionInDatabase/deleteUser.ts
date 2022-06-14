import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { FirebaseCollection } from '../../types'

export const deleteUser = (userUUID: string) => {
    deleteDoc(doc(db, FirebaseCollection.Users, userUUID))
}
