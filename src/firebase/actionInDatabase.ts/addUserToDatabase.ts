import { doc, setDoc } from 'firebase/firestore'
import { User } from '../../types'
import { db } from '../firebase'

export const addedUserToDatabase = async (user: User) => {
    const { userName, userUUID, roomUUID } = user
  
    await setDoc(doc(db, 'users', userUUID), {
      userName,
      roomUUID,
      userUUID
    })
      .catch((error) => alert(error))
  }
  