import { deleteDoc, doc } from 'firebase/firestore'
import { firebaseCollection } from '../../types'
import { db } from '../firebase'

export const deleteUser = async (userUUID: string) => {
    await deleteDoc(doc(db, firebaseCollection.users, userUUID))
    .catch(error => alert(error))
}
