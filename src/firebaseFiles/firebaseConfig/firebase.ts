import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { firebaseConfig } from '../firebaseConfig'

const firebaseapp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseapp)
