import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebaseFiles'
import { FirebaseCollection, ImageMessage, TextMessage } from '../../types'

export const addingMessagesToDatabase = (messages: ImageMessage | TextMessage, allMessages: Array<ImageMessage | TextMessage>) => {
  setDoc(doc(db, FirebaseCollection.Rooms, messages.roomUUID), { allMessages })
    .catch((error) => alert(error))
}