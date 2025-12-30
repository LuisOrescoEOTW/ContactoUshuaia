import { Person } from "@mui/icons-material";
import { Card, CardContent, Rating, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Puntuar } from "../components/Puntuar";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { useMemo, useState } from "react";
import type { IrubroXContratista } from "../models/IrubroXContratista";
import { WhatsAppLink } from "./WhatsAppLink";

export const PrincipalRubrosXCont = () => {
  const { rubrosXContratistas = [] } = useSelector(
    (state: RootState) => state.rubrosXContratistas
  );
  const { rubros = [] } = useSelector((state: RootState) => state.rubros);

  //Abrir ventana para puntuar
  const [modal, setModal] = useState(false);
  const [editState, setEditState] = useState<IrubroXContratista | null>(null);
  const handlePuntuar = (item: any) => {
    setEditState(item);
    setModal(true);
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

      //Ordenar por Nombre Ascendente
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

  return (
    <>
      <Box sx={{ p: 2 }}>
        {rubrosConContratistas.map((rubro) => (
          <Stack
            key={rubro.id}
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              boxShadow: 3,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column", // apila verticalmente
                alignItems: "left",
                gap: 2,
                minWidth: { xs: "100%", md: 220 },
                mb: { xs: 2, md: 0 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "left", gap: 2 }}>
                <img
                  id={rubro.nombre}
                  src={`../src/app/images/iconos/${rubro?.icono}`}
                  alt={rubro?.nombre}
                  style={{
                    height: "100px",
                    width: "100px",
                    objectFit: "contain",
                  }}
                />
                <Typography
                  fontWeight="bold"
                  color="primary"
                  variant="h4"
                  sx={{ textAlign: "left", alignContent: "center" }}
                >
                  {rubro.nombre}
                </Typography>
              </Box>

              {/* Contenedor de la imagen centrado y flexible */}
              <div
                style={{
                  flex: 1, // Ocupa el resto del espacio del contenedor de 50vh
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden", // Evita desbordamientos
                  paddingBottom: "50px", // Un pequeño respiro visual inferior
                }}
              >
                {rubro.publicidad ? (
                  <img
                    src={
                      rubro.publicidad.startsWith("data:")
                        ? rubro.publicidad
                        : `data:image/png;base64,${rubro.publicidad}`
                    }
                    alt="Logo"
                    style={{
                      maxHeight: "100%", // Ocupa hasta el máximo del contenedor flexible
                      maxWidth: "100%", // Evita que toque los bordes laterales
                      objectFit: "contain", // Mantiene la proporción sin deformar
                    }}
                  />
                ) : (
                  <p style={{ color: "#999" }}>Espacio Publicitario</p>
                )}
              </div>
            </Box>

            <Box
              sx={{
                flex: 1,
                maxHeight: 700,
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
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Stack direction="column" alignItems="center" spacing={1}>
                        <Person
                          sx={{
                            color: "primary.main",
                            fontSize: {
                              xs: 30,
                              md: 60,
                            },
                            flexShrink: 0,
                          }}
                        />
                        <WhatsAppLink phoneNumber={item.contratistas?.telefono || "-"} />
                      </Stack>
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          flexBasis: {
                            xs: "75%", // mobile → ocupa más
                            md: "auto",
                          },
                        }}
                      >
                        <Typography
                          fontWeight="bold"
                          sx={{
                            fontSize: {
                              xs: "1.3rem", // celular
                              sm: "1.1rem",
                              md: "1.6rem", // desktop (h5 aprox)
                            },
                          }}
                        >
                          <span style={{ marginRight: "10px" }}>
                            {item.contratistas?.nombreApellido}
                          </span>
                          <Rating
                            value={
                              item.cantidadPuntuados > 2
                                ? item.sumatoriaPuntuados /
                                  item.cantidadPuntuados /
                                  2
                                : 0
                            }
                            precision={0.5}
                            readOnly
                          />
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: {
                              xs: "1.1rem", // celular
                              sm: "1.1rem",
                              md: "1.2rem", // desktop (h5 aprox)
                            },
                          }}
                        >
                          <span style={{ color: "black" }}>Teléfono: </span>
                          <span style={{ color: "gray" }}>
                            {item.contratistas?.telefono || "-"}
                          </span>
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: {
                              xs: "1rem", // celular
                              sm: "1.1rem",
                              md: "1.2rem", // desktop (h5 aprox)
                            },
                            wordBreak: "break-all", // 🔥
                            overflowWrap: "anywhere", // 🔥
                          }}
                        >
                          <span style={{ color: "black" }}>Correo: </span>
                          <span style={{ color: "gray" }}>
                            {item.contratistas?.email || "-"}
                          </span>
                        </Typography>

                        <Typography
                          sx={{
                            fontSize: {
                              xs: "1rem", // celular
                              sm: "1.1rem",
                              md: "1.2rem", // desktop (h5 aprox)
                            },
                          }}
                        >
                          <span style={{ color: "black" }}>Matrícula: </span>
                          <span style={{ color: "gray" }}>
                            {item.contratistas?.matricula || "-"}
                          </span>
                        </Typography>
                      </CardContent>

                      <Box
                        onClick={() => handlePuntuar(item)}
                        sx={{
                          cursor: "pointer",
                          color: "#008F9E",
                          fontWeight: "bold",
                          transform: "rotate(270deg)",
                          flexBasis: {
                            xs: "5%",
                            md: "auto",
                          },
                          fontSize: {
                            xs: "0.8rem",
                            md: "1.2rem",
                          },
                        }}
                      >
                        Puntuar
                      </Box>
                    </Stack>
                  </Card>
                ))
              ) : (
                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: {
                      xs: "1rem", // celular
                      sm: "1.1rem",
                      md: "1.2rem", // desktop (h5 aprox)
                    },
                  }}
                >
                  No hay contratistas disponibles para este rubro.
                </Typography>
              )}
            </Box>
          </Stack>
        ))}
      </Box>

      {/* Formulario Puntuar */}
      <Puntuar
        open={modal}
        onClose={() => (setModal(false), setEditState(null))}
        editState={editState}
      />
    </>
  );
};
