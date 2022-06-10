import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebaseFiles'
import { FirebaseCollection } from '../../types'

export const deleteUser = (userUUID: string) => {
    deleteDoc(doc(db, FirebaseCollection.Users, userUUID))
        .catch(error => alert(error))
}
