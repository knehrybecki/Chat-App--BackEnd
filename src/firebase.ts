import { initializeApp } from 'firebase/app'
import {
  deleteDoc,
  doc, DocumentData, getDoc, getFirestore,
  setDoc
} from 'firebase/firestore'
import {
  Person,
  PersonSendImage,
  PersonSendMessage
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

export let allMessageInRoom: Array<DocumentData | null | undefined> = []

export const addUser = async (user: Person) => {
  const clientId = user.clientId
  const userName = user.userName
  const userRoom = user.roomName

  await setDoc(doc(db, 'users', clientId), {
    userName,
    userRoom
  })
    .catch(error => {
      console.log(error)
      return null
    })
}

export const getMessageFromRoom = async (room: string, getAllMessage: Array<PersonSendImage | PersonSendMessage>) => {
  await setDoc(doc(db, 'rooms', room), { getAllMessage })
    .catch(error => {
      console.log(error)
      return null
    })
}

export const addMessageToRoom = async (roomName: string) => {
  allMessageInRoom = []

  const docRef = doc(db, 'rooms', roomName)
  const docSnap = await getDoc(docRef)
    .catch(error => {
      console.log(error)
      return null
    })

  const docData = docSnap?.data()

  if (docSnap?.exists()) {
    allMessageInRoom = allMessageInRoom.concat(docData)
  }
}

export const deleteUser = async (clientId: string) => {
  await deleteDoc(doc(db, 'users', clientId))
    .catch(error => {
      console.log(error)
      return null
    })
}
