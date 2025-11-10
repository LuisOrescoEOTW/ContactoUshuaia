import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
} from "@mui/material";

interface Pregunta {
  id: number;
  texto: string;
}

const preguntas: Pregunta[] = [
  { id: 1, texto: "¿Cumple con los plazos acordados?" },
  { id: 2, texto: "¿Mantiene buena comunicación durante el proyecto?" },
  { id: 3, texto: "¿Entregó el trabajo con buena calidad?" },
  { id: 4, texto: "¿Responde rápidamente a los mensajes?" },
  { id: 5, texto: "¿Recomendarías trabajar con este contratista nuevamente?" },
];

export const Prueba = () => {
  const [open, setOpen] = useState(false);
  const [respuestas, setRespuestas] = useState<Record<number, string>>({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (id: number, value: string) => {
    setRespuestas((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    console.log("Respuestas enviadas:", respuestas);
    // Aquí podrías enviar las respuestas a la API o Redux
    setOpen(false);
  };

  return (
    <div>
      {/* 👉 Botón que abre el modal (simula el "Puntuar") */}
      <div
        onClick={handleOpen}
        style={{
          transform: "rotate(270deg)",
          cursor: "pointer",
          color: "#008F9E",
          fontWeight: "bold",
          userSelect: "none",
        }}
      >
        Puntuar
      </div>

      {/* 🧩 Modal */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Puntuar contratista</DialogTitle>
        <DialogContent>
          {preguntas.map((p) => (
            <Box key={p.id} sx={{ mb: 2 }}>
              <RadioGroup
                row
                value={respuestas[p.id] || ""}
                onChange={(e) => handleChange(p.id, e.target.value)}
              >
              <Typography fontWeight="bold" gutterBottom>
                {p.texto}
              </Typography>
                <FormControlLabel
                  value="si"
                  control={<Radio color="primary" />}
                  label="Sí"
                />
                <FormControlLabel
                  value="no"
                  control={<Radio color="primary" />}
                  label="No"
                />
                <FormControlLabel
                  value="a_veces"
                  control={<Radio color="primary" />}
                  label="A veces"
                />
              </RadioGroup>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
