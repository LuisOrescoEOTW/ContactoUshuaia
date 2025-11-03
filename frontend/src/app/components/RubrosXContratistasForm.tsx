import { useDispatch } from "react-redux";
import type { IrubroXContratista } from "../models/IrubroXContratista";
import type { AppDispatch } from "../../redux/store";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { putRubrosXContratistas } from "../../redux/slices/rubrosXContratistas/rubrosXContratistasThunks";
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
  editState: IrubroXContratista | null;
}

export const RubrosXContratistasForm: React.FC<Props> = ({
  open,
  onClose,
  editState,
}) => {
  //Leer
  const dispatch = useDispatch<AppDispatch>();

  // Hook useForm
  const inicialState = {
    cantidadPuntuados: 0,
    sumatoriaPuntuados: 0,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IrubroXContratista>({ defaultValues: inicialState });

  // Resetear el formulario con los valores de editState cuando cambia
  useEffect(() => {
    if (editState) {
      reset(editState); // Resetea los valores del formulario con los de editState
    }
  }, [editState, reset]);

  // Guardar (Agregar/Editar)
  const onSubmit = (data: IrubroXContratista) => {
    // Convertir los valores a número explícitamente
    const parsedData = {
      ...data,
      cantidadPuntuados: Number(data.cantidadPuntuados),
      sumatoriaPuntuados: Number(data.sumatoriaPuntuados),
    };
    delete parsedData.rubros;
    delete parsedData.contratistas;
    dispatch(
      putRubrosXContratistas(
        parsedData,
        editState?.contratistasId ? editState.contratistasId : 0
      )
    )
      .then(() => toast.info("Elemento modificado"))
      .catch(() => toast.error("Error al modificar el elemento"));
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
        Editar Rubro x Contratista
      </DialogTitle>

      <DialogContent>
        <Controller
          name="cantidadPuntuados"
          control={control}
          rules={{
            required: "Cantidad Puntuados es obligatorio",
            min: { value: 0, message: "Debe ser mayor o igual a 0" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              margin="dense"
              label="Cantidad Puntuados"
              fullWidth
              error={!!errors.cantidadPuntuados}
              helperText={errors.cantidadPuntuados?.message}
            />
          )}
        />
        <Controller
          name="sumatoriaPuntuados"
          control={control}
          rules={{
            required: "Sumatoria Puntuados es obligatorio",
            min: { value: 0, message: "Debe ser mayor o igual a 0" },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="number"
              margin="dense"
              label="Sumatoria de Puntuados"
              fullWidth
              error={!!errors.sumatoriaPuntuados}
              helperText={errors.sumatoriaPuntuados?.message}
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
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
