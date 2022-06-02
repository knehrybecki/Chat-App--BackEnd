import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

export const deleteUser = async (userUUID: string) => {
    await deleteDoc(doc(db, 'users', userUUID))
    .catch(error => alert(error))
}
