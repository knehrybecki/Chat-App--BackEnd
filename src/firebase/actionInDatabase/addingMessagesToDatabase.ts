import { FirebaseCollection, ImageMessage, TextMessage } from '../../types'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'

export const addingMessagesToDatabase = (messages: ImageMessage | TextMessage, allMessages: Array<ImageMessage | TextMessage>) => {
  setDoc(doc(db, FirebaseCollection.rooms, messages.roomUUID), { allMessages })
    .catch((error) => alert(error))
}