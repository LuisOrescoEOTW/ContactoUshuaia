// Importar Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebase = {
  apiKey: "AIzaSyDuz3mDleo9EzAOTDuU6wEa_A7U2CYMFBA",
  authDomain: "contactoushuaia-33f1e.firebaseapp.com",
  projectId: "contactoushuaia-33f1e",
  storageBucket: "contactoushuaia-33f1e.firebasestorage.app",
  messagingSenderId: "895666366934",
  appId: "1:895666366934:web:8a016c9e9dd4c544fa5c77"
};

// Inicializar
const app = initializeApp(firebase);
export const auth = getAuth(app);

