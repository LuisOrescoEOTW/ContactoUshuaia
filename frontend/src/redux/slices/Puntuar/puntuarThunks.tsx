import { Api } from "../../../api/api";
import type { Ipuntuar } from "../../../app/models/Ipuntuar";
import type { AppDispatch } from "../../store";
import { setPuntajes } from "./puntuarSlice";

//Get All
export const getPuntajes = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/Puntuar/`);
      dispatch(setPuntajes({ puntajes: data }));
    } catch (error) {
      console.error("Error en getAll:", error);
    }
  };
};

//Get by Id
export const getPuntajesById = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/Puntuar/${id}`);
      dispatch(setPuntajes({ puntajes: data }));
    } catch (error) {
      console.error("Error en getById:", error);
    }
  };
};

//Insertar Nuevo
export const postPuntajes = (data: Ipuntuar) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post("/Puntuar/", data);
      dispatch(getPuntajes()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

//Modificar
export const putPuntajes = (data: Ipuntuar) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/Puntuar/${data.id}`, data);
      dispatch(getPuntajes()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};

//Eliminar
export const deletePuntajes = (data: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/Puntuar/${data}`);
      dispatch(getPuntajes()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};

//Eliminar Fisico
export const deletePuntajesFisico = (data: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/Puntuar/Fisico/${data}`);
      dispatch(getPuntajes()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};
