// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAkvqTR4n8BzyMrX2uwZ564CMwyVFm8ZM",
  authDomain: "car-management-2b7ab.firebaseapp.com",
  projectId: "car-management-2b7ab",
  storageBucket: "car-management-2b7ab.firebasestorage.app",
  messagingSenderId: "817955632692",
  appId: "1:817955632692:web:195347f475c8730cb7bc61",
  measurementId: "G-913DQPE2KR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app);

export { db, storage }