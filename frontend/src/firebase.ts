// Importar Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//Nueva configuración Firebase
const firebase = {
  apiKey: "AIzaSyBv735Lui1y3jXOELZLbO5Fx5KCPz9PSAg",
  authDomain: "contactoushuaia-4e38b.firebaseapp.com",
  projectId: "contactoushuaia-4e38b",
  storageBucket: "contactoushuaia-4e38b.firebasestorage.app",
  messagingSenderId: "346334425058",
  appId: "1:346334425058:web:311aa97e82a7180b2213bb"
};

// Inicializar
const app = initializeApp(firebase);
export const auth = getAuth(app);


