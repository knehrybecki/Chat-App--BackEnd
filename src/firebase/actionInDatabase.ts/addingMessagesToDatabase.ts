import { doc, setDoc } from 'firebase/firestore'
import { ImageMessage, TextMessage } from '../../types'
import { db } from '../firebase'

export const addingMessagesToDatabase = async (messages: ImageMessage | TextMessage, allMessages: Array<ImageMessage | TextMessage> ) => {
    await setDoc(doc(db, 'rooms', messages.roomUUID), { allMessages })
      .catch((error) => alert(error))
  }