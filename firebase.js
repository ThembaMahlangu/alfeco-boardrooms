// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBGvdcBdvA8cGWKsCCul0A75tDBzLMEB_Y",
  authDomain: "ivory-airfoil-377211.firebaseapp.com",
  projectId: "ivory-airfoil-377211",
  storageBucket: "ivory-airfoil-377211.appspot.com",
  messagingSenderId: "667228157014",
  appId: "1:667228157014:web:98055d0ea13de266e977f7",
  measurementId: "G-8NRSL9TDLN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);