import React, { useEffect } from "react";
import type { Irubros } from "../models/Irubros";
import { Controller, useForm } from "react-hook-form";
import { postRubros, putRubros } from "../../redux/slices/rubros/rubrosThunks";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
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
  editState: Irubros | null;
}

export const RubrosForm: React.FC<Props> = ({ open, onClose, editState }) => {
  //Leer
  const dispatch = useDispatch<AppDispatch>();

  // Hook useForm
  const inicialState = {
    nombre: "",
    publicidad: "",
    icono: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Irubros>({ defaultValues: inicialState });

  // Resetear el formulario con los valores de editState cuando cambia
  useEffect(() => {
    if (editState) {
      reset(editState); // Resetea los valores del formulario con los de editState
    } else {
      reset(inicialState);
    }
  }, [editState, reset]);

  // Guardar (Agregar/Editar)
  const onSubmit = (data: Irubros) => {
    if (editState) {
      dispatch(putRubros(data));
    } else {
      dispatch(postRubros(data));
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
        {editState ? "Editar Rubro" : "Nuevo Rubro"}
      </DialogTitle>

      <DialogContent>
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
          name="icono"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Icono"
              fullWidth
              error={!!errors.icono}
              helperText={errors.icono?.message}
            />
          )}
        />
        <Controller
          name="publicidad"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              margin="dense"
              label="Publicidad"
              fullWidth
              error={!!errors.publicidad}
              helperText={errors.publicidad?.message}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="error">Cancelar</Button>
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
