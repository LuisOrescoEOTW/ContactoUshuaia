import imagen from "../images/logo.png";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PrincipalPregFrec } from "./PrincipalPregFrec";
import { PrincipalCuadroPequeño } from "./PrincipalCuadroPequeño";
import { PrincipalAcercaDe } from "./PrincipalAcercaDe";
import { PrincipalBuscador } from "./PrincipalBuscador";
import { PrincipalRubrosXCont } from "./PrincipalRubrosXCont";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { useEffect } from "react";
import { getRubros } from "../../redux/slices/rubros/rubrosThunks";
import { getRubrosXContratistasHabilitados } from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";
import {
  getPalabrasClaves,
  getPalabrasClavesNombresUnicos,
} from "../../redux/slices/palabrasClaves/palabrasClavesThunks";
import { getPreguntas } from "../../redux/slices/preguntasFrecuentes/preguntasFrecuentesThunks";
import { getAvisos } from "../../redux/slices/Aviso/avisoThunks";

export const Principal = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  //El componente padre carga, los hijos consumen.
  useEffect(() => {
    dispatch(getRubros());
    dispatch(getRubrosXContratistasHabilitados());
    dispatch(getPalabrasClaves());
    dispatch(getPalabrasClavesNombresUnicos());
    dispatch(getPreguntas());
    dispatch(getAvisos());
  }, []);

  return (
    <>
      {/* Recuadro pequeño */}
      <PrincipalCuadroPequeño />

      {/* Recuadro azul */}
      <div
        id="logoInicio"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          backgroundColor: "#008F9E",
          padding: "1%",
          width: "100%",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        <a
          href="#acercaDelSitio"
          style={{ color: "white", textDecoration: "none" }}
        >
          Acerca del Sitio
        </a>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={imagen}
            style={{
              maxHeight: "80%",
              maxWidth: "80%",
              objectFit: "contain",
            }}
          />
        </div>

        <a
          href="#preguntasFrecuentes"
          style={{
            color: "white",
            textDecoration: "none",
            textAlign: "end",
          }}
        >
          Preguntas Frecuentes
        </a>
      </div>

      {/* Buscar */}
      <PrincipalBuscador />

      {/* Mostrar Contratistas por Rubro */}
      <PrincipalRubrosXCont />

      {/* acerca del sitio y Preguntas Frecuentes */}
      <Box sx={{ p: 2 }}>
        <PrincipalAcercaDe />
        <PrincipalPregFrec />
      </Box>

      {/* Pie de Página */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          backgroundColor: "black",
          padding: "2%",
          color: "GrayText",
        }}
      >
        <a
          href="#logoInicio"
          style={{
            textAlign: "center",
            textDecoration: "none",
            color: "whitesmoke",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "1.1rem", // celular
                sm: "1.1rem",
                md: "1.5rem", // desktop (h5 aprox)
              },
            }}
          >
            Volver al inicio
          </Typography>
        </a>
        <a
          style={{ textAlign: "right", cursor: "pointer" }}
          onClick={() => navigate("/admin")}
        >
          Admin
        </a>
      </div>
    </>
  );
};
