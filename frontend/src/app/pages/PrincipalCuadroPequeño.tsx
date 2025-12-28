import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import imagen from "../images/logo.png";

export const PrincipalCuadroPequeño = () => {

  //Scroll chico
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Al hacer scroll visualice el header
    const handleScroll = () => {
      if (window.scrollY > 410) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    //Altura del header al hacer href
    const HEADER_HEIGHT_COMPENSATION = "15vh";
    document.documentElement.style.scrollPaddingTop =
      HEADER_HEIGHT_COMPENSATION; //estilo de HTML
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollPaddingTop = ""; //limpio
      document.documentElement.style.scrollBehavior = ""; //limpio
    };
  }, []);
  
  return (
    <>
      {scrolled && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            backgroundColor: "#008F9E",
            padding: "0.3%",
            width: "100vw",
            position: "fixed", // Fijo en la parte superior
            zIndex: 1000, // Asegura que el header esté por encima de otros elementos
          }}
        >
          <a
            href="#acercaDelSitio"
            style={{
              textAlign: "left",
              color: "whitesmoke",
              textDecoration: "none",
            }}
          >
            Acerca del Sitio
          </a>
          <a href="#logoInicio" style={{ textAlign: "center" }}>
            <Tooltip title="Volver al Inicio">
              <img style={{ height: "10vh" }} src={imagen} />
            </Tooltip>
          </a>
          <a
            href="#preguntasFrecuentes"
            style={{
              textAlign: "right",
              marginRight: "3%",
              color: "whitesmoke",
              textDecoration: "none",
            }}
          >
            Preguntas Frecuentes
          </a>
        </div>
      )}
    </>
  );
};
