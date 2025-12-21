import React, { useEffect, useRef, useState } from "react";
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
import { toast } from "react-toastify";
import type { Icontratista } from "../models/Icontratista";

interface Props {
  open: boolean;
  onClose: () => void;
  editState: Irubros | null;
  contratista: Icontratista | null;
}

export const RubrosForm: React.FC<Props> = ({
  open,
  onClose,
  editState,
  contratista,
}) => {
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
    setValue, // <--- 1. Extraemos setValue para actualizar manualmente
    watch, // <--- 2. Extraemos watch para observar la imagen en tiempo real
    register, // <--- 1. Importante registrar el campo manualmente
  } = useForm<Irubros>({ defaultValues: inicialState });

  register("publicidad");

  // Manejo de la imagen
  const publicidadValue = watch("publicidad");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resetear el formulario con los valores de editState cuando cambia
  useEffect(() => {
    if (editState) {
      reset(editState); // Resetea los valores del formulario con los de editState
    } else {
      reset(inicialState);
    }
  }, [editState, reset, open]);

  // Guardar (Agregar/Editar)
  const onSubmit = (data: Irubros) => {
    if (editState) {
      dispatch(putRubros(data, contratista?.id ? contratista.id : 0))
        .then(() => toast.info("Elemento modificado"))
        .catch(() => toast.error("Error al modificar el elemento"));
    } else {
      dispatch(postRubros(data))
        .then(() => toast.success("Elemento agregado"))
        .catch(() => toast.error("Error al agregar el elemento"));
    }
    onClose();
  };

  // Función para manejar la selección del archivo
  const manejarCambioArchivo = (e: any) => {
    const archivo = e.target.files[0];
    if (archivo) {
      const reader = new FileReader();
      // Cuando el archivo se termine de leer...
      reader.onloadend = () => {
        const resultado = reader.result;
        if (typeof resultado === "string") {
          setValue("publicidad", resultado, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
          });
        }
      };
      // Inicia la conversión a Base64
      reader.readAsDataURL(archivo);
      // Limpiar el input para permitir seleccionar el mismo archivo después
      e.target.value = "";
    }
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

        {/* Imagen */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {/* Input oculto */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={manejarCambioArchivo}
            style={{ display: "none" }}
          />

          {/* Visualización previa */}
          <div
            style={{
              marginTop: "20px",
              minHeight: "150px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#f9f9f9",
            }}
          >
            {publicidadValue ? (
              <>
                <img
                  src={
                    publicidadValue.startsWith("data:")
                      ? publicidadValue
                      : `data:image/png;base64,${publicidadValue}`
                  }
                  alt="Vista previa"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "8px",
                    objectFit: "contain",
                  }}
                />
              </>
            ) : (
              <p style={{ color: "#999" }}>Sin imagen</p>
            )}
          </div>

          {/* Botón personalizado */}
          <Button
            variant="contained"
            onClick={() => fileInputRef.current?.click()}
          >
            +
          </Button>

          <Button
            color="error"
            size="small"
            variant="text"
            onClick={() => setValue("publicidad", "", { shouldDirty: true })}
            style={{ marginTop: "10px" }}
          >
            -
          </Button>
        </div>
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
