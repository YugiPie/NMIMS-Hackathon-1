// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8AEwA6hEIFFsqLu9Yp7hkW3dfah82u5I",
  authDomain: "hackathon-4c912.firebaseapp.com",
  projectId: "hackathon-4c912",
  storageBucket: "hackathon-4c912.firebasestorage.app",
  messagingSenderId: "730685276542",
  appId: "1:730685276542:web:610501d3e5ccd568c6332f",
  measurementId: "G-8SLL5EF2SV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
