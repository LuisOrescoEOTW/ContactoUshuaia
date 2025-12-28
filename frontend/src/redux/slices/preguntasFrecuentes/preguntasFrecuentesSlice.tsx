import { createSlice } from "@reduxjs/toolkit";
import type { IpreguntasFrecuentes } from "../../../app/models/IpreguntasFrecuentes";

export const preguntasFrecuentesSlice = createSlice({
  name: 'preguntasFrecuentes',
  initialState: {
    preguntas: Array<IpreguntasFrecuentes>(),
  },
  reducers: {
    setPreguntas: (state, action) => {
      state.preguntas = action.payload.preguntas;
    },
  },
})
export const { setPreguntas } = preguntasFrecuentesSlice.actions
