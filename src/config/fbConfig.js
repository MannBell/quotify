import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import "firebase/compat/storage";

// firebase config
const firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });
export default firebase;