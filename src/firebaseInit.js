// // Import the functions you need from the SDKs you need
// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js';
// import { getAuth } from "firebase/auth";


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDIYlqYI_G6ucr-Kq3tFC0lE69LJ5lr4Ts",
//   authDomain: "code-girls-35638.firebaseapp.com",
//   projectId: "code-girls-35638",
//   storageBucket: "code-girls-35638.appspot.com",
//   messagingSenderId: "123433307591",
//   appId: "1:123433307591:web:5728eb81118ae6f3bfdde2"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase Authentication and get a reference to the service
//const auth = getAuth(app);

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });
const firebaseConfig = {
  apiKey: "AIzaSyDIYlqYI_G6ucr-Kq3tFC0lE69LJ5lr4Ts",
  authDomain: "code-girls-35638.firebaseapp.com",
  projectId: "code-girls-35638",
  storageBucket: "code-girls-35638.appspot.com",
  messagingSenderId: "123433307591",
  appId: "1:123433307591:web:5728eb81118ae6f3bfdde2"
};

const app = firebase.initializeApp(firebaseConfig);

export const login = (email, senha) => {
  

 firebase.auth().signInWithEmailAndPassword(email, senha).then(response => {
     console.log('success', response);
     window.location.hash = "#Home"
 }).catch(error => {
     console.log('error', error);
 });

}