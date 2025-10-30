import { createSlice } from '@reduxjs/toolkit'
import type { Irubros } from '../../../../src/app/models/Irubros';

export const rubrosSlice = createSlice({
  name: 'rubros',
  initialState: {
    rubros: Array<Irubros>(),
  },
  reducers: {
    setRubros: (state, action) => {
      state.rubros = action.payload.rubros;
    },
  },
})
export const { setRubros } = rubrosSlice.actions
