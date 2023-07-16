// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBx7yJ_5-afUWFQcHQfabtNY4CbrBHcbzM",
  authDomain: "ee-project-64cef.firebaseapp.com",
  projectId: "ee-project-64cef",
  storageBucket: "ee-project-64cef.appspot.com",
  messagingSenderId: "734216568458",
  appId: "1:734216568458:web:05de69a30d6dd59c687773",
  measurementId: "G-QC2YNP98MT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);