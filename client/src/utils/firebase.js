// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotes-fbcd0.firebaseapp.com",
  projectId: "authexamnotes-fbcd0",
  storageBucket: "authexamnotes-fbcd0.firebasestorage.app",
  messagingSenderId: "459976119766",
  appId: "1:459976119766:web:81c24b740ec18e5b0bc077",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // Firebase auth instance
export const provider = new GoogleAuthProvider(); // Google provider
