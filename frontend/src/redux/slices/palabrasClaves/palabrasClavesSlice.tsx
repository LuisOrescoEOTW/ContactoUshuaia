import { createSlice } from '@reduxjs/toolkit'
import type { IpalabrasClaves } from '../../../app/models/IpalabrasClaves';

export const palabrasClavesSlice = createSlice({
  name: 'palabrasClaves',
  initialState: {
    palabrasClaves: Array<IpalabrasClaves>(),
    palabrasClavesNombresUnicos: Array<IpalabrasClaves>(),
  },
  reducers: {
    setPalabrasClaves: (state, action) => {
      state.palabrasClaves = action.payload.palabrasClaves;
    },
    setPalabrasClavesNombresUnicos: (state, action) => {
      state.palabrasClavesNombresUnicos = action.payload.palabrasClavesNombresUnicos;
    },
  },
})
export const { setPalabrasClaves, setPalabrasClavesNombresUnicos } = palabrasClavesSlice.actions
