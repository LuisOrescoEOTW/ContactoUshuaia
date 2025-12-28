import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import type { IpreguntasFrecuentes } from "../models/IpreguntasFrecuentes";
import { postPreguntas, putPreguntas } from "../../redux/slices/preguntasFrecuentes/preguntasFrecuentesThunks";

interface Props {
  open: boolean;
  onClose: () => void;
  editState: IpreguntasFrecuentes | null;
}

export const PreguntasFrecuentesForm: React.FC<Props> = ({
  open,
  onClose,
  editState,
}) => {
  //Leer
  const dispatch = useDispatch<AppDispatch>();

  // Hook useForm
  const inicialState = {
    pregunta: "",
    respuesta: "",
    deleted: false,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IpreguntasFrecuentes>({ defaultValues: inicialState });

  // Resetear el formulario con los valores de editState cuando cambia
  useEffect(() => {
    if (editState) {
      reset(editState); // Resetea los valores del formulario con los de editState
    } else {
      reset(inicialState);
    }
  }, [editState, reset]);

  // Guardar (Agregar/Editar)
  const onSubmit = (data: IpreguntasFrecuentes) => {
    if (editState) {
      dispatch(putPreguntas(data))
        .then(() => toast.info("Elemento modificado"))
        .catch(() => toast.error("Error al modificar el elemento"));
    } else {
      dispatch(postPreguntas(data))
        .then(() => toast.success("Elemento agregado"))
        .catch(() => toast.error("Error al agregar el elemento"));
    }
    onClose(); // Cerrar modal después de agregar/editar
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#008F9E",
          color: "white",
          borderRadius: "20px",
          margin: "10px",
        }}
      >
        {editState ? "Editar Pregunta Frecuente" : "Nueva Pregunta Frecuente"}
      </DialogTitle>

      <DialogContent>
        <Controller
          name="pregunta"
          control={control}
          rules={{ required: "La pregunta es obligatoria" }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Pregunta"
              fullWidth
              error={!!errors.pregunta}
              helperText={errors.pregunta?.message}
            />
          )}
        />
        <Controller
          name="respuesta"
          control={control}
          rules={{ required: "La respuesta es obligatoria" }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Respuesta"
              fullWidth
              error={!!errors.respuesta}
              helperText={errors.respuesta?.message}
            />
          )}
        />
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
          {editState ? "Guardar" : "Agregar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

