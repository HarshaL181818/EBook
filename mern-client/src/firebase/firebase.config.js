// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUNjx0K-XakpfCOyFJWnbYnXu7o4dP6XM",
  authDomain: "mern-book-inventory-59b5a.firebaseapp.com",
  projectId: "mern-book-inventory-59b5a",
  storageBucket: "mern-book-inventory-59b5a.appspot.com",
  messagingSenderId: "11937591912",
  appId: "1:11937591912:web:0c82b8d42806b55ddd81dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;