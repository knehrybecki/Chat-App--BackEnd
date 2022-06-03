import { doc, DocumentData, getDoc } from 'firebase/firestore'
import { firebaseCollection } from '../../types'
import { db } from '../firebase'

export const addMessagesFromDatabaseToRoom = async (roomName: string) => {
    const docRef = doc(db, firebaseCollection.rooms, roomName)
    const docSnap: DocumentData | undefined = await getDoc(docRef)
      .catch((error) => {
        alert(error)

        return new Array(0)
      })
  
      return docSnap.data()
  }
  