import { FirebaseCollection, User } from '../../types'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const addedUserToDatabase = (user: User) => {
  const { userName, userUUID, roomUUID } = user

  setDoc(doc(db, FirebaseCollection.users, userUUID), {
    userName,
    roomUUID,
    userUUID,
  })
    .catch(error => alert(error))
}
