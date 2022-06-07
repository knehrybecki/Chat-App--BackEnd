import { doc, setDoc } from 'firebase/firestore'
import { db } from 'firebaseFiles'
import { FirebaseCollection, User } from 'types'

export const addedUserToDatabase = (user: User) => {
  const { personName, userUUID, roomUUID } = user

  setDoc(doc(db, FirebaseCollection.Users, userUUID), {
    personName,
    roomUUID,
    userUUID,
  })
    .catch(error => alert(error))
}
