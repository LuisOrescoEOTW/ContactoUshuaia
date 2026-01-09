import { createSlice } from "@reduxjs/toolkit";
import type { Iaviso } from "../../../app/models/Iaviso";

export const avisoSlice = createSlice({
  name: 'aviso',
  initialState: {
    avisos: Array<Iaviso>(),
  },
  reducers: {
    setAvisos: (state, action) => {
      state.avisos = action.payload.avisos;
    },
  },
})
export const { setAvisos } = avisoSlice.actions
