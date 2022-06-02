import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const addingMessagesFromDatabaseToRoom = async (roomName: string) => {
    const docRef = doc(db, 'rooms', roomName)
    const docSnap = await getDoc(docRef)
      .catch((error) => alert(error))
  
      return docSnap?.data()
  }
  