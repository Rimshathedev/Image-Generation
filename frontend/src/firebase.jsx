// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_z8L0paub6bR7-Jg59YmUs-GhrOGqs00",
  authDomain: "sdproject-bf0a2.firebaseapp.com",
  projectId: "sdproject-bf0a2",
  storageBucket: "sdproject-bf0a2.firebasestorage.app",
  messagingSenderId: "64086559028",
  appId: "1:64086559028:web:0ba8a30b5ea086e6b4fd61",
  measurementId: "G-8X6GL50ZZ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export {app}