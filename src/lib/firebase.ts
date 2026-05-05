// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvjaSR2FIf64s15wkWkbJDlvTzJ2xAVEQ",
  authDomain: "csid-dad42.firebaseapp.com",
  projectId: "csid-dad42",
  storageBucket: "csid-dad42.firebasestorage.app",
  messagingSenderId: "733571939654",
  appId: "1:733571939654:web:bb4668caac7da6bf7a3947",
  measurementId: "G-RN92TRG52B"
};

// Initialize Firebase (Prevents "app already exists" error in Next.js)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Analytics safely (only runs in the browser, not on the server)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Initialize Authentication and Providers for your Sign-In components
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
