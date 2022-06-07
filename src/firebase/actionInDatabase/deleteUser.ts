import { db } from 'firebase/firebase'
import { deleteDoc, doc } from 'firebase/firestore'
import { FirebaseCollection } from 'types'

export const deleteUser = (userUUID: string) => {
    deleteDoc(doc(db, FirebaseCollection.Users, userUUID))
        .catch(error => alert(error))
}
