import { Api } from "../../../api/api";
import type { Icontratista } from "../../../app/models/Icontratista";
import type { AppDispatch } from "../../store";
import { setContratistas } from "./contratistasSlice";

//Get All
export const getContratistas = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/Contratistas/`);
      dispatch(setContratistas({ contratistas: data }));
    } catch (error) {
      console.error("Error en getAll:", error);
    }
  };
};

//Insertar Nuevo
export const postContratistas = (data: Icontratista) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post("/Contratistas/", data);
      dispatch(getContratistas()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

//Modificar
export const putContratistas = (data: Icontratista) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/Contratistas/${data.id}`, data);
      dispatch(getContratistas()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};

//Eliminar
export const deleteContratistas = (data: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/Contratistas/${data}`);
      dispatch(getContratistas()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};
