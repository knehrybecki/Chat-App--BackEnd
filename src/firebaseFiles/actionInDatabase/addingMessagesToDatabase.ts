import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { FirebaseCollection, ImageMessage, TextMessage } from '../../types'

export const addingMessagesToDatabase = (roomUUID: string, allMessages: Array<ImageMessage | TextMessage>) => {
  setDoc(doc(db, FirebaseCollection.Rooms, roomUUID), { allMessages })
} 