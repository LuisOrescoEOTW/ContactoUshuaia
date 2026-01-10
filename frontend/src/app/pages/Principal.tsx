import imagen from "../images/logo.png";
import { Box, Divider, Fab, Tooltip, Typography } from "@mui/material";
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
import { Firma } from "./Firma";
import { Add, AdminPanelSettings } from "@mui/icons-material";

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
      <div style={{ width: "100%", height: "100%" }}>
        <div
          id="logoInicio"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            backgroundColor: "#008F9E",
            padding: "5%",
            width: "100%",
            color: "white",
            fontSize: "20px",
          }}
        >
          <a
            href="#acercaDelSitio"
            style={{ color: "white", textDecoration: "none" }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "1rem", // celular
                  sm: "1.1rem",
                  md: "1.5rem", // desktop (h5 aprox)
                },
              }}
            >
              Acerca del Sitio
            </Typography>
          </a>

          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Box
              sx={{
                mt: { xs: "30%", sm: "10%", md: "0%" },
                mb: { xs: "30%", sm: "10%", md: "0%" },
              }}
            >
              <img
                src={imagen}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          </div>

          <a
            href="#preguntasFrecuentes"
            style={{
              color: "white",
              textDecoration: "none",
              textAlign: "end",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "1rem", // celular
                  sm: "1.1rem",
                  md: "1.5rem", // desktop (h5 aprox)
                },
              }}
            >
              Preguntas Frecuentes
            </Typography>
          </a>
        </div>
        {/* Buscar */}
        <PrincipalBuscador />
      </div>

      {/* Mostrar Contratistas por Rubro */}
      <PrincipalRubrosXCont />

      {/* acerca del sitio y Preguntas Frecuentes */}
      <Box sx={{ p: 2 }}>
        <PrincipalAcercaDe />
        <PrincipalPregFrec />
      </Box>

      {/* Pie de Página */}
      <a href="#logoInicio">
        <Typography
          sx={{
            textAlign: "center",
            textDecoration: "none",
            color: "whitesmoke",
            backgroundColor: "#1D2A4B",
            p: 5,
            fontSize: {
              xs: "1.1rem", // celular
              sm: "1.1rem",
              md: "1.5rem", // desktop (h5 aprox)
              cursor: "pointer",
            },
          }}
        >
          Volver al inicio
        </Typography>
      </a>
      <Divider/>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          backgroundColor: "#1D2A4B",
          padding: "2%",
          color: "GrayText",
        }}
      >
        <Firma />
        <a style={{ textAlign: "end", alignContent: "end", alignItems: "end" }}>
          <Tooltip title="Administrador">
            <Fab color="success" size="small">
              <AdminPanelSettings onClick={() => navigate("/admin")} />
            </Fab>
          </Tooltip>
        </a>
      </div>
    </>
  );
};
