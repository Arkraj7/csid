// src/lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Paste the config object you copied from Step 1 here!
const firebaseConfig = {
  apiKey: "AIzaSyCvjaSR2FIf64s15wkWkbJDlvTzJ2xAVEQ",
  authDomain: "csid-dad42.firebaseapp.com",
  projectId: "csid-dad42",
  storageBucket: "csid-dad42.firebasestorage.app",
  messagingSenderId: "733571939654",
  appId: "1:733571939654:web:bb4668caac7da6bf7a3947"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication and Providers
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
