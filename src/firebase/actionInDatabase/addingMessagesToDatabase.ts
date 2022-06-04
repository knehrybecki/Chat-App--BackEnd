import { doc, setDoc } from 'firebase/firestore'
import { firebaseCollection, ImageMessage, TextMessage } from '../../types'
import { db } from '../firebase'

export const addingMessagesToDatabase = (messages: ImageMessage | TextMessage, allMessages: Array<ImageMessage | TextMessage>) => {
  setDoc(doc(db, firebaseCollection.rooms, messages.roomUUID), { allMessages })
    .then(res => {
      return res
    })
    .catch((error) => alert(error))
}