import { Contratistas } from "./Contratistas";
import { PalabrasClaves } from "./PalabrasClaves";
import { useEffect, useState } from "react";
import { RubrosXContratistas } from "./RubrosXContratistas";
import type { Icontratista } from "../models/Icontratista";
import { Rubros } from "./Rubros";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { toast } from "react-toastify";
import { PreguntasFrecuentes } from "./PreguntasFrecuentes";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { getContratistas } from "../../redux/slices/contratistas/contratistasThunks";
import { getRubros } from "../../redux/slices/rubros/rubrosThunks";
import { getPalabrasClaves } from "../../redux/slices/palabrasClaves/palabrasClavesThunks";
import { getPreguntas } from "../../redux/slices/preguntasFrecuentes/preguntasFrecuentesThunks";
import { vaciarRubrosXContratistas } from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";
import { getPuntajes } from "../../redux/slices/Puntuar/puntuarThunks";
import { Puntuar } from "./Puntuar";
import { Avisos } from "./Avisos";
import { KeyboardBackspace, Logout } from "@mui/icons-material";

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
    dispatch(getPuntajes());
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

  const handlePrincipal = async () => {
    navigate("/principal");
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
        <Puntuar />
        <PalabrasClaves />
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          width: "99vw",
        }}
      >
        <PreguntasFrecuentes />
        <Avisos />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "2%",
        }}
      >
        <div>
          <Button variant="contained" startIcon={<KeyboardBackspace />} color="info" onClick={handlePrincipal}>
            Ir a Pantalla Principal
          </Button>
        </div>
        <div style={{ marginLeft: "50px" }}>
          <Button variant="contained" startIcon={<Logout />} color="error" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </div>
    </>
  );
};
