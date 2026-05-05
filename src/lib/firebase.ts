// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
// Import Firestore Database
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCvjaSR2FIf64s15wkWkbJDlvTzJ2xAVEQ",
  authDomain: "csid-dad42.firebaseapp.com",
  projectId: "csid-dad42",
  storageBucket: "csid-dad42.firebasestorage.app",
  messagingSenderId: "733571939654",
  appId: "1:733571939654:web:bb4668caac7da6bf7a3947",
  measurementId: "G-RN92TRG52B"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
// Export Firestore Database
export const db = getFirestore(app);
