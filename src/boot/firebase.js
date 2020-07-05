import * as firebase from "firebase/app"

import "firebase/auth"
import "firebase/database"

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyADrEvVbvX3_6UrxdwUddA-DpPV_DK6SNw",
  authDomain: "x-business-sn-activation.firebaseapp.com",
  databaseURL: "https://x-business-sn-activation.firebaseio.com",
  projectId: "x-business-sn-activation",
  storageBucket: "x-business-sn-activation.appspot.com",
  messagingSenderId: "225593277215",
  appId: "1:225593277215:web:33d0eaedbed7d61456ce2a"
}
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig);
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }