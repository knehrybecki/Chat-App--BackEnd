import { doc, getDoc } from 'firebase/firestore'
import { firebaseCollection } from '../../types'
import { db } from '../firebase'

export const addMessagesFromDatabaseToRoom = async (roomName: string) => {
  const messages = await getDoc(doc(db, firebaseCollection.rooms, roomName))
    .then((res) => {
      return res.data()
    })
    .catch(error => {
      alert(error)

      return []
    })

  return messages
}
