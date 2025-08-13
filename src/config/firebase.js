// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAFRKR-9RvDEBzuPq8vnM6B41ZqDCOzOUg',
  authDomain: 'test-ac1ac.firebaseapp.com',
  projectId: 'test-ac1ac',
  storageBucket: 'test-ac1ac.firebasestorage.app',
  messagingSenderId: '863897711272',
  appId: '1:863897711272:web:cd3e704db2f2e9aad8889d',
  measurementId: 'G-KHH14C2RQD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
