// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk8TCUrvlTVRTy_dWcFiIhemWi4i-gEWQ",
  authDomain: "watch-now-project.firebaseapp.com",
  projectId: "watch-now-project",
  storageBucket: "watch-now-project.appspot.com",
  messagingSenderId: "681213016782",
  appId: "1:681213016782:web:b4b73b4510586f61f26e9f",
  measurementId: "G-Y1KKN9R0HB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();