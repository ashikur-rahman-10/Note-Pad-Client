// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCQNe-IdjBuOoiyjuY7fpKg7EmGwmpcQVQ",
    authDomain: "notes-00.firebaseapp.com",
    projectId: "notes-00",
    storageBucket: "notes-00.appspot.com",
    messagingSenderId: "654334349573",
    appId: "1:654334349573:web:491db93968044710aea76c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;