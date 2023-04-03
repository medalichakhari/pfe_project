// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB4fkXCyUFtpadOOvHDnt_VKHd6UT-xRzY",
  authDomain: "pfe-project-5d0de.firebaseapp.com",
  projectId: "pfe-project-5d0de",
  storageBucket: "pfe-project-5d0de.appspot.com",
  messagingSenderId: "190426117867",
  appId: "1:190426117867:web:2497b0b049696db1c1b0ae",
  measurementId: "G-6Y8NX8467Q",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app);
