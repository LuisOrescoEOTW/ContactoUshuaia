import { createSlice } from "@reduxjs/toolkit";
import type { Ipuntuar } from "../../../app/models/Ipuntuar";

export const puntuarSlice = createSlice({
  name: 'puntuar',
  initialState: {
    puntajes: Array<Ipuntuar>(),
  },
  reducers: {
    setPuntajes: (state, action) => {
      state.puntajes = action.payload.puntajes;
    },
  },
})
export const { setPuntajes } = puntuarSlice.actions
