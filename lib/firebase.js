// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWWF25yDLtphg2_oeLM7rHV_vAL3n2kTI",
  authDomain: "nextjs-blog-c3ae3.firebaseapp.com",
  projectId: "nextjs-blog-c3ae3",
  storageBucket: "nextjs-blog-c3ae3.appspot.com",
  messagingSenderId: "717704850004",
  appId: "1:717704850004:web:ab6085f322deaa50d6dbc1",
  measurementId: "G-TCQVFEWBY9",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
