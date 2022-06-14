import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { FirebaseCollection, User } from '../../types'

export const addUser = (user: User) => {
  const { userName, userUUID, roomUUID } = user

  setDoc(doc(db, FirebaseCollection.Users, userUUID), {
    userName,
    roomUUID,
    userUUID,
  })
}
