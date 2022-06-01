import { initializeApp } from 'firebase/app';
import {
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getFirestore,
  setDoc
} from 'firebase/firestore';
import {
  ImageMessage,
  TextMessage,
  User
} from './types';

const firebaseConfig = {
  apiKey: "AIzaSyCaYDFqWQvrA9nYlg446x0XKHTejrWJea0",
  authDomain: "projekty-do-nauki.firebaseapp.com",
  databaseURL: "https://projekty-do-nauki-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "projekty-do-nauki",
  storageBucket: "projekty-do-nauki.appspot.com",
  messagingSenderId: "532844117414",
  appId: "1:532844117414:web:5d766275ce722a24d66367"
};
const firebaseapp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseapp)

export let allMessagesInRoom: Array<DocumentData | undefined> = []

export const addUser = async (user: User) => {
  const {userName, userUUID, roomUUID } = user

  await setDoc(doc(db, 'users', userUUID), {
    userName,
    roomUUID
  })
    .catch(error => alert(error))
}

export const getMessageFromRoom = async (room: string, messages: Array<ImageMessage | TextMessage>) => {
  await setDoc(doc(db, 'rooms', room), { messages })
    .catch(error => alert(error))
}

export const addMessageToRoom = async (roomName: string) => {
  allMessagesInRoom = []

  const docRef = doc(db, 'rooms', roomName)
  const docSnap = await getDoc(docRef)
    .catch(error => alert(error))

  const docData = docSnap?.data()

  if (docSnap?.exists()) {
    allMessagesInRoom = allMessagesInRoom.concat(docData)
  }
}

export const deleteUser = async (userUUID: string) => {
  await deleteDoc(doc(db, 'users', userUUID))
    .catch(error => alert(error))
}
