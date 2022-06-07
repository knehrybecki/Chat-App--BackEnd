import { doc, getDoc } from 'firebase/firestore'
import { db } from 'firebaseFiles'
import { FirebaseCollection, User } from 'types'

export const getingAllUserFromDatabase = async (userUUID: string) => {
  const user = await getDoc(doc(db, FirebaseCollection.Users, userUUID))
    .then(res => res.data())
    .catch(error => {
      alert(error)

      return undefined
    })

  return user as User | undefined
}
