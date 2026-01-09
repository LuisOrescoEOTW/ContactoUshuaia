import { data } from "react-router-dom";
import { Api } from "../../../api/api";
import type { Iaviso } from "../../../app/models/Iaviso";
import type { AppDispatch } from "../../store";
import { setAvisos } from "./avisoSlice";

//Get All
export const getAvisos = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/Aviso/`);
      dispatch(setAvisos({ avisos: data }));
    } catch (error) {
      console.error("Error en getAll:", error);
    }
  };
};

//Get by Id
export const getAvisosById = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/Aviso/${id}`);
      dispatch(setAvisos({ avisos: data }));
    } catch (error) {
      console.error("Error en getById:", error);
    }
  };
};

//Insertar Nuevo
export const postAvisos = (data: Iaviso) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post("/Aviso/", data);
      dispatch(getAvisos()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

// POST http://localhost:8000/EnviarAviso/
export const postEnviarAviso = (data: Iaviso) => {
  return async () => {
    try {
      await Api.post(`/EnviarAviso/`, data);
    } catch (error) {
      console.error("Error en postEnviarAviso:", error);
    }
  };
};

//Modificar
export const putAvisos = (data: Iaviso) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/Aviso/${data.id}`, data);
      dispatch(getAvisos()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};

//Eliminar
export const deleteAvisos = (data: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/Aviso/${data}`);
      dispatch(getAvisos()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};
