import { doc, getDoc } from 'firebase/firestore'
import { db } from 'firebaseFiles'
import { FirebaseCollection } from 'types'

export const addMessagesFromDatabaseToRoom = async (roomName: string) => {
  const messages = await getDoc(doc(db, FirebaseCollection.Rooms, roomName))
    .then(res => res.data())
    .catch(error => {
      alert(error)

      return []
    })

  return messages
}
