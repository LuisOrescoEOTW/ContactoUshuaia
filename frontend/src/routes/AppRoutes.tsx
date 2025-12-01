import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Principal } from "../app/pages/Principal";
import { Admin } from "../app/pages/Admin";
import { Login } from "../app/pages/auth/Login";
import { ResetPassword } from "../app/pages/auth/ResetPassword";
import { AuthGuard } from "../app/pages/authGuard";

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Principal />} />

      <Route path="/login" element={<Login />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Ruta protegida: solo accesible si AuthGuard permite */}
      <Route
        path="/admin"
        element={
          <AuthGuard>
            <Admin />
          </AuthGuard>
        }
      />

      {/* cualquier otra URL redirige al root */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
