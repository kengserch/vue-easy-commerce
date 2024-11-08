const { initializeApp, applicationDefault } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')
const { getDatabase } = require('firebase-admin/database')
const { getAuth } = require('firebase-admin/auth')

initializeApp({
    credential: applicationDefault(),
    projectId: 'nb-sneaker-shop',
    databaseURL: 'https://nb-sneaker-shop-default-rtdb.asia-southeast1.firebasedatabase.app'
})

const db = getFirestore()
const auth = getAuth()
const realtimeDB = getDatabase()

module.exports = {
    db, auth, realtimeDB
}