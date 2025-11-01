import { Api } from "../../../api/api";
import type { IpalabrasClaves } from "../../../app/models/IpalabrasClaves";
import type { AppDispatch } from "../../store";
import { setPalabrasClaves } from "./palabrasClavesSlice";

//Get All
export const getPalabrasClaves = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/PalabrasClaves/`);
      dispatch(setPalabrasClaves({ palabrasClaves: data }));
    } catch (error) {
      console.error("Error en getAll:", error);
    }
  };
};

// Get listado de nombres únicos
export const getPalabrasClavesNombresUnicos = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/PalabrasClaves/nombresUnicos/`);
      dispatch(setPalabrasClaves({ palabrasClaves: data }));
    } catch (error) {
      console.error("Error en getPalabrasClavesNombresUnicos:", error);
    }
  };
};

// Get by Id
export const getPalabrasClavesById = (id: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { data } = await Api.get(`/PalabrasClaves/${id}`);
      dispatch(setPalabrasClaves({ palabrasClaves: data }));
    } catch (error) {
      console.error("Error en getById:", error);
    }
  };
};

//Insertar Nuevo
export const postPalabrasClaves = (data: IpalabrasClaves) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.post("/PalabrasClaves/", data);
      dispatch(getPalabrasClaves()); // Para refrescar la lista después de agregar
    } catch (error) {
      console.error("Error en post:", error);
    }
  };
};

//Modificar
export const putPalabrasClaves = (data: IpalabrasClaves) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.put(`/PalabrasClaves/${data.id}`, data);
      dispatch(getPalabrasClaves()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en put:", error);
    }
  };
};

//Eliminar
export const deletePalabrasClaves = (data: number) => {
  return async (dispatch: AppDispatch) => {
    try {
      await Api.delete(`/PalabrasClaves/${data}`);
      dispatch(getPalabrasClaves()); // Para refrescar la lista después de actualizar
    } catch (error) {
      console.error("Error en delete:", error);
    }
  };
};
