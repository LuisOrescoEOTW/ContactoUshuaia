import { Api } from "../../../api/api";
import type { AppDispatch } from "../../store";
import { setRubros } from "./rubrosSlice";

//Rubros Todos
export const getRubros = () => {
  return async (dispatch: AppDispatch) => {
    const { data } = await(Api.get(`/Rubros`));
    dispatch(setRubros({ rubros: data}));
  };
};
