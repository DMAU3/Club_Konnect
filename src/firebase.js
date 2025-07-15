// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBU-g0YesLVx7LBuFxYhv0E8BI3mfn0SKI",
    authDomain: "ck-clubkonnect.firebaseapp.com",
    projectId: "ck-clubkonnect",
    storageBucket: "ck-clubkonnect.firebasestorage.app",
    messagingSenderId: "87475909507",
    appId: "1:87475909507:web:1cf92ed797213a8cc5fcb6"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

