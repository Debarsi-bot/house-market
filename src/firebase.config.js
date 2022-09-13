// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "house-market-4cf61.firebaseapp.com",
  projectId: "house-market-4cf61",
  storageBucket: "house-market-4cf61.appspot.com",
  messagingSenderId: "16284464226",
  appId: "1:16284464226:web:c5a1d2dc75d5a34787cd3b"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()