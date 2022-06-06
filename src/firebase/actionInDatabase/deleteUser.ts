import { FirebaseCollection } from '../../types'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

export const deleteUser = (userUUID: string) => {
    deleteDoc(doc(db, FirebaseCollection.users, userUUID))
        .catch(error => alert(error))
}
