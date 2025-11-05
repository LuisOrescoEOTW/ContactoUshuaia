import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getRubrosXContratistas } from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";
import { getPalabrasClaves } from "../../redux/slices/palabrasClaves/palabrasClavesThunks";
import imagen from "../images/logo.png";

export const Principal = () => {
  //Leer
  const dispatch = useDispatch<AppDispatch>();
  const { rubrosXContratistas = [] } = useSelector(
    (state: RootState) => state.rubrosXContratistas
  );
  const { palabrasClaves = [] } = useSelector(
    (state: RootState) => state.palabrasClaves
  );

  useEffect(() => {
    console.log(rubrosXContratistas);
  }, [rubrosXContratistas]);

  useEffect(() => {
    console.log(palabrasClaves);
  }, [palabrasClaves]);

  // General
  useEffect(() => {
    dispatch(getRubrosXContratistas());
    dispatch(getPalabrasClaves());
  }, [dispatch]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "50vh",
          backgroundColor: "#008F9E",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            padding: "20px",
          }}
        >
          <div style={{ justifyItems: "left" }}>Acerca del Sitio</div>
          <div style={{ alignItems: "end", textAlign: "end" }}>
            Preguntas Frecuentes
          </div>
        </div>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center", // ✅ centra horizontalmente
            alignItems: "center", // ✅ centra verticalmente
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
      </div>

      {/* <div
        style={{ textAlign: "center", marginTop: "auto", marginBottom: "10px" }}
      >
        © 2025 Contacto Ushuaia. Todos los derechos reservados.
      </div> */}
    </>
  );
};
