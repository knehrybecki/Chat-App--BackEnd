import { deleteDoc, doc } from 'firebase/firestore'
import { firebaseCollection } from '../../types'
import { db } from '../firebase'

export const deleteUser = (userUUID: string) => {
    deleteDoc(doc(db, firebaseCollection.users, userUUID))
        .then(res => {
            return res
        })
        .catch(error => alert(error))
}
