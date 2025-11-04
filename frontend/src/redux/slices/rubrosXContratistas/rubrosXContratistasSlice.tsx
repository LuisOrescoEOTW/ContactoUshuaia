import { createSlice } from '@reduxjs/toolkit'
import type { IrubroXContratista } from '../../../app/models/IrubroXContratista';

export const rubrosXContratistasSlice = createSlice({
  name: 'rubrosXContratistas',
  initialState: {
    rubrosXContratistas: Array<IrubroXContratista>(),
    rubrosXContratistasByRubroId: Array<IrubroXContratista>(),
  },
  reducers: {
    setRubrosXContratistas: (state, action) => {
      state.rubrosXContratistas = action.payload.rubrosXContratistas;
    },
    setRubrosXContratistasByRubroId: (state, action) => {
      state.rubrosXContratistasByRubroId = action.payload.rubrosXContratistasByRubroId;
    },
  },
})
export const { setRubrosXContratistas, setRubrosXContratistasByRubroId } = rubrosXContratistasSlice.actions
