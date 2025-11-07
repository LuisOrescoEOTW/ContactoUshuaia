import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
import { Person, PointOfSale, Work } from "@mui/icons-material";

interface Contratista {
  id: number;
  nombreApellido: string;
  telefono: string;
  email: string;
  matricula: string;
}

interface Rubro {
  id: number;
  nombre: string;
  publicidad: string;
  icono: string;
  deleted: boolean;
}

interface Item {
  id: number;
  rubrosId: number;
  contratistasId: number;
  cantidadPuntuados: number;
  sumatoriaPuntuados: number;
  contratistas: Contratista;
  rubros: Rubro;
}

// 🔹 Ejemplo de datos
const data: Item[] = [
  {
    id: 1,
    rubrosId: 1,
    contratistasId: 1,
    cantidadPuntuados: 1,
    sumatoriaPuntuados: 9,
    rubros: { id: 1, nombre: "Albañilería", publicidad: "", icono: "", deleted: false },
    contratistas: {
      id: 1,
      nombreApellido: "Franquito",
      telefono: "02901-5687522",
      email: "otro@gmail.com",
      matricula: "modif",
    },
  },
  {
    id: 2,
    rubrosId: 1,
    contratistasId: 2,
    cantidadPuntuados: 3,
    sumatoriaPuntuados: 27,
    rubros: { id: 1, nombre: "Albañilería", publicidad: "", icono: "", deleted: false },
    contratistas: {
      id: 2,
      nombreApellido: "Luis Pérez",
      telefono: "02901-123456",
      email: "luis@gmail.com",
      matricula: "123",
    },
  },
  {
    id: 3,
    rubrosId: 1,
    contratistasId: 1,
    cantidadPuntuados: 1,
    sumatoriaPuntuados: 9,
    rubros: { id: 1, nombre: "Albañilería", publicidad: "", icono: "", deleted: false },
    contratistas: {
      id: 1,
      nombreApellido: "Franquito",
      telefono: "02901-5687522",
      email: "otro@gmail.com",
      matricula: "modif",
    },
  },
  {
    id: 4,
    rubrosId: 1,
    contratistasId: 2,
    cantidadPuntuados: 3,
    sumatoriaPuntuados: 27,
    rubros: { id: 1, nombre: "Albañilería", publicidad: "", icono: "", deleted: false },
    contratistas: {
      id: 2,
      nombreApellido: "Luis Pérez",
      telefono: "02901-123456",
      email: "luis@gmail.com",
      matricula: "123",
    },
  },
  {
    id: 5,
    rubrosId: 1,
    contratistasId: 1,
    cantidadPuntuados: 1,
    sumatoriaPuntuados: 9,
    rubros: { id: 1, nombre: "Albañilería", publicidad: "", icono: "", deleted: false },
    contratistas: {
      id: 1,
      nombreApellido: "Franquito",
      telefono: "02901-5687522",
      email: "otro@gmail.com",
      matricula: "modif",
    },
  },
  {
    id: 6,
    rubrosId: 1,
    contratistasId: 2,
    cantidadPuntuados: 3,
    sumatoriaPuntuados: 27,
    rubros: { id: 1, nombre: "Albañilería", publicidad: "", icono: "", deleted: false },
    contratistas: {
      id: 2,
      nombreApellido: "Luis Pérez",
      telefono: "02901-123456",
      email: "luis@gmail.com",
      matricula: "123",
    },
  },
  {
    id: 7,
    rubrosId: 2,
    contratistasId: 3,
    cantidadPuntuados: 2,
    sumatoriaPuntuados: 15,
    rubros: { id: 2, nombre: "Electricidad", publicidad: "", icono: "", deleted: false },
    contratistas: {
      id: 3,
      nombreApellido: "Carlos Díaz",
      telefono: "02901-987654",
      email: "carlos@gmail.com",
      matricula: "555",
    },
  },
];

export const Prueba = () => {
  // Agrupar por rubro
  const rubrosMap = data.reduce<Record<number, Item[]>>((acc, item) => {
    if (!acc[item.rubrosId]) acc[item.rubrosId] = [];
    acc[item.rubrosId].push(item);
    return acc;
  }, {});

  const rubros = Object.values(
    data.reduce<Record<number, Rubro>>((acc, item) => {
      acc[item.rubros.id] = item.rubros;
      return acc;
    }, {})
  );

  return (
    <Box sx={{ p: 3 }}>
      {rubros.map((rubro) => (
        <Stack
          key={rubro.id}
          direction="row"
          alignItems="flex-start"
          spacing={2}
          sx={{
            mb: 4,
            p: 2,
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: "#f9f9f9",
          }}
        >
          {/* 📘 Columna del título */}
          <Box sx={{ minWidth: 180, textAlign: "center" }}>
            <Typography fontWeight="bold" color="primary" variant="h6">{rubro.nombre}</Typography>
          </Box>

          {/* 📋 ListView de contratistas */}
          <Box
            sx={{
              flex: 1,
              maxHeight: 600,
              overflowY: "auto",
              pr: 1,
              "&::-webkit-scrollbar": { width: "6px" },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#ccc",
                borderRadius: "8px",
              },
            }}
          >
            {rubrosMap[rubro.id]?.slice(0, 5).map((item) => (
              <Card
                key={item.id}
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  p: 1,
                  boxShadow: 1,
                  "&:hover": {
                    transform: "scale(1.02)",
                    transition: "0.2s",
                  },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Person sx={{ fontSize: 40, color: "primary.main" }} />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.contratistas.nombreApellido}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Work sx={{ color: "text.secondary" }} fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        {item.contratistas.telefono}
                      </Typography>
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {item.contratistas.email}
                    </Typography>
                  </CardContent>
                    <PointOfSale/>
                </Stack>
              </Card>
            ))}
          </Box>
        </Stack>
      ))}
    </Box>
  );
};
