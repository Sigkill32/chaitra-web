import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAQ9yAVuKWb3DD2wvbm8_mnh2g4tiR5NnQ",
  authDomain: "chaitra-web.firebaseapp.com",
  databaseURL: "https://chaitra-web.firebaseio.com",
  projectId: "chaitra-web",
  storageBucket: "chaitra-web.appspot.com",
  messagingSenderId: "781281158337",
  appId: "1:781281158337:web:8031967e6a5570f0d7e040",
  measurementId: "G-Y1ZL419ST6",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const storage = app.storage();

export { db, storage };
