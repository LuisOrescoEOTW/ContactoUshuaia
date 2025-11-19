import { useDispatch } from "react-redux";
import type { IrubroXContratista } from "../models/IrubroXContratista";
import type { AppDispatch } from "../../redux/store";
import { putRubrosXContratistasRefresh } from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Rating,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  editState: IrubroXContratista | null;
}
interface Pregunta {
  id: number;
  texto: string;
}

export const Puntuar: React.FC<Props> = ({ open, onClose, editState }) => {
  const dispatch = useDispatch<AppDispatch>();

  const preguntas: Pregunta[] = [
    { id: 1, texto: "Sobre el contratista:" },
    { id: 2, texto: "¿Responde rápido?" },
    { id: 3, texto: "¿Es puntual?" },
    { id: 4, texto: "¿Es responsable?" },
    { id: 5, texto: "Sobre el trabajo realizado:" },
    { id: 6, texto: "¿Cumple el objetivo?" },
    { id: 7, texto: "¿Está conforme?" },
  ];

  // Estado: una respuesta por pregunta (por ejemplo ["si", "no", "aveces", ...])
  const [respuestas, setRespuestas] = useState<string[]>(
    Array(preguntas.length).fill("")
  );

  const [total, setTotal] = useState(0);

  // 🔹 Manejar cambio en cada respuesta
  const handleRespuestaChange = (index: number, value: string) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[index] = value;
    setRespuestas(nuevasRespuestas);

    // Convertir respuesta en puntaje: si=2, aveces=1, no=0
    const puntos = nuevasRespuestas.map((r) =>
      r === "si" ? 2 : r === "aveces" ? 1 : 0
    );
    const suma = puntos.reduce<number>((acc, val) => acc + val, 0);
    setTotal(suma);
  };

  // Actualizar
  const onSubmit = () => {
    const data = {
      ...editState,
      sumatoriaPuntuados: editState?.sumatoriaPuntuados
        ? editState?.sumatoriaPuntuados + total
        : total,
      cantidadPuntuados: editState?.cantidadPuntuados
        ? editState?.cantidadPuntuados + 1
        : 1,
    };
    delete data.contratistas;
    delete data.rubros;
    dispatch(putRubrosXContratistasRefresh(data))
      .then(() => {
        toast.success("Se registro su puntuación");
        onClose();
      })
      .catch(() => toast.error("Error al modificar el elemento"));
  };

  return (
    <>
      {editState && (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#008F9E",
              fontWeight: "bold",
              fontSize: "30px",
            }}
          >
            Puntuar Contratista
          </DialogTitle>

          <DialogContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {editState.contratistas?.nombreApellido}
            </Typography>

            {preguntas.map((p, index) => (
              <Box
                key={p.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 3,
                  mt: 2,
                }}
              >
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight={p.id === 1 || p.id === 5 ? "bold" : "normal"}
                  marginLeft={p.id === 1 || p.id === 5 ? 5 : 10}
                >
                  {p.texto}
                </Typography>

                {/* Solo mostrar opciones si no es título */}
                {p.id !== 1 && p.id !== 5 && (
                  <FormControl>
                    <RadioGroup
                      row
                      value={respuestas[index]}
                      onChange={(e) =>
                        handleRespuestaChange(index, e.target.value)
                      }
                    >
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
                        value="aveces"
                        control={<Radio color="primary" />}
                        label="A veces"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              </Box>
            ))}

            {/* 🔹 Mostrar puntaje total */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Typography variant="h6" sx={{ mr: 2 }}>
                Total:
              </Typography>
              <Rating
                // value={total / preguntas.length}
                value={total / 2}
                precision={0.5}
                readOnly
              />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ({total} puntos)
              </Typography>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button onClick={onClose} variant="contained" color="error">
              Cancelar
            </Button>
            <Button onClick={onSubmit} variant="contained" color="success">
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
