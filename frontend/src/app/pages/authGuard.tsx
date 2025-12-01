// src/app/pages/authGuard.tsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../../firebase";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  // opcional: si lo usás como wrapper modal, podés pasar onFail para cerrar modal
  onFail?: () => void;
}

const AUTHORIZED_EMAIL = "lhorescovich@gmail.com"; // <-- poné TU email aquí

export const AuthGuard: React.FC<Props> = ({ children, onFail }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  // Mientras chequea el estado, podés devolver null o un spinner
  if (user === undefined) return null; // o un loader pequeño

  // No logueado
  if (!user) {
    if (onFail) onFail();
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logueado pero no autorizado
  if (user.email !== AUTHORIZED_EMAIL) {
    if (onFail) onFail();
    return <Navigate to="/" replace />;
  }

  // Autorizado
  return <>{children}</>;
};
