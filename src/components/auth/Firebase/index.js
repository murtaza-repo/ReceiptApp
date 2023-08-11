// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5wJ8TBBxUewcDY6eZMLyBMN_iEbZdbOY",
  authDomain: "alit-tech.firebaseapp.com",
  projectId: "alit-tech",
  storageBucket: "alit-tech.appspot.com",
  messagingSenderId: "889774942851",
  appId: "1:889774942851:web:e0281c1572b6f4335f49b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;