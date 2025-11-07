import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getRubrosXContratistas } from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";
import {
  getPalabrasClaves,
  getPalabrasClavesNombresUnicos,
} from "../../redux/slices/palabrasClaves/palabrasClavesThunks";
import imagen from "../images/logo.png";
import { Autocomplete, Box, Container, TextField } from "@mui/material";
import type { IpalabrasClaves } from "../models/IpalabrasClaves";
import { getRubros } from "../../redux/slices/rubros/rubrosThunks";

export const Principal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rubrosXContratistas = [] } = useSelector((state: RootState) => state.rubrosXContratistas);
  const { palabrasClavesNombresUnicos = [] } = useSelector((state: RootState) => state.palabrasClaves);
  const { palabrasClaves = [] } = useSelector((state: RootState) => state.palabrasClaves);
  const { rubros = [] } = useSelector((state: RootState) => state.rubros);

  const [searchValue, setSearchValue] = useState<string>("");

  // Cargar datos iniciales
  useEffect(() => {
    dispatch(getRubros());
    dispatch(getRubrosXContratistas());
    dispatch(getPalabrasClaves());
    dispatch(getPalabrasClavesNombresUnicos());
  }, [dispatch]);

  // 🔍 Acción al presionar Enter o clic en botón
  const [pcEncontrado, setPcEncontrado] = useState<IpalabrasClaves[] | null>(
    null
  );
  const handleBuscar = () => {
    console.log(rubrosXContratistas);
    
    console.log("Texto buscado:", searchValue);
    // acá podés despachar una acción o filtrar resultados
    // dispatch(filtrarPorPalabra(searchValue));

    // Ejemplo: filtrar rubrosXContratistas por palabra clave
    const resultados = palabrasClaves.filter(
      (item) => item.nombre.toLowerCase() == searchValue.toLowerCase()
    );
    console.log("Resultados encontrados:", resultados);
    setPcEncontrado(resultados.length > 0 ? resultados : null);
  };

  return (
    <>
      {/* Recuadro azul */}
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
          <div>Acerca del Sitio</div>
          <div style={{ textAlign: "end" }}>Preguntas Frecuentes</div>
        </div>

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
      </div>

      {/* Buscar */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: "10px",
            borderRadius: "8px",
            padding: "15px",
            width: "60%",
            maxWidth: "600px",
            backgroundColor: "#008F9E",
          }}
        >
          {/* Campo de búsqueda */}
          <Autocomplete
            freeSolo
            disablePortal
            options={palabrasClavesNombresUnicos}
            value={searchValue}
            onInputChange={(_, newValue) => setSearchValue(newValue)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleBuscar();
              }
            }}
            sx={{
              width: "100%",
              "& .MuiInputLabel-root": {
                color: "white",
                fontSize: "1.3rem",
                transform: "translate(14px, 14px) scale(1)",
              },
              "& .MuiInputLabel-root.Mui-focused, & .MuiInputLabel-shrink": {
                transform: "translate(14px, -9px) scale(0.6)",
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "transparent",
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "#cce7e8" },
                "&.Mui-focused fieldset": { borderColor: "white" },
                "& input": {
                  color: "white",
                  fontSize: "1.4rem",
                  padding: "16px 16px",
                },
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="¿Qué necesitas?"
                InputLabelProps={{
                  style: { color: "white", fontSize: "1.4rem" },
                }}
              />
            )}
          />

          {/* Botón de búsqueda */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onClick={handleBuscar}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src="../src/app/images/buscar.png"
              alt="Buscar"
              style={{
                height: "45px",
                width: "45px",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>

      {/* Iconos de Rubros */}
      {pcEncontrado ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center", // 🔹 Centra todo el contenido horizontalmente
            justifyContent: "center",
            gap: "20px",
            fontSize: "18px",
            padding: "20px",
            textAlign: "center",
          }}
        >
          {/* Texto centrado */}
          <div style={{ color: "#008F9E", fontWeight: "bold" }}>
            Te pueden ayudar los contratistas del rubro a continuación
          </div>

          {/* Contenedor de íconos (alineados en fila) */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap", // 🔹 Permite que los iconos salten de línea si no entran
              justifyContent: "center", // 🔹 Centra toda la fila de iconos
              gap: "30px", // 🔹 Espaciado entre cada ícono
            }}
          >
            {pcEncontrado.map((pc) => (
              <div
                key={pc.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // 🔹 Centra imagen y texto
                }}
              >
                <img
                  src={`../src/app/images/iconos/${pc.rubros?.icono}`}
                  alt={pc.rubros?.nombre}
                  style={{
                    height: "60px",
                    width: "60px",
                    objectFit: "contain",
                  }}
                />
                <div
                  style={{
                    color: "black",
                    marginTop: "8px",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {pc.rubros?.nombre}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          {rubros && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // 🔹 Centra todo el contenido horizontalmente
                justifyContent: "center",
                gap: "20px",
                fontSize: "18px",
                padding: "20px",
                textAlign: "center",
                borderBlock: "1px solid #ccc",
              }}
            >
              {/* Contenedor de íconos (alineados en fila) */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap", // 🔹 Permite que los iconos salten de línea si no entran
                  justifyContent: "center", // 🔹 Centra toda la fila de iconos
                  gap: "30px", // 🔹 Espaciado entre cada ícono
                }}
              >
                {rubros.map((pc) => (
                  <div
                    key={pc.id}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center", // 🔹 Centra imagen y texto
                    }}
                  >
                    <img
                      src={`../src/app/images/iconos/${pc.icono}`}
                      alt={pc.nombre}
                      style={{
                        height: "60px",
                        width: "60px",
                        objectFit: "contain",
                      }}
                    />
                    <div
                      style={{
                        color: "black",
                        marginTop: "8px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                    >
                      {pc.nombre}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mostrar Contratistas por Rubro */}
      <div>
        
      </div>
    </>
  );
};
