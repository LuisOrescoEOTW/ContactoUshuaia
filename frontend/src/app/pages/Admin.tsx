import { Contratistas } from "./Contratistas";
import { PalabrasClaves } from "./PalabrasClaves";
import { useState } from "react";
import { RubrosXContratistas } from "./RubrosXContratistas";
import type { Icontratista } from "../models/Icontratista";
import { Rubros } from "./Rubros";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";

export const Admin = () => {
  const [contratistaSelect, setContratistaSelect] =
    useState<Icontratista | null>(null);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Sesión cerrada correctamente");
      navigate("/");
    } catch (error) {
      toast.error("No se pudo cerrar sesión");
    }
  };

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          width: "99vw",
        }}
      >
        <Contratistas contratista={setContratistaSelect} />
        <RubrosXContratistas contratista={contratistaSelect} />
        <Rubros contratista={contratistaSelect} />

        {/*<Rubros onClose={setRubrosSelect} selectedId={rubrosSelect} /> */}
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "99vw",
        }}
      >
        <PalabrasClaves />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gridTemplateColumns: "1fr 1fr",
          padding: "2%",
          marginTop: "20px",
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <Box mt={2} display="flex" justifyContent="space-between">
            <Link to="/">Ir a Pantalla Principal</Link>
          </Box>
        </div>
        <div style={{ flexGrow: 1 }}>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </>
  );
};
