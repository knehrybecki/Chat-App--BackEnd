import { collection, DocumentData, getDocs } from 'firebase/firestore'
import { firebaseCollection, User } from '../../types'
import { db } from '../firebase'

export const getingAllUserFromDatabase = async (userUUID: string) => {
    let user: DocumentData = []
  
    const querySnapshot = await getDocs(collection(db, firebaseCollection.users))
      .catch((error) => alert(error))
  
    querySnapshot?.forEach(doc => {
      const docData = doc?.data()
  
      user = user.concat(docData)
    })
  
    const foundUser = user.find((user: User) => user.userUUID === userUUID)
  
    return foundUser
  }