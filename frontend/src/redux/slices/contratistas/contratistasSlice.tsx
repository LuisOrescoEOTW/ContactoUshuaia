import { createSlice } from '@reduxjs/toolkit'
import type { Icontratista } from '../../../app/models/Icontratista';

export const contratistasSlice = createSlice({
  name: 'contratistas',
  initialState: {
    contratistas: Array<Icontratista>(),
  },
  reducers: {
    setContratistas: (state, action) => {
      state.contratistas = action.payload.contratistas;
    },
  },
})
export const { setContratistas } = contratistasSlice.actions
