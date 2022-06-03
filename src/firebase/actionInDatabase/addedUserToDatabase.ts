import { doc, setDoc } from 'firebase/firestore'
import { firebaseCollection, User } from '../../types'
import { db } from '../firebase'

export const addedUserToDatabase = (user: User) => {
  const { userName, userUUID, roomUUID } = user

  setDoc(doc(db, firebaseCollection.users, userUUID), {
    userName,
    roomUUID,
    userUUID
  })
}
