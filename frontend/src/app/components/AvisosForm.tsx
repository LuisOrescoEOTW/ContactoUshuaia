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
import type { Iaviso } from "../models/Iaviso";
import { postAvisos, putAvisos } from "../../redux/slices/Aviso/avisoThunks";

interface Props {
  open: boolean;
  onClose: () => void;
  editState: Iaviso | null;
}

export const AvisosForm: React.FC<Props> = ({ open, onClose, editState }) => {
  const dispatch = useDispatch<AppDispatch>();

  // Valores iniciales del formulario
  const inicialState = {
    nombre: "",
    email: "",
    deleted: false,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Iaviso>({
    defaultValues: inicialState,
  });

  // Cuando se edita, resetear con los valores del registro seleccionado
  useEffect(() => {
    if (editState) {
      reset({
        ...editState,
      });
    } else {
      reset(inicialState);
    }
  }, [editState, reset]);

  // Guardar (Agregar / Editar)
  const onSubmit = (data: Iaviso) => {
    if (editState) {
      dispatch(putAvisos(data))
        .then(() => toast.info("Elemento modificado"))
        .catch(() => toast.error("Error al modificar el elemento"));
    } else {
      dispatch(postAvisos(data))
        .then(() => toast.success("Elemento agregado"))
        .catch(() => toast.error("Error al agregar el elemento"));
    }
    onClose(); // cerrar modal
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
        {editState ? "Editar Aviso" : "Nuevo Aviso"}
      </DialogTitle>

      <DialogContent>
        {/* Email */}
        <Controller
          name="nombre"
          control={control}
          rules={{ required: "El nombre es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Nombre"
              fullWidth
              error={!!errors.nombre}
              helperText={errors.nombre?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: "El email es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
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
