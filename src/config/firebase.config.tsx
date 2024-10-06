// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRZPsq5zcK7PnUkUpYFQ04GNcvJJFfhDc",
  authDomain: "coinchronicles10.firebaseapp.com",
  projectId: "coinchronicles10",
  storageBucket: "coinchronicles10.appspot.com",
  messagingSenderId: "272931400397",
  appId: "1:272931400397:web:875e0d94e644d539ab1784",
  measurementId: "G-NH72SVSMLF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);