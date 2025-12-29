import { Contratistas } from "./Contratistas";
import { PalabrasClaves } from "./PalabrasClaves";
import { useEffect, useState } from "react";
import { RubrosXContratistas } from "./RubrosXContratistas";
import type { Icontratista } from "../models/Icontratista";
import { Rubros } from "./Rubros";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { toast } from "react-toastify";
import { PreguntasFrecuentes } from "./PreguntasFrecuentes";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { getContratistas } from "../../redux/slices/contratistas/contratistasThunks";
import { getRubros } from "../../redux/slices/rubros/rubrosThunks";
import { getPalabrasClaves } from "../../redux/slices/palabrasClaves/palabrasClavesThunks";
import { getPreguntas } from "../../redux/slices/preguntasFrecuentes/preguntasFrecuentesThunks";
import { vaciarRubrosXContratistas } from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";

export const Admin = () => {
  //Datos Inciales
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(getContratistas());
    dispatch(getRubros());
    dispatch(getPalabrasClaves());
    dispatch(getPreguntas());
    dispatch(vaciarRubrosXContratistas());
  }, [dispatch]);
  
  const [contratistaSelect, setContratistaSelect] =
  useState<Icontratista | null>(null);

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
        <Contratistas contratistaSelect={setContratistaSelect} />
        <RubrosXContratistas contratista={contratistaSelect} />
        <Rubros contratista={contratistaSelect} />
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
        <PreguntasFrecuentes />
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
