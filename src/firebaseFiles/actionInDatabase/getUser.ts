import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { FirebaseCollection, User } from '../../types'

export const getUser = async (userUUID: string) => {
  const user = await getDoc(doc(db, FirebaseCollection.Users, userUUID))
    .then(res => res.data())

  return user as User | undefined
}
