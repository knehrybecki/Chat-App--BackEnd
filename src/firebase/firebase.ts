import { initializeApp } from 'firebase/app'
import { firebaseConfig } from 'firebase/firebaseConfig'
import { getFirestore } from 'firebase/firestore'

const firebaseapp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseapp)
