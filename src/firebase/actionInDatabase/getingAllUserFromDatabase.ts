import { FirebaseCollection, User } from '../../types'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const getingAllUserFromDatabase = async (userUUID: string) => {
  const user = await getDoc(doc(db, FirebaseCollection.users, userUUID))
    .then(res => {
      return res.data()
    })
    .catch(error => {
      alert(error)

      return undefined
    })

  return user as User
}
