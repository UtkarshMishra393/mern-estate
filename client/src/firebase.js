// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4d9fc.firebaseapp.com",
  projectId: "mern-estate-4d9fc",
  storageBucket: "mern-estate-4d9fc.appspot.com",
  messagingSenderId: "716963135731",
  appId: "1:716963135731:web:2fa9505ac7dc801c53b786",
};

// Initialize Firebase
// The app contains all the information ragarding firebase.
export const app = initializeApp(firebaseConfig);
