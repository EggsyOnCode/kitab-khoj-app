import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyC8NVj9aZLxo1UXsQ2i5KSNTIXXH1Pu7TY",
  authDomain: "kitabkhoj-2b559.firebaseapp.com",
  projectId: "kitabkhoj-2b559",
  storageBucket: "kitabkhoj-2b559.appspot.com",
  messagingSenderId: "730590305822",
  appId: "1:730590305822:web:e44b078cb510b710dbd80f",
  measurementId: "G-5E08547CDP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(app);
