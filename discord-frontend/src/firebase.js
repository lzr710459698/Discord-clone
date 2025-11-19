// src/firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBDsJf6KmZnb4-h65ibzaxvry_FPIqm6y0",
  authDomain: "discord-clone-b5281.firebaseapp.com",
  projectId: "discord-clone-b5281",
  storageBucket: "discord-clone-b5281.firebasestorage.app",
  messagingSenderId: "137886077443",
  appId: "1:137886077443:web:18541807953bb93408b436",
  measurementId: "G-K9Z5PQ4HFS"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
