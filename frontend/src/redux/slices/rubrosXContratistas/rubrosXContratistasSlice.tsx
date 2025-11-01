import { createSlice } from '@reduxjs/toolkit'
import type { IrubroXContratista } from '../../../app/models/IrubroXContratista';

export const rubrosXContratistasSlice = createSlice({
  name: 'rubrosXContratistas',
  initialState: {
    rubrosXContratistas: Array<IrubroXContratista>(),
  },
  reducers: {
    setRubrosXContratistas: (state, action) => {
      state.rubrosXContratistas = action.payload.rubrosXContratistas;
    },
  },
})
export const { setRubrosXContratistas } = rubrosXContratistasSlice.actions
