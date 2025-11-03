import { useDispatch, useSelector } from "react-redux";
import type { IpalabrasClaves } from "../models/IpalabrasClaves";
import type { AppDispatch, RootState } from "../../redux/store";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  postPalabrasClaves,
  putPalabrasClaves,
} from "../../redux/slices/palabrasClaves/palabrasClavesThunks";
import { toast } from "react-toastify";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getRubros } from "../../redux/slices/rubros/rubrosThunks";

interface Props {
  open: boolean;
  onClose: () => void;
  editState: IpalabrasClaves | null;
}

export const PalabrasClavesForm: React.FC<Props> = ({
  open,
  onClose,
  editState,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { rubros = [] } = useSelector((state: RootState) => state.rubros);

  // Cargar rubros al abrir el modal
  useEffect(() => {
    dispatch(getRubros());
  }, [dispatch]);

  // Valores iniciales del formulario
  const inicialState = {
    // id: 0,
    nombre: "",
    rubrosId: 1,
    // deleted: false,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IpalabrasClaves>({
    defaultValues: inicialState,
  });

  // Cuando se edita, resetear con los valores del registro seleccionado
  useEffect(() => {
    if (editState) {
      reset({
        ...editState,
        rubrosId: editState.rubrosId ?? 0, // Aseguramos que tenga un valor
      });
    } else {
      reset(inicialState);
    }
  }, [editState, reset]);

  // Guardar (Agregar / Editar)
  const onSubmit = (data: IpalabrasClaves) => {
    if (editState) {
      delete data.rubros;
      dispatch(putPalabrasClaves(data))
      .then(() => toast.info("Elemento modificado"))
      .catch(() => toast.error("Error al modificar el elemento"));
    } else {
      dispatch(postPalabrasClaves(data))
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
        {editState ? "Editar Palabra Clave" : "Nueva Palabra Clave"}
      </DialogTitle>

      <DialogContent>
        {/* Nombre */}
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

        {/* Select de Rubros */}
        <Controller
          name="rubrosId"
          control={control}
          rules={{ required: "El rubro es obligatorio" }}
          render={({ field }) => (
            <Select
              {...field}
              fullWidth
              margin="dense"
              value={field.value ?? ""}
              onChange={(e) => field.onChange(Number(e.target.value))}
              displayEmpty
              sx={{ mt: 2 }}
            >
              <MenuItem value="">
                <em>Seleccione un rubro</em>
              </MenuItem>
              {rubros.map((rubro) => (
                <MenuItem key={rubro.id} value={rubro.id}>
                  {rubro.nombre}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.rubrosId && (
          <p style={{ color: "red", fontSize: "0.8rem" }}>
            {errors.rubrosId.message}
          </p>
        )}
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
