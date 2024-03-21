import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword   } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyD43Sfze-ODmLEPV6daLFHQxvz4PGRKUA8",
  authDomain: "travel-app-f8179.firebaseapp.com",
  projectId: "travel-app-f8179",
  storageBucket: "travel-app-f8179.appspot.com",
  messagingSenderId: "269113703990",
  appId: "1:269113703990:web:2bcab6a4e1afcff2262297",
  measurementId: "G-YZGQ053Z3C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword , signInWithEmailAndPassword , sendPasswordResetEmail  };