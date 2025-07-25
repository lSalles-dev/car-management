// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB63JWBdoZmsFmEVsmzHAyhKh4QwuJgUkA",
  authDomain: "car-management-ba959.firebaseapp.com",
  projectId: "car-management-ba959",
  storageBucket: "car-management-ba959.firebasestorage.app",
  messagingSenderId: "458740009000",
  appId: "1:458740009000:web:a6be685229669bad494d1d",
  measurementId: "G-RE656R9J8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db }