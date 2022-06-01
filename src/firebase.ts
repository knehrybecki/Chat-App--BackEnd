import { initializeApp } from 'firebase/app'
import {
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getFirestore,
  setDoc
} from 'firebase/firestore'
import {
  ImageMessage,
  TextMessage,
  User
} from './types'

const firebaseConfig = {
  apiKey: 'AIzaSyCaYDFqWQvrA9nYlg446x0XKHTejrWJea0',
  authDomain: 'projekty-do-nauki.firebaseapp.com',
  projectId: 'projekty-do-nauki',
  storageBucket: 'projekty-do-nauki.appspot.com',
  messagingSenderId: '532844117414',
  appId: '1:532844117414:web:5d766275ce722a24d66367'
}
const firebaseapp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseapp)

export let allMessageInRoom: Array<DocumentData | undefined> = []

export const addUser = async (user: User) => {
  const { clientId, userName, roomName } = user

  await setDoc(doc(db, 'users', clientId), {
    userName,
    roomName
  })
    .catch(error => alert(error))
}

export const getMessageFromRoom = async (room: string, messages: Array<ImageMessage | TextMessage>) => {
  await setDoc(doc(db, 'rooms', room), { messages })
    .catch(error => alert(error))
}

export const addMessageToRoom = async (roomName: string) => {
  allMessageInRoom = []

  const docRef = doc(db, 'rooms', roomName)
  const docSnap = await getDoc(docRef)
    .catch(error => alert(error))

  const docData = docSnap?.data()

  if (docSnap?.exists()) {
    allMessageInRoom = allMessageInRoom.concat(docData)
  }
}

export const deleteUser = async (clientId: string) => {
  await deleteDoc(doc(db, 'users', clientId))
    .catch(error => alert(error))
}
