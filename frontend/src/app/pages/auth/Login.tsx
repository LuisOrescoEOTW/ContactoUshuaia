// src/app/pages/auth/Login.tsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Bienvenido");
      navigate(from, { replace: true });
    } catch (err: any) {
      toast.error("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Box sx={{ maxWidth: 420, m: "40px auto", p: 3 }}>
      <Typography variant="h5" mb={2}>Iniciar sesión</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" fullWidth>
          Ingresar
        </Button>
      </form>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Link to="/reset-password">Olvidé mi contraseña</Link>
      </Box>
      <Box mt={2} display="flex" justifyContent="space-between">
        <Link to="/">Volver</Link>
      </Box>
    </Box>
  );
};
