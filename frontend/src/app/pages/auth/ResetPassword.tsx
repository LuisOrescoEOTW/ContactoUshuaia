// src/app/pages/auth/ResetPassword.tsx
import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";
import { Box, TextField, Button, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Se envió el correo para restablecer la contraseña.");
      navigate("/login");
    } catch (err: any) {
      toast.error("No se pudo enviar el correo. Verificá el email.");
    }
  };

  return (
    <Box sx={{ maxWidth: 420, m: "40px auto", p: 3 }}>
      <Typography variant="h5" mb={2}>Recuperar contraseña</Typography>
      <form onSubmit={handleReset}>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button type="submit" variant="contained" fullWidth>
          Enviar enlace
        </Button>
      </form>
    </Box>
  );
};
