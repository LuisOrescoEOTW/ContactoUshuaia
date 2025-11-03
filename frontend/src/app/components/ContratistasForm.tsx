import { useDispatch } from "react-redux";
import type { Icontratista } from "../models/Icontratista";
import type { AppDispatch } from "../../redux/store";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  postContratistas,
  putContratistas,
} from "../../redux/slices/contratistas/contratistasThunks";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  editState: Icontratista | null;
}

export const ContratistasForm: React.FC<Props> = ({
  open,
  onClose,
  editState,
}) => {
  //Leer
  const dispatch = useDispatch<AppDispatch>();

  // Hook useForm
  const inicialState = {
    nombreApellido: "",
    telefono: "",
    email: "",
    matricula: "",
    deleted: false,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Icontratista>({ defaultValues: inicialState });

  // Resetear el formulario con los valores de editState cuando cambia
  useEffect(() => {
    if (editState) {
      reset(editState); // Resetea los valores del formulario con los de editState
    } else {
      reset(inicialState);
    }
  }, [editState, reset]);

  // Guardar (Agregar/Editar)
  const onSubmit = (data: Icontratista) => {
    if (editState) {
      dispatch(putContratistas(data))
        .then(() => toast.info("Elemento modificado"))
        .catch(() => toast.error("Error al modificar el elemento"));
    } else {
      dispatch(postContratistas(data))
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
        {editState ? "Editar Contratista" : "Nuevo Contratista"}
      </DialogTitle>

      <DialogContent>
        <Controller
          name="nombreApellido"
          control={control}
          rules={{ required: "El nombre y apellido es obligatorio" }}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Nombre y Apellido"
              fullWidth
              error={!!errors.nombreApellido}
              helperText={errors.nombreApellido?.message}
            />
          )}
        />
        <Controller
          name="telefono"
          control={control}
          rules={{
            required: "El teléfono es obligatorio",
            pattern: {
              value: /^[0-9()+\- ]+$/,
              message: "Ingrese un número de teléfono válido",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="tel"
              margin="dense"
              label="Teléfono"
              fullWidth
              error={!!errors.telefono}
              helperText={errors.telefono?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Ingrese un correo electrónico válido",
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="email"
              margin="dense"
              label="Correo Electrónico"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name="matricula"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Matrícula"
              fullWidth
              error={!!errors.matricula}
              helperText={errors.matricula?.message}
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
