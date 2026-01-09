import { useDispatch, useSelector } from "react-redux";
import type { IrubroXContratista } from "../models/IrubroXContratista";
import type { AppDispatch, RootState } from "../../redux/store";
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
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { postPuntajes } from "../../redux/slices/Puntuar/puntuarThunks";
import type { Ipuntuar } from "../models/Ipuntuar";
import { postEnviarAviso } from "../../redux/slices/Aviso/avisoThunks";

interface Props {
  open: boolean;
  onClose: () => void;
  editState: IrubroXContratista | null;
}
interface Pregunta {
  id: number;
  texto: string;
}

export const PuntuarForm: React.FC<Props> = ({ open, onClose, editState }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { avisos = [] } = useSelector((state: RootState) => state.avisos);

  const preguntas: Pregunta[] = [
    { id: 1, texto: "Sobre el contratista:" },
    { id: 2, texto: "¿Responde rápido?" },
    { id: 3, texto: "¿Es puntual?" },
    { id: 4, texto: "¿Es responsable?" },
    { id: 5, texto: "Sobre el trabajo realizado:" },
    { id: 6, texto: "¿Cumple el objetivo?" },
    { id: 7, texto: "¿Está conforme?" },
  ];

  // Hook useForm
  const inicialState = {
    usuario: "",
    puntaje: 0,
    rubrosXcontratistasId: 1,
    deleted: false,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Ipuntuar>({ defaultValues: inicialState });

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

  // Guardar
  const onSubmit = (data: Ipuntuar) => {
    const objeto = {
      ...data,
      puntaje: total,
      rubrosXcontratistasId: editState ? editState.id : 1,
    };
    dispatch(postPuntajes(objeto))
      .then(() => {
        //Enviar Correo de notificación
        dispatch(postEnviarAviso(avisos[0]));
        toast.success("Puntuación enviada para aprobación");
        onClose();
      })
      .catch(() => toast.error("Error al enviar la puntuación"));
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
            Puntuar a {editState.contratistas?.nombreApellido}
          </DialogTitle>

          <DialogContent>
            {/* <Typography variant="h5" fontWeight="bold" gutterBottom>
              {editState.contratistas?.nombreApellido}
            </Typography> */}
            <Controller
              name="usuario"
              control={control}
              rules={{ required: "El nombre y apellido es obligatorio" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  margin="dense"
                  label="Nombre y Apellido"
                  fullWidth
                  error={!!errors.usuario}
                  helperText={errors.usuario?.message}
                />
              )}
            />
            <Typography variant="body2" color="textSecondary">
              Es necesario para evaluar la puntuación. No será publicado su
              Nombre en el portal.
            </Typography>

            {preguntas.map((p, index) => (
              <Box
                key={p.id}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  gap: { xs: 0.5, md: 3 },
                  mt: 2,
                  flexDirection: {
                    xs: "column",
                    md: "row",
                  },
                  alignItems: {
                    xs: "flex-start",
                    md: "center",
                  },
                }}
              >
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight={p.id === 1 || p.id === 5 ? "bold" : "normal"}
                  sx={{
                    marginLeft: { md: p.id === 1 || p.id === 5 ? 5 : 10 },
                  }}
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
            <Button
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="success"
            >
              Enviar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};
