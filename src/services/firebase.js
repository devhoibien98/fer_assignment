// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBb2zx4vKL87p1AUq92BV1IXJn-Q4GRhQU",
  authDomain: "login-fer.firebaseapp.com",
  projectId: "login-fer",
  storageBucket: "login-fer.appspot.com",
  messagingSenderId: "472139879772",
  appId: "1:472139879772:web:a20220bf34e4ad2c16dd99",
  measurementId: "G-PF3961D42J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
  });
export { auth, provider };
