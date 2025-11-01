import { Api } from "../../../api/api";
import type { IrubroXContratista } from "../../../app/models/IrubroXContratista";
import type { AppDispatch } from "../../store";
import { setRubrosXContratistas } from "./rubrosXContratistasSlice";

//Get All
export const getRubrosXContratistas = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/RubrosXContratistas/`);
      dispatch(setRubrosXContratistas({ rubrosXContratistas: data }));
    } catch (error) {
      console.error("Error en getAll:", error);
    }
  };
};

//Get by Id
export const getRubroXContratistasById = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/RubrosXContratistas/${id}`);
      dispatch(setRubrosXContratistas({ rubrosXContratistas: data }));
    } catch (error) {
      console.error("Error en getById:", error);
    }
  };
};

//Insertar Nuevo
export const postRubrosXContratistas = (data: IrubroXContratista) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post("/RubrosXContratistas/", data);
      dispatch(getRubrosXContratistas()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

//Modificar
export const putRubrosXContratistas = (data: IrubroXContratista) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/RubrosXContratistas/${data.id}`, data);
      dispatch(getRubrosXContratistas()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};

//Eliminar
export const deleteRubrosXContratistas = (data: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/RubrosXContratistas/${data}`);
      dispatch(getRubrosXContratistas()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};
