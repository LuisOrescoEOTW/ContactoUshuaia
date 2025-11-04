import { Api } from "../../../api/api";
import type { Irubros } from "../../../app/models/Irubros";
import type { AppDispatch } from "../../store";
import { getRubroXContratistasById } from "../rubrosXContratistas/rubrosXContratistasThunks";
import { setRubros } from "./rubrosSlice";

//Get All
export const getRubros = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/Rubros/`);
      dispatch(setRubros({ rubros: data }));
    } catch (error) {
      console.error("Error en getAll:", error);
    }
  };
};

//Get by Id
export const getRubroById = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/Rubros/${id}`);
      dispatch(setRubros({ rubros: data }));
    } catch (error) {
      console.error("Error en getById:", error);
    }
  };
};

//Insertar Nuevo
export const postRubros = (data: Irubros) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post("/Rubros/", data);
      dispatch(getRubros()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

//Modificar
export const putRubros = (data: Irubros, contratista:number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/Rubros/${data.id}`, data);
      dispatch(getRubros()); // Para refrescar la lista después de actualizar
      dispatch(getRubroXContratistasById(contratista)); // Refresco RxC
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};

//Eliminar
export const deleteRubros = (data: number, contratista:number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/Rubros/${data}`);
      dispatch(getRubros()); // Para refrescar la lista después de actualizar
      dispatch(getRubroXContratistasById(contratista)); // Refresco RxC
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};
