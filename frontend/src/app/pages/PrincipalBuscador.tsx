import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import buscarImg from '../images/buscar.png';

// Import dinámico para iconos de rubros
const iconos = import.meta.glob('../images/iconos/*.png', { eager: true, import: 'default' }) as Record<string, string>;

export const PrincipalBuscador = () => {
  const rubros = useSelector((state: RootState) => state.rubros.rubros);
  const palabrasClaves = useSelector(
    (state: RootState) => state.palabrasClaves.palabrasClaves
  );

  // 🔹 ESTE ES string[]
  const palabrasClavesNombresUnicos = useSelector(
    (state: RootState) => state.palabrasClaves.palabrasClavesNombresUnicos
  );

  const [searchValue, setSearchValue] = useState("");

  const rubrosEncontrados = useMemo(() => {
    if (!searchValue.trim()) return [];

    const rubrosMap = new Map<number, any>();

    palabrasClaves
      .filter((pc) =>
        pc.nombre.toLowerCase().includes(searchValue.toLowerCase())
      )
      .forEach((pc) => {
        if (pc.rubros) {
          rubrosMap.set(pc.rubros.id, pc.rubros);
        }
      });

    return Array.from(rubrosMap.values());
  }, [searchValue, palabrasClaves]);

  return (
    <>
      {/* 🔎 Buscador */}
      <Box sx={{ display: "flex", justifyContent: "center", p: { xs: 1, sm: 4, md: 6 } }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            borderRadius: 2,
            p: 2,
            width: { xs: "90%", sm: "70%", md: "50%" },
            mt: { xs: "10%", sm: "10%", md: "0%" },
            mb: { xs: "10%", sm: "10%", md: "0%" },
            // maxWidth: 600,
            backgroundColor: "#008F9E",
          }}
        >
          <Autocomplete
            freeSolo
            inputValue={searchValue}
            onInputChange={(_, value) => setSearchValue(value)}
            options={
              searchValue.trim()
                ? palabrasClavesNombresUnicos.filter((op) =>
                    op.toLowerCase().includes(searchValue.toLowerCase())
                  )
                : []
            }
            filterOptions={(x) => x}
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
                InputLabelProps={{ style: { color: "white" } }}
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
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={buscarImg}
              alt="Buscar"
              style={{
                height: "45px",
                width: "45px",
                objectFit: "contain",
              }}
            />
          </div>
        </Box>
      </Box>

      {/* 📌 Resultados */}
      {rubrosEncontrados.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            p: 2,
          }}
        >
          <div style={{ color: "#008F9E", fontWeight: "bold" }}>
            Te pueden ayudar los contratistas del rubro a continuación
          </div>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 3,
              textAlign: "center",
            }}
          >
            {rubrosEncontrados.map((rubro) => (
              <Box key={rubro.id} sx={{ textAlign: "center" }}>
                <a href={"#" + rubro.nombre}>
                  <img
                    src={iconos[`../images/iconos/${rubro.icono}`]}
                    alt={rubro.nombre}
                    style={{ width: 60, height: 60 }}
                  />
                  <div>{rubro.nombre}</div>
                </a>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        searchValue.trim() === "" && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 3,
              p: 2,
            }}
          >
            {rubros.map((rubro) => (
              <Box
                key={rubro.id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <a href={"#" + rubro.nombre}>
                  <img
                    src={iconos[`../images/iconos/${rubro.icono}`]}
                    alt={rubro.nombre}
                    style={{ width: 60, height: 60 }}
                  />
                  <div style={{ marginTop: 8, fontWeight: 500 }}>
                    {rubro.nombre}
                  </div>
                </a>
              </Box>
            ))}
          </Box>
        )
      )}
    </>
  );
};
