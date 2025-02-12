// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCG4xty_4mkjh11Yzx-Q3sxbtSQ1Do0pDE",
  authDomain: "sologue-app.firebaseapp.com",
  projectId: "sologue-app",
  storageBucket: "sologue-app.firebasestorage.app",
  messagingSenderId: "46491937232",
  appId: "1:46491937232:web:50e6361ae0287f66d1f1d5",
  measurementId: "G-LX25WX8028",
};

export default firebaseConfig;

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
