import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyA3b81uGF-K_EKHIR-VWWHWeaHLZPSKL4k",
    authDomain: "message-5e38f.firebaseapp.com",
    databaseURL: "https://message-5e38f.firebaseio.com",
    projectId: "message-5e38f",
    storageBucket: "message-5e38f.appspot.com",
    messagingSenderId: "157947032250",
    appId: "1:157947032250:web:0b2e45ae2d865dc17ec883",
    measurementId: "G-HCCJ0C87K2"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export{auth,provider};
  export default db;