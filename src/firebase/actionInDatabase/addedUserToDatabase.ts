import { db } from 'firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { FirebaseCollection, User } from 'types'

export const addedUserToDatabase = (user: User) => {
  const { userName, userUUID, roomUUID } = user

  setDoc(doc(db, FirebaseCollection.Users, userUUID), {
    userName,
    roomUUID,
    userUUID,
  })
    .catch(error => alert(error))
}
