// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getStorage, connectStorageEmulator } from 'firebase/storage'
import { getDatabase, connectDatabaseEmulator } from 'firebase/database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCNW6YHvu540nR_v25FR7n_GnLlqaaNtx0',
  authDomain: 'nb-sneaker-shop.firebaseapp.com',
  databaseURL: 'https://nb-sneaker-shop-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'nb-sneaker-shop',
  storageBucket: 'nb-sneaker-shop.appspot.com',
  messagingSenderId: '96557206368',
  appId: '1:96557206368:web:d9e62d226bd4c745862c05',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
connectFirestoreEmulator(db, '127.0.0.1', 8080)
const auth = getAuth(app)
connectAuthEmulator(auth, 'http://127.0.0.1:9099')
const storage = getStorage()
connectStorageEmulator(storage, '127.0.0.1', 9199)
const realtimeDB = getDatabase()
connectDatabaseEmulator(realtimeDB, '127.0.0.1', 9000)


export { db, auth, storage, realtimeDB }
//firebase emulators:start --import=./firebase-export  --export-on-exit=./firebase-export
