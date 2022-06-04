import { collection, getDocs, query, where } from 'firebase/firestore'
import { firebaseCollection, firebaseSearch, User } from '../../types'
import { db } from '../firebase'

export const getingAllUserFromDatabase = async (userUUID: string) => {
  const foundUser = query(collection(db, firebaseCollection.users), where(firebaseSearch.userUUID, '==', userUUID))
  const user = await getDocs(foundUser)
    .then(res => {
      res.forEach(doc => {
        return doc.data()
      })
    })
    .catch(error => alert(error))

  return user as unknown as User
}