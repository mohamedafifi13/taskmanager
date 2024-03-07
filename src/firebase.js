// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRgUCrL_MlRozqRnSBJt_aCyz44nbxXwc",
  authDomain: "task-manager-103dd.firebaseapp.com",
  projectId: "task-manager-103dd",
  storageBucket: "task-manager-103dd.appspot.com",
  messagingSenderId: "1091347662707",
  appId: "1:1091347662707:web:1fa69244a8fb1da5996706",
  measurementId: "G-PK6SHPNPMW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

export default app;
