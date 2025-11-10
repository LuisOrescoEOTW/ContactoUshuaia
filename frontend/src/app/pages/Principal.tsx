import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import {
  getRubrosXContratistas,
  getRubrosXContratistasHabilitados,
} from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";
import {
  getPalabrasClaves,
  getPalabrasClavesNombresUnicos,
} from "../../redux/slices/palabrasClaves/palabrasClavesThunks";
import imagen from "../images/logo.png";
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { IpalabrasClaves } from "../models/IpalabrasClaves";
import { getRubros } from "../../redux/slices/rubros/rubrosThunks";
import { Person } from "@mui/icons-material";
import { Puntuar } from "../components/Puntuar";
import type { IrubroXContratista } from "../models/IrubroXContratista";
import { set } from "react-hook-form";

export const Principal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { rubrosXContratistas = [] } = useSelector(
    (state: RootState) => state.rubrosXContratistas
  );
  const { palabrasClavesNombresUnicos = [] } = useSelector(
    (state: RootState) => state.palabrasClaves
  );
  const { palabrasClaves = [] } = useSelector(
    (state: RootState) => state.palabrasClaves
  );
  const { rubros = [] } = useSelector((state: RootState) => state.rubros);

  const [searchValue, setSearchValue] = useState<string>("");

  // Cargar datos iniciales
  useEffect(() => {
    dispatch(getRubros());
    dispatch(getRubrosXContratistasHabilitados());
    //dispatch(getRubrosXContratistas());
    dispatch(getPalabrasClaves());
    dispatch(getPalabrasClavesNombresUnicos());
  }, [dispatch]);

  // 🔍 Acción al presionar Enter o clic en botón
  const [pcEncontrado, setPcEncontrado] = useState<IpalabrasClaves[] | null>(
    null
  );
  const handleBuscar = () => {
    // Ejemplo: filtrar rubrosXContratistas por palabra clave
    const resultados = palabrasClaves.filter(
      (item) => item.nombre.toLowerCase() == searchValue.toLowerCase()
    );
    setPcEncontrado(resultados.length > 0 ? resultados : null);
  };

  // Para mostrar todos los contratistas agrupados por rubro
  const rubrosConContratistas = useMemo(() => {
    // Si no hay datos aún, devolvemos un array vacío
    if (!rubros || !rubrosXContratistas) return [];

    return rubros.map((rubro) => {
      // Filtra los contratistas que pertenecen a este rubro
      const contratistasDeRubro = rubrosXContratistas.filter(
        (item) => item.rubrosId === rubro.id
      );

      //Ordenrar por Nombre Ascendente
      contratistasDeRubro.sort((a, b) => {
        if (
          (a.contratistas?.nombreApellido ?? "") <
          (b.contratistas?.nombreApellido ?? "")
        )
          return -1;
        if (
          (a.contratistas?.nombreApellido ?? "") >
          (b.contratistas?.nombreApellido ?? "")
        )
          return 1;
        return 0;
      });

      return {
        ...rubro,
        contratistas: contratistasDeRubro,
      };
    });
  }, [rubros, rubrosXContratistas]);

  //Abrir ventana para puntuar
  const [modal, setModal] = useState(false);
  const [editState, setEditState] = useState<IrubroXContratista | null>(null)
  const handlePuntuar = (item: any) => {
    console.log(item);
    setEditState(item);
    setModal(true);
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            textAlign: { xs: "center", sm: "left" },
            padding: "20px",
          }}
        >
          <div>Acerca del Sitio</div>
          <div style={{ textAlign: "end" }}>Preguntas Frecuentes</div>
        </Box>

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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr auto" },
            gap: 2,
            borderRadius: 2,
            p: 2,
            width: { xs: "90%", sm: "70%", md: "60%" },
            maxWidth: 600,
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
        </Box>
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
                // borderBlock: "1px solid #ccc",
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
        <Box sx={{ p: 2 }}>
          {rubrosConContratistas.map((rubro) => (
            <Stack
              key={rubro.id}
              // direction="row"
              direction={{ xs: "column", md: "row" }}
              // alignItems="flex-start"
              spacing={2}
              sx={{
                mb: 2,
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                backgroundColor: "#f9f9f9",
              }}
            >
              {/* 🧩 Columna izquierda: imagen, título y recuadro */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column", // apila verticalmente
                  alignItems: "center",
                  minWidth: { xs: "100%", md: 220 },
                  mb: { xs: 2, md: 0 },
                  // minWidth: 220,
                  // flexShrink: 0,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "left", gap: 2 }}>
                  <img
                    src={`../src/app/images/iconos/${rubro?.icono}`}
                    alt={rubro?.nombre}
                    style={{
                      height: "80px",
                      width: "80px",
                      objectFit: "contain",
                    }}
                  />
                  <Typography
                    fontWeight="bold"
                    color="primary"
                    variant="h6"
                    sx={{ textAlign: "left" }}
                  >
                    {rubro.nombre}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: { xs: "80%", md: 150 },
                    height: { xs: 80, md: 100 },
                    mt: 2,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#e0e0e0",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    boxShadow: 2,
                  }}
                >
                  Publicidad
                </Box>
              </Box>

              {/* 📋 Columna derecha: ListView de contratistas */}
              <Box
                sx={{
                  flex: 1,
                  maxHeight: 600,
                  overflowY: "auto",
                  "&::-webkit-scrollbar": { width: "6px" },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#ccc",
                    borderRadius: "8px",
                  },
                }}
              >
                {rubro.contratistas.length > 0 ? (
                  rubro.contratistas.slice(0, 5).map((item) => (
                    <Card
                      key={item.id}
                      sx={{ mb: 2, borderRadius: 3, pl: 2, pr: 2 }}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Person sx={{ fontSize: 40, color: "primary.main" }} />
                        <CardContent sx={{ flex: 1 }}>
                          <Typography variant="h6" fontWeight="bold">
                            <span style={{ marginRight: "10px" }}>
                              {item.contratistas?.nombreApellido}
                            </span>
                            <Rating
                              defaultValue={
                                item.cantidadPuntuados > 2
                                  ? (item.sumatoriaPuntuados == 0
                                      ? 0
                                      : item.sumatoriaPuntuados /
                                        item.cantidadPuntuados) / 2
                                  : 0
                              }
                              precision={0.5}
                              readOnly
                            />
                          </Typography>

                          <Typography variant="body2">
                            <span style={{ color: "black" }}>Teléfono: </span>
                            <span style={{ color: "gray" }}>
                              {item.contratistas?.telefono || "-"}
                            </span>
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            <span style={{ color: "black" }}>Correo: </span>
                            <span style={{ color: "gray" }}>
                              {item.contratistas?.email || "-"}
                            </span>
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            <span style={{ color: "black" }}>Matrícula: </span>
                            <span style={{ color: "gray" }}>
                              {item.contratistas?.matricula || "-"}
                            </span>
                          </Typography>
                        </CardContent>

                        <div
                          onClick={() => handlePuntuar(item)}
                          style={{
                            transform: "rotate(270deg)",
                            cursor: "pointer",
                            color: "#008F9E",
                            fontWeight: "bold",
                          }}
                        >
                          Puntuar
                        </div>
                      </Stack>
                    </Card>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No hay contratistas disponibles para este rubro.
                  </Typography>
                )}
              </Box>
            </Stack>
          ))}
        </Box>
      </div>
      {/* Modificaciones */}
      <Puntuar
        open={modal}
        onClose={() => (setModal(false), setEditState(null))}
        editState={editState}
      />
    </>
  );
};
