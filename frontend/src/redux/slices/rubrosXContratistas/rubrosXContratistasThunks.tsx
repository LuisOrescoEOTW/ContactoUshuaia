import { Api } from "../../../api/api";
import type { IrubroXContratista } from "../../../app/models/IrubroXContratista";
import type { AppDispatch } from "../../store";
import { setRubrosXContratistas, setRubrosXContratistasByRubroId } from "./rubrosXContratistasSlice";

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

//Vaciar
export const vaciarRubrosXContratistas = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setRubrosXContratistas({ rubrosXContratistas: [] }));
    } catch (error) {
      console.error("Error en vaciar:", error);
    }
  };
};

//Get All Habilitados
export const getRubrosXContratistasHabilitados = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/RubrosXContratistasHabilitados/`);
      dispatch(setRubrosXContratistas({ rubrosXContratistas: data }));
    } catch (error) {
      console.error("Error en getAllHabilitados:", error);
    }
  };
};

//Get by ContratistaId
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

//Get by RubroId
export const getRubroXContratistasByRubroId = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/RubrosXContratistas/getByRubroId/${id}`);
      dispatch(setRubrosXContratistasByRubroId({ rubrosXContratistasByRubroId: data }));
    } catch (error) {
      console.error("Error en getByRubroId:", error);
    }
  };
};

//Insertar Nuevo
export const postRubrosXContratistas = (data: IrubroXContratista, contratista:number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post("/RubrosXContratistas/", data);
      dispatch(getRubroXContratistasById(contratista)); // opcional: refrescar lista
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

//Modificar
export const putRubrosXContratistas = (data: IrubroXContratista, contratista:number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/RubrosXContratistas/${data.id}`, data);
      dispatch(getRubroXContratistasById(contratista)); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};

//Modificar y Actualizar Lista Completa
export const putRubrosXContratistasRefresh = (data: IrubroXContratista) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/RubrosXContratistas/${data.id}`, data);
      dispatch(getRubrosXContratistasHabilitados()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};

//Modificar y SIN Actualizar
export const putRubrosXContratistasSinRefresh = (data: IrubroXContratista) => {
  return async () => {
    try {
      await Api.put(`/RubrosXContratistas/${data.id}`, data);
      // No se actualiza la lista
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};

//Eliminar
export const deleteRubrosXContratistas = (data: number, contratista:number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/RubrosXContratistas/${data}`);
      dispatch(getRubroXContratistasById(contratista)); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};
