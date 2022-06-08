import { doc, setDoc } from 'firebase/firestore'
import { db } from 'firebaseFiles'
import { FirebaseCollection, User } from 'types'

export const addedUserToDatabase = (user: User) => {
  const { UserName, userUUID, roomUUID } = user

  setDoc(doc(db, FirebaseCollection.Users, userUUID), {
    UserName,
    roomUUID,
    userUUID,
  })
    .catch(error => alert(error))
}
