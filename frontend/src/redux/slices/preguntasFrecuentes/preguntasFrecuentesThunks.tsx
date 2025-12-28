import { Api } from "../../../api/api";
import type { IpreguntasFrecuentes } from "../../../app/models/IpreguntasFrecuentes";
import type { AppDispatch } from "../../store";
import { setPreguntas } from "./preguntasFrecuentesSlice";

//Get All
export const getPreguntas = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/PreguntasFrecuentes/`);
      dispatch(setPreguntas({ preguntas: data }));
    } catch (error) {
      console.error("Error en getAll:", error);
    }
  };
};

//Get by Id
export const getPreguntasById = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/PreguntasFrecuentes/${id}`);
      dispatch(setPreguntas({ preguntas: data }));
    } catch (error) {
      console.error("Error en getById:", error);
    }
  };
};

//Insertar Nuevo
export const postPreguntas = (data: IpreguntasFrecuentes) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post("/PreguntasFrecuentes/", data);
      dispatch(getPreguntas()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

//Modificar
export const putPreguntas = (data: IpreguntasFrecuentes) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/PreguntasFrecuentes/${data.id}`, data);
      dispatch(getPreguntas()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};

//Eliminar
export const deletePreguntas = (data: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/PreguntasFrecuentes/${data}`);
      dispatch(getPreguntas()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};
