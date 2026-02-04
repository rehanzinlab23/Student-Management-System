// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
     apiKey: "AIzaSyCrTM7rP_RUpe2hUvgF7L_UIEUTlYW8NQ0",
     authDomain: "student-management-syste-3a5f2.firebaseapp.com",
     projectId: "student-management-syste-3a5f2",
     storageBucket: "student-management-syste-3a5f2.firebasestorage.app",
     messagingSenderId: "434868650962",
     appId: "1:434868650962:web:cf7fbb7eee4d7dbec4be0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize FireStore

const db = getFirestore(app)

export { db }