import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { getRubrosXContratistasHabilitados } from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";
import {
  getPalabrasClaves,
  getPalabrasClavesNombresUnicos,
} from "../../redux/slices/palabrasClaves/palabrasClavesThunks";
import imagen from "../images/logo.png";
import {
  Autocomplete,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Rating,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import type { IpalabrasClaves } from "../models/IpalabrasClaves";
import { getRubros } from "../../redux/slices/rubros/rubrosThunks";
import { Person } from "@mui/icons-material";
import { Puntuar } from "../components/Puntuar";
import type { IrubroXContratista } from "../models/IrubroXContratista";
import { useNavigate } from "react-router-dom";

export const Principal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

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
  const [editState, setEditState] = useState<IrubroXContratista | null>(null);
  const handlePuntuar = (item: any) => {
    setEditState(item);
    setModal(true);
  };

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
      {/* Recuadro pequeño */}
      {scrolled && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            backgroundColor: "#008F9E",
            padding: "0.3%",
            width: "100vw",
            position: "fixed",
            alignItems: "center",
            zIndex: 1000,
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
          id="logoInicio"
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            textAlign: { xs: "center", sm: "left" },
            padding: "20px",
          }}
        >
          <a
            href="#acercaDelSitio"
            style={{ color: "white", textDecoration: "none" }}
          >
            Acerca del Sitio
          </a>
          <a
            href="#preguntasFrecuentes"
            style={{ color: "white", textDecoration: "none", textAlign: "end" }}
          >
            Preguntas Frecuentes
          </a>
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
                <a href={"#" + pc.rubros?.nombre}>
                  <img
                    src={`../src/app/images/iconos/${pc.rubros?.icono}`}
                    alt={pc.rubros?.nombre}
                    style={{
                      height: "60px",
                      width: "60px",
                      objectFit: "contain",
                    }}
                  />
                </a>
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
                    <a href={"#" + pc.nombre}>
                      <img
                        src={`../src/app/images/iconos/${pc.icono}`}
                        alt={pc.nombre}
                        style={{
                          height: "60px",
                          width: "60px",
                          objectFit: "contain",
                        }}
                      />
                    </a>
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

      {/* acerca del sitio */}
      <Box sx={{ p: 2 }}>
        <Card
          style={{
            // margin: "20px",
            backgroundColor: "#008F9E",
            color: "whitesmoke",
            borderRadius: "20px",
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                id="acercaDelSitio"
                gutterBottom
                variant="h4"
                component="div"
              >
                Acerca del sitio
              </Typography>
              <Typography variant="h6">
                El gran misterio: la gente con un desastre en casa (o en la
                obra) no encuentra a la gente que sabe cómo arreglarlo. En
                <span style={{ fontWeight: "bold" }}> Ushuaia</span>, el pase de
                datos de plomeros, puntores, electricistas y demás es por el
                método prehistórico del boca en boca. ¡Pero eso se acabó. Esto
                es
                <span style={{ fontWeight: "bold" }}> CONTACTO Ushuaia</span>.
                Su única misión es meter toda esa info en un solo lugar y que
                encontrar a un experto sea mas fácil que pelar una papa. Sobre
                todo, cuando el caos es inminente: ese tablero que echa chispas,
                el temido olor a gas, o el manantial que acaba de brotar de tu
                pared.
              </Typography>
              <Typography variant="h6">
                <span style={{ fontWeight: "bold" }}>CONTACTO Ushuaia </span>
                actúa únicamente como una plataforma de publicación e
                informativa para poner en contacto a potenciales clientes con
                contratistas independientes.
              </Typography>
              <Typography variant="h6">
                <span style={{ fontWeight: "bold" }}>CONTACTO Ushuaia </span>
                no se responsabiliza, bajo ninguna circunstancia, por la
                calidad, ejecución, legalidad o cumplimiento de los trabajos o
                servicios contratados por el cliente al contratista. Al utilizar
                esta plataforma, el cliente y el contratista aceptan
                expresamente que
                <span style={{ fontWeight: "bold" }}> CONTACTO Ushuaia </span>
                queda exonerado de toda responsabilidad legal, financiera y
                material derivada de sus interacciones y acuerdos privados.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>

        {/* Preguntas Frecuentes */}
        <Card
          style={{
            // margin: "20px",
            marginTop: "20px",
            backgroundColor: "#008F9E",
            color: "whitesmoke",
            borderRadius: "20px",
          }}
        >
          <CardActionArea>
            <CardContent>
              <Typography
                id="preguntasFrecuentes"
                gutterBottom
                variant="h4"
                component="div"
              >
                Preguntas Frecuentes
              </Typography>
              <Typography variant="h6" fontWeight={"bold"}>
                ¿Cómo puedo publicar mi servicios?
              </Typography>
              <Typography variant="h6">
                Comunicate a través del correo XXX@xxx.com o por WhatsApp al
                2091-xxxxxx y te enviaremos un formulario.
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
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
          Volver al inicio
        </a>
        <a
          style={{ textAlign: "right", cursor: "pointer" }}
          onClick={() => navigate("/admin")}
        >
          Admin
        </a>
      </div>

      {/* Formulario Puntuar */}
      <Puntuar
        open={modal}
        onClose={() => (setModal(false), setEditState(null))}
        editState={editState}
      />
    </>
  );
};
