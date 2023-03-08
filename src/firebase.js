// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIYlqYI_G6ucr-Kq3tFC0lE69LJ5lr4Ts",
  authDomain: "code-girls-35638.firebaseapp.com",
  projectId: "code-girls-35638",
  storageBucket: "code-girls-35638.appspot.com",
  messagingSenderId: "123433307591",
  appId: "1:123433307591:web:5728eb81118ae6f3bfdde2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const provider = new firebase.auth.GoogleAuthProvider();