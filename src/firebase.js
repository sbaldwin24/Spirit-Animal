import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCWZ751F2F9uZFVdUjbLVH60CkO7zfpFYg",
  authDomain: "social-be035.firebaseapp.com",
  databaseURL: "https://social-be035.firebaseio.com",
  projectId: "social-be035",
  storageBucket: "social-be035.appspot.com",
  messagingSenderId: "332531356236"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
